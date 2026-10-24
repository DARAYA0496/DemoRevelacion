import React from 'react';
import { ThemeVariant } from '../../types/invitation.types';

export interface CardProps {
  children: React.ReactNode;
  variant?: ThemeVariant;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

const CARD_VARIANTS: Record<ThemeVariant, string> = {
  blue: 'bg-gradient-to-b from-[#E8F4FE]/90 to-white border-2 border-[#BDE0FE] shadow-[0_8px_24px_-6px_rgba(114,182,246,0.25)]',
  pink: 'bg-gradient-to-b from-[#FFF0F6]/90 to-white border-2 border-[#FFC8DD] shadow-[0_8px_24px_-6px_rgba(255,148,184,0.25)]',
  neutral: 'bg-white/95 border-2 border-[#F0E1D2] shadow-[0_8px_24px_-6px_rgba(176,130,89,0.14)]',
  split:
    'bg-gradient-to-br from-[#E8F4FE]/85 via-white to-[#FFF0F6]/85 border-2 border-[#E6D3C1] shadow-[0_10px_30px_-8px_rgba(176,130,89,0.18)]',
};

/**
 * Pieza reciclable: Contenedor de tarjeta con bordes redondeados y variantes pastel.
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'neutral',
  className = '',
  hoverable = false,
  onClick,
}) => {
  const hoverStyles = hoverable
    ? 'transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-6 sm:p-8 backdrop-blur-sm ${CARD_VARIANTS[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};
