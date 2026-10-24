import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'blue' | 'pink' | 'split' | 'outline' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const VARIANT_STYLES: Record<NonNullable<ButtonProps['variant']>, string> = {
  blue:
    'bg-[#BDE0FE] hover:bg-[#9FD0FC] text-[#2B6CB0] border-2 border-[#72B6F6] shadow-[0_4px_0_#72B6F6] active:translate-y-0.5 active:shadow-[0_2px_0_#72B6F6]',
  pink:
    'bg-[#FFC8DD] hover:bg-[#FFB3D0] text-[#97266D] border-2 border-[#FF94B8] shadow-[0_4px_0_#FF94B8] active:translate-y-0.5 active:shadow-[0_2px_0_#FF94B8]',
  split:
    'bg-gradient-to-r from-[#BDE0FE] via-[#F5EBE1] to-[#FFC8DD] hover:from-[#A2D2FF] hover:to-[#FFAFCC] text-[#5C4332] border-2 border-[#D9B38C] shadow-[0_4px_0_#D9B38C] active:translate-y-0.5 active:shadow-[0_2px_0_#D9B38C]',
  outline:
    'bg-white/90 hover:bg-[#F5EBE1]/60 text-[#5C4332] border-2 border-[#D9B38C] shadow-[0_3px_0_#E6D3C1] active:translate-y-0.5',
  whatsapp:
    'bg-[#D8F3DC] hover:bg-[#B7E4C7] text-[#1B4332] border-2 border-[#74C69D] shadow-[0_4px_0_#74C69D] active:translate-y-0.5',
};

const SIZE_STYLES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

/**
 * Pieza reciclable: Botón con estética pastel y efecto táctil suave.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'split',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2.5 font-display font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        VARIANT_STYLES[variant]
      } ${SIZE_STYLES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
