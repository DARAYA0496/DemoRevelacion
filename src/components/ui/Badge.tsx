import React from 'react';
import { ThemeVariant } from '../../types/invitation.types';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: ThemeVariant;
  icon?: React.ReactNode;
  className?: string;
}

const BADGE_VARIANTS: Record<ThemeVariant, string> = {
  blue: 'bg-[#E8F4FE] text-[#2B6CB0] border border-[#BDE0FE]',
  pink: 'bg-[#FFF0F6] text-[#97266D] border border-[#FFC8DD]',
  neutral: 'bg-[#F5EBE1] text-[#5C4332] border border-[#D9B38C]',
  split: 'bg-gradient-to-r from-[#E8F4FE] via-[#FFFDF9] to-[#FFF0F6] text-[#5C4332] border border-[#D9B38C]',
};

/**
 * Pieza reciclable: Etiqueta tipo píldora para destacar fechas, estados o equipos.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'split',
  icon,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-display font-semibold shadow-xs ${BADGE_VARIANTS[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
