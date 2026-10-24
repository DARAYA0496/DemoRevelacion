export type TeamGender = 'boy' | 'girl';

export type ThemeVariant = 'blue' | 'pink' | 'neutral' | 'split';

export interface EventDetailItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'calendar' | 'clock' | 'map-pin' | 'shirt' | 'gift' | 'sparkles';
  variant: 'blue' | 'pink' | 'neutral';
  actionLabel?: string;
  actionUrl?: string;
}

export interface EventConfig {
  parentsNames: string;
  babyNickname: string;
  heroTitle: string;
  heroSubtitle: string;
  heroQuote: string;
  eventDateISO: string;
  displayDate: string;
  displayTime: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  whatsappNumber: string; // Formato internacional sin '+' (ej: "50688888888")
  boyTeamName: string;
  girlTeamName: string;
  boyOptionLabel: string;
  girlOptionLabel: string;
  details: EventDetailItem[];
  initialVotes: {
    boy: number;
    girl: number;
  };
}

export interface RsvpSubmission {
  id: string;
  guestName: string;
  phone: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  teamVote: TeamGender;
  dietaryOrNotes: string;
  messageForBaby: string;
  createdAt: string;
}
