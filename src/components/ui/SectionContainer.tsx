import React from 'react';
import { BearMascot } from './BearMascot';
import { Badge } from './Badge';
import { ThemeVariant } from '../../types/invitation.types';

export interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  background?: 'cream' | 'pastel-split' | 'blue-tint' | 'pink-tint';
  className?: string;
}

const BG_STYLES: Record<NonNullable<SectionContainerProps['background']>, string> = {
  cream: 'bg-[#FFFDF9]',
  'pastel-split': 'bg-gradient-to-r from-[#E8F4FE]/60 via-[#FFFDF9] to-[#FFF0F6]/60',
  'blue-tint': 'bg-[#E8F4FE]/45',
  'pink-tint': 'bg-[#FFF0F6]/45',
};

/**
 * Pieza reciclable: Contenedor estándar de sección con ancho máximo y espaciado responsivo.
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  background = 'cream',
  className = '',
}) => {
  return (
    <section id={id} className={`relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 ${BG_STYLES[background]} ${className}`}>
      <div className="max-w-4xl mx-auto relative z-10">{children}</div>
    </section>
  );
};

export interface SectionHeaderProps {
  badgeText?: string;
  badgeVariant?: ThemeVariant;
  title: string;
  subtitle?: string;
  showMiniBear?: boolean;
}

/**
 * Pieza reciclable: Encabezado de sección con osito opcional, insignia, título y subtítulo.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeVariant = 'split',
  title,
  subtitle,
  showMiniBear = false,
}) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
      {showMiniBear && (
        <div className="flex justify-center mb-2">
          <BearMascot variant="mini" size="sm" />
        </div>
      )}
      {badgeText && (
        <div className="mb-3">
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#5C4332] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[#7D614D] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
