import React from 'react';
import { Calendar, Clock, Heart, Sparkles } from 'lucide-react';
import { EVENT_CONFIG } from '../../config/event.config';
import { Badge, BearMascot, Button, CloudDivider } from '../ui';

export interface HeroSectionProps {
  onSelectTeamAndScroll: () => void;
  onScrollToRsvp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectTeamAndScroll,
  onScrollToRsvp,
}) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-[#E8F4FE] via-[#FFFDF9] to-[#FFF0F6] pt-8 pb-4">
      {/* Círculos decorativos pastel difuminados */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#BDE0FE]/45 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#FFC8DD]/45 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Insignia superior con los futuros papás */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-4">
          <Badge variant="split" icon={<Sparkles className="w-4 h-4 text-[#B08259]" />}>
            {EVENT_CONFIG.heroSubtitle} • {EVENT_CONFIG.parentsNames}
          </Badge>
        </div>

        {/* Título principal con colores pasteles azules y rosados */}
        <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-[#5C4332] leading-tight">
          ¿Será{' '}
          <span className="inline-block px-3 py-0.5 rounded-2xl bg-[#BDE0FE]/70 text-[#2B6CB0] border-2 border-[#72B6F6]/50 -rotate-1">
            Osito 💙
          </span>{' '}
          o{' '}
          <span className="inline-block px-3 py-0.5 rounded-2xl bg-[#FFC8DD]/70 text-[#97266D] border-2 border-[#FF94B8]/50 rotate-1">
            Osita 💗
          </span>
          ?
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#7D614D] leading-relaxed">
          {EVENT_CONFIG.heroQuote}
        </p>

        {/* Ilustración central reciclable de la pareja de ositos con globos */}
        <div className="my-6 flex justify-center">
          <BearMascot variant="couple" animated />
        </div>

        {/* Píldoras de resumen de fecha y hora */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Badge variant="blue" icon={<Calendar className="w-4 h-4" />}>
            {EVENT_CONFIG.displayDate}
          </Badge>
          <Badge variant="pink" icon={<Clock className="w-4 h-4" />}>
            {EVENT_CONFIG.displayTime}
          </Badge>
        </div>

        {/* Botones de acción principales */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8">
          <Button
            variant="pink"
            size="lg"
            onClick={onScrollToRsvp}
            leftIcon={<Heart className="w-5 h-5 fill-current" />}
          >
            Confirmar Asistencia
          </Button>
          <Button
            variant="blue"
            size="lg"
            onClick={onSelectTeamAndScroll}
            leftIcon={<Sparkles className="w-5 h-5" />}
          >
            Votar ¿Azul o Rosa?
          </Button>
        </div>
      </div>

      <CloudDivider color="#FFFDF9" />
    </header>
  );
};
