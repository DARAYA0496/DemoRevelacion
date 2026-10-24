import React from 'react';
import { EVENT_CONFIG } from '../../config/event.config';
import { BearMascot, CloudDivider } from '../ui';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#E8F4FE] via-[#FFFDF9] to-[#FFF0F6] pt-4 pb-12 text-center border-t border-[#F0E1D2]">
      <CloudDivider flip color="#FFFDF9" className="-mt-4 mb-6" />

      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
        <BearMascot variant="mini" size="sm" />
        <p className="mt-3 font-display font-bold text-xl text-[#5C4332]">
          Con todo nuestro amor, {EVENT_CONFIG.parentsNames}
        </p>
        <p className="mt-1 text-sm text-[#7D614D]">
          ¡Gracias por ser parte de la historia de {EVENT_CONFIG.babyNickname.toLowerCase()}! 🧸💙💗
        </p>
      </div>
    </footer>
  );
};
