import { EventConfig } from "../types/invitation.types";

/**
 * Configuración centralizada del evento.
 * Permite reciclar toda la plantilla cambiando únicamente este archivo.
 */
export const EVENT_CONFIG: EventConfig = {
  parentsNames: "Daniel & Katherine",
  babyNickname: "Nuestro Pequeño Osito",
  heroTitle: "¿Osito o Osita?",
  heroSubtitle: "Revelación de Género",
  heroQuote:
    "Dos piecitos están por llegar para llenar nuestras vidas de ternura. ¿Se vestirá de azul cielo o de rosa pastel? ¡Acompáñanos a descubrir el gran secreto!",
  // Fecha futura configurable para la cuenta regresiva
  eventDateISO: "2026-11-07T15:00:00-06:00",
  displayDate: "Sábado 07 de Noviembre, 2026",
  displayTime: "3:00 PM - 6:00 PM",
  venueName: "Jardín Los Ositos & Salón Cristal",
  venueAddress: "Av. Las Flores 450, frente al Parque Central",
  mapUrl: "https://maps.google.com/?q=Parque+Central",
  whatsappNumber: "50688888888",
  boyTeamName: "#TeamOsito 💙",
  girlTeamName: "#TeamOsita 💗",
  boyOptionLabel: "Príncipe Osito (Azul)",
  girlOptionLabel: "Princesa Osita (Rosa)",
  initialVotes: {
    boy: 0,
    girl: 0,
  },
  details: [
    {
      id: "date-time",
      title: "Fecha y Hora",
      subtitle: "Sábado 07 de Noviembre",
      description:
        "Recepción a las 3:00 PM. La gran revelación será puntualmente a las 4:30 PM.",
      iconName: "calendar",
      variant: "blue",
    },
    {
      id: "location",
      title: "Lugar del Evento",
      subtitle: "Mi Casa, Condominio el Fresal",
      description: "",
      iconName: "map-pin",
      variant: "pink",
      actionLabel: "Ver en Google Maps",
      actionUrl:
        "https://www.google.com/maps/place/Condominio+El+Fresal/@9.932816,-84.0061567,17z/data=!3m1!4b1!4m6!3m5!1s0x8fa0e180c75240a1:0x58a94a38ea07e3ab!8m2!3d9.932816!4d-84.0012804!16s%2Fg%2F11kqd4ykjm?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      id: "gifts",
      title: "Regalo según genero",
      subtitle: "Niño pañales o Niña artitculos de aseo",
      description: "Este regalo es depende lo que creas que es el bebé",
      iconName: "gift",
      variant: "blue",
    },
  ],
};
