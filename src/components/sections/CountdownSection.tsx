import React from 'react';
import { EVENT_CONFIG } from '../../config/event.config';
import { useCountdown } from '../../hooks/useCountdown';
import { Card, SectionContainer, SectionHeader } from '../ui';

interface TimeBoxProps {
  value: number;
  label: string;
  tone: 'blue' | 'pink';
}

/**
 * Subcomponente reciclable para cada bloque de tiempo.
 */
const TimeBox: React.FC<TimeBoxProps> = ({ value, label, tone }) => {
  const isBlue = tone === 'blue';
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl p-4 sm:p-6 border-2 transition-transform hover:scale-105 ${
        isBlue
          ? 'bg-[#E8F4FE] border-[#BDE0FE] text-[#2B6CB0] shadow-[0_6px_0_#BDE0FE]'
          : 'bg-[#FFF0F6] border-[#FFC8DD] text-[#97266D] shadow-[0_6px_0_#FFC8DD]'
      }`}
    >
      <span className="text-3xl sm:text-5xl font-display font-bold tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider opacity-85">
        {label}
      </span>
    </div>
  );
};

export const CountdownSection: React.FC = () => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(
    EVENT_CONFIG.eventDateISO
  );

  return (
    <SectionContainer id="cuenta-regresiva" background="cream" className="py-10 sm:py-14">
      <SectionHeader
        showMiniBear
        badgeText="La espera casi termina"
        badgeVariant="neutral"
        title="Cuenta Regresiva para el Gran Día"
        subtitle="Cada segundo nos acerca más a conocer si nuestro osito vestirá de azul o de rosa."
      />

      <Card variant="split" className="max-w-3xl mx-auto">
        {isExpired ? (
          <div className="text-center py-6">
            <p className="text-2xl sm:text-3xl font-display font-bold text-[#5C4332]">
              🎉 ¡Hoy es el gran día de la revelación! 🧸💙💗
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <TimeBox value={days} label="Días" tone="blue" />
            <TimeBox value={hours} label="Horas" tone="pink" />
            <TimeBox value={minutes} label="Minutos" tone="blue" />
            <TimeBox value={seconds} label="Segundos" tone="pink" />
          </div>
        )}
      </Card>
    </SectionContainer>
  );
};
