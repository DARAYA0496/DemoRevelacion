import { useState, useEffect } from 'react';
import { RsvpSubmission, TeamGender } from '../types/invitation.types';
import { rsvpService } from '../services/rsvp.service';
import confetti from 'canvas-confetti';

export interface RsvpFormValues {
  guestName: string;
  phone: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  teamVote: TeamGender;
  dietaryOrNotes: string;
  messageForBaby: string;
}

export interface RsvpFormErrors {
  guestName?: string;
  guestsCount?: string;
}

/**
 * Hook reciclable para gestionar el estado, la validación y el envío del formulario RSVP.
 */
export const useRsvpForm = (selectedTeamFromPoll: TeamGender) => {
  const [values, setValues] = useState<RsvpFormValues>({
    guestName: '',
    phone: '',
    attending: 'yes',
    guestsCount: 2,
    teamVote: selectedTeamFromPoll,
    dietaryOrNotes: '',
    messageForBaby: '',
  });

  const [errors, setErrors] = useState<RsvpFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState<RsvpSubmission | null>(null);
  const [savedList, setSavedList] = useState<RsvpSubmission[]>(() =>
    rsvpService.getLocalSubmissions()
  );

  // Carga inicial desde NeonDB/API si está disponible
  useEffect(() => {
    let isMounted = true;
    rsvpService.fetchAllSubmissions().then((data) => {
      if (isMounted && data) {
        setSavedList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sincroniza el equipo cuando el usuario vota en la sección de votación
  useEffect(() => {
    setValues((prev) => ({ ...prev, teamVote: selectedTeamFromPoll }));
  }, [selectedTeamFromPoll]);

  const updateField = <K extends keyof RsvpFormValues>(
    field: K,
    value: RsvpFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof RsvpFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const triggerPastelConfetti = (team: TeamGender) => {
    try {
      const colors =
        team === 'boy'
          ? ['#BDE0FE', '#72B6F6', '#D9B38C', '#FFFDF9']
          : ['#FFC8DD', '#FF94B8', '#D9B38C', '#FFFDF9'];
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors,
      });
    } catch {
      // Fallback silencioso si canvas no está disponible
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: RsvpFormErrors = {};

    if (!values.guestName.trim() || values.guestName.trim().length < 2) {
      newErrors.guestName = 'Por favor ingresa tu nombre o el de tu familia.';
    }

    if (values.attending === 'yes' && (values.guestsCount < 1 || values.guestsCount > 15)) {
      newErrors.guestsCount = 'Indica un número válido de asistentes (1 a 15).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const entry = await rsvpService.saveSubmission({
        guestName: values.guestName.trim(),
        phone: values.phone.trim(),
        attending: values.attending,
        guestsCount: values.attending === 'yes' ? Number(values.guestsCount) : 0,
        teamVote: values.teamVote,
        dietaryOrNotes: values.dietaryOrNotes.trim(),
        messageForBaby: values.messageForBaby.trim(),
      });

      setSubmittedEntry(entry);
      setSavedList((prev) => [entry, ...prev.filter((i) => i.id !== entry.id)]);
      triggerPastelConfetti(values.teamVote);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedEntry(null);
    setValues((prev) => ({
      ...prev,
      guestName: '',
      phone: '',
      dietaryOrNotes: '',
      messageForBaby: '',
    }));
  };

  return {
    values,
    errors,
    isSubmitting,
    submittedEntry,
    savedList,
    updateField,
    handleSubmit,
    resetForm,
    getWhatsAppUrl: (entry: RsvpSubmission) => rsvpService.buildWhatsAppUrl(entry),
  };
};
