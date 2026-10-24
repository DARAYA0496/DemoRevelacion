import React from 'react';
import { EVENT_CONFIG } from '../../config/event.config';
import { BearMascot, Button } from '../ui';

export interface NavbarProps {
  onScrollToRsvp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToRsvp }) => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#FFFDF9]/85 border-b border-[#F0E1D2] px-4 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <a
          href="#"
          className="flex items-center gap-2 font-display font-bold text-[#5C4332] text-base sm:text-lg"
        >
          <BearMascot variant="mini" size="sm" animated={false} className="!w-9 !h-9" />
          <span>{EVENT_CONFIG.parentsNames}</span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-display font-semibold text-[#7D614D]">
          <a href="#cuenta-regresiva" className="hover:text-[#2B6CB0] transition-colors">
            Cuenta Regresiva
          </a>
          <a href="#detalles" className="hover:text-[#97266D] transition-colors">
            Detalles
          </a>
          <a href="#votacion" className="hover:text-[#2B6CB0] transition-colors">
            ¿Osito o Osita?
          </a>
        </div>

        <Button variant="split" size="sm" onClick={onScrollToRsvp}>
          Confirmar 🧸
        </Button>
      </div>
    </nav>
  );
};
