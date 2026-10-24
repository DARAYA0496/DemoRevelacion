import { RsvpSubmission, TeamGender } from '../types/invitation.types';
import { EVENT_CONFIG } from '../config/event.config';

const STORAGE_KEY = 'gender_reveal_rsvp_list_v1';
const FINGERPRINT_KEY = 'gender_reveal_voter_token_v1';

export interface EventLiveStats {
  totalBoyVotes: number;
  totalGirlVotes: number;
  boyPercentage: number;
  girlPercentage: number;
}

export const getVoterFingerprint = (): string => {
  try {
    let fp = localStorage.getItem(FINGERPRINT_KEY);
    if (!fp) {
      fp =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `v_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(FINGERPRINT_KEY, fp);
    }
    return fp;
  } catch {
    return 'anon_guest';
  }
};

/**
 * Servicio desacoplado para NeonDB / API Serverless con respaldo automático en LocalStorage.
 */
export const rsvpService = {
  // Obtiene las confirmaciones (intenta API primero, si falla recurre a LocalStorage)
  async fetchAllSubmissions(): Promise<RsvpSubmission[]> {
    try {
      const res = await fetch('/api/rsvp');
      if (res.ok) {
        const remoteData = await res.json();
        if (Array.isArray(remoteData)) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
          } catch {}
          return remoteData;
        }
      }
    } catch {
      // Entorno local sin serverless o sin conexión
    }

    return this.getLocalSubmissions();
  },

  getLocalSubmissions(): RsvpSubmission[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as RsvpSubmission[]) : [];
    } catch {
      return [];
    }
  },

  // Guarda confirmación: envía a NeonDB (/api/rsvp) y respalda en LocalStorage
  async saveSubmission(data: Omit<RsvpSubmission, 'id' | 'createdAt'>): Promise<RsvpSubmission> {
    const fingerprint = getVoterFingerprint();
    const localEntry: RsvpSubmission = {
      ...data,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
    };

    // Guardar copia local inmediatamente
    const current = this.getLocalSubmissions();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([localEntry, ...current]));
    } catch {}

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, fingerprint }),
      });

      if (res.ok) {
        const remoteSaved = await res.json();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('rsvp-updated'));
        }
        return remoteSaved;
      }
    } catch {
      // Se mantiene localEntry como fallback seguro
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('rsvp-updated'));
    }
    return localEntry;
  },

  // Envía voto rápido a NeonDB (/api/vote) sin duplicar
  async submitQuickVote(team: TeamGender): Promise<EventLiveStats | null> {
    const fingerprint = getVoterFingerprint();
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team, fingerprint }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    return null;
  },

  // Consulta estadísticas en vivo desde la vista v_event_dashboard
  async fetchLiveStats(): Promise<EventLiveStats | null> {
    try {
      const res = await fetch('/api/vote');
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    return null;
  },

  buildWhatsAppUrl(submission: RsvpSubmission): string {
    const teamText =
      submission.teamVote === 'boy'
        ? `${EVENT_CONFIG.boyTeamName} (Niño)`
        : `${EVENT_CONFIG.girlTeamName} (Niña)`;

    const attendingText =
      submission.attending === 'yes'
        ? `✅ *¡Sí asistiré!* (${submission.guestsCount} ${
            submission.guestsCount === 1 ? 'persona' : 'personas'
          })`
        : '❌ *No podré asistir*, pero los acompaño de corazón.';

    const lines = [
      `🧸 *Confirmación Revelación de Género (${EVENT_CONFIG.parentsNames})* 🧸`,
      '',
      `👤 *Invitado/Familia:* ${submission.guestName}`,
      attendingText,
      `🎈 *Mi voto es:* ${teamText}`,
      submission.dietaryOrNotes ? `🍽️ *Nota:* ${submission.dietaryOrNotes}` : '',
      submission.messageForBaby ? `💌 *Mensaje para el bebé:* "${submission.messageForBaby}"` : '',
    ].filter(Boolean);

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${EVENT_CONFIG.whatsappNumber}?text=${encoded}`;
  },
};
