import React, { useState } from 'react';
import { TeamGender } from './types/invitation.types';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { EventDetailsSection } from './components/sections/EventDetailsSection';
import { TeamVoteSection } from './components/sections/TeamVoteSection';
import { RsvpSection } from './components/sections/RsvpSection';
import { FooterSection } from './components/sections/FooterSection';

export const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamGender>('boy');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#5C4332]">
      <Navbar onScrollToRsvp={() => scrollToSection('confirmar-asistencia')} />

      <main className="flex-1">
        <HeroSection
          onScrollToRsvp={() => scrollToSection('confirmar-asistencia')}
          onSelectTeamAndScroll={() => scrollToSection('votacion')}
        />

        <CountdownSection />

        <EventDetailsSection />

        <TeamVoteSection
          selectedTeam={selectedTeam}
          onSelectTeam={(team) => setSelectedTeam(team)}
        />

        <RsvpSection
          selectedTeam={selectedTeam}
          onSelectTeam={(team) => setSelectedTeam(team)}
        />
      </main>

      <FooterSection />
    </div>
  );
};

export default App;
