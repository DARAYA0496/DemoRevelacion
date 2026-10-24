import React from 'react';

export interface CloudDividerProps {
  flip?: boolean;
  color?: string;
  className?: string;
}

/**
 * Pieza reciclable: Divisor suave en forma de nubes para separar secciones.
 */
export const CloudDivider: React.FC<CloudDividerProps> = ({
  flip = false,
  color = '#FFFDF9',
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${
        flip ? 'rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12 block"
      >
        <path
          d="M0,45 C120,90 240,5 360,45 C480,85 600,10 720,45 C840,80 960,15 1080,45 C1140,60 1175,35 1200,45 L1200,90 L0,90 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
