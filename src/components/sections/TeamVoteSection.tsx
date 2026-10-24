import React, { useState, useEffect } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { EVENT_CONFIG } from '../../config/event.config';
import { TeamGender } from '../../types/invitation.types';
import { Badge, BearMascot, Button, Card, SectionContainer, SectionHeader } from '../ui';
import { rsvpService } from '../../services/rsvp.service';
import confetti from 'canvas-confetti';

export interface TeamVoteSectionProps {
  selectedTeam: TeamGender;
  onSelectTeam: (team: TeamGender) => void;
}

export const TeamVoteSection: React.FC<TeamVoteSectionProps> = ({
  selectedTeam,
  onSelectTeam,
}) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState({
    boy: EVENT_CONFIG.initialVotes.boy,
    girl: EVENT_CONFIG.initialVotes.girl,
  });

  useEffect(() => {
    let isMounted = true;
    rsvpService.fetchLiveStats().then((stats) => {
      if (isMounted && stats && (stats.totalBoyVotes > 0 || stats.totalGirlVotes > 0)) {
        setVotes({
          boy: stats.totalBoyVotes,
          girl: stats.totalGirlVotes,
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleVote = async (team: TeamGender) => {
    onSelectTeam(team);
    if (!hasVoted) {
      setVotes((prev) => ({
        ...prev,
        [team]: prev[team] + 1,
      }));
      setHasVoted(true);
      const updated = await rsvpService.submitQuickVote(team);
      if (updated && (updated.totalBoyVotes > 0 || updated.totalGirlVotes > 0)) {
        setVotes({
          boy: updated.totalBoyVotes,
          girl: updated.totalGirlVotes,
        });
      }
    }

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: team === 'boy' ? ['#BDE0FE', '#72B6F6'] : ['#FFC8DD', '#FF94B8'],
      });
    } catch {
      // Ignorar si falla confetti
    }
  };

  const totalVotes = Math.max(1, votes.boy + votes.girl);
  const boyPercent = Math.round((votes.boy / totalVotes) * 100);
  const girlPercent = 100 - boyPercent;

  return (
    <SectionContainer id="votacion" background="cream">
      <SectionHeader
        badgeText="¡Haz tu predicción!"
        badgeVariant="split"
        title="¿Team Osito 💙 o Team Osita 💗?"
        subtitle="Elige tu equipo favorito antes de confirmar tu asistencia. ¡Tu elección quedará seleccionada automáticamente en el formulario!"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Tarjeta Team Niño (Azul Pastel) */}
        <Card
          variant="blue"
          hoverable
          onClick={() => handleVote('boy')}
          className={`text-center relative transition-all ${
            selectedTeam === 'boy'
              ? 'ring-4 ring-[#72B6F6] scale-[1.01]'
              : 'opacity-90 hover:opacity-100'
          }`}
        >
          {selectedTeam === 'boy' && (
            <div className="absolute top-4 right-4">
              <Badge variant="blue" icon={<CheckCircle2 className="w-4 h-4" />}>
                Tu Equipo
              </Badge>
            </div>
          )}

          <div className="flex justify-center mb-3">
            <BearMascot variant="boy" size="lg" />
          </div>

          <h3 className="text-2xl font-display font-bold text-[#2B6CB0]">
            {EVENT_CONFIG.boyTeamName}
          </h3>
          <p className="text-sm text-[#4A6B8A] mt-1 mb-5">
            ¡Creo que viene un travieso osito de corbatín azul!
          </p>

          <Button
            type="button"
            variant="blue"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              handleVote('boy');
            }}
          >
            {selectedTeam === 'boy' ? '¡Elegiste Team Osito! 💙' : 'Votar por Osito 💙'}
          </Button>
        </Card>

        {/* Tarjeta Team Niña (Rosa Pastel) */}
        <Card
          variant="pink"
          hoverable
          onClick={() => handleVote('girl')}
          className={`text-center relative transition-all ${
            selectedTeam === 'girl'
              ? 'ring-4 ring-[#FF94B8] scale-[1.01]'
              : 'opacity-90 hover:opacity-100'
          }`}
        >
          {selectedTeam === 'girl' && (
            <div className="absolute top-4 right-4">
              <Badge variant="pink" icon={<CheckCircle2 className="w-4 h-4" />}>
                Tu Equipo
              </Badge>
            </div>
          )}

          <div className="flex justify-center mb-3">
            <BearMascot variant="girl" size="lg" />
          </div>

          <h3 className="text-2xl font-display font-bold text-[#97266D]">
            {EVENT_CONFIG.girlTeamName}
          </h3>
          <p className="text-sm text-[#8A4A6B] mt-1 mb-5">
            ¡Creo que viene una dulce osita de lazo rosado!
          </p>

          <Button
            type="button"
            variant="pink"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              handleVote('girl');
            }}
          >
            {selectedTeam === 'girl' ? '¡Elegiste Team Osita! 💗' : 'Votar por Osita 💗'}
          </Button>
        </Card>
      </div>

      {/* Barra de marcador interactivo */}
      <Card variant="neutral" className="p-5 sm:p-6">
        <div className="flex items-center justify-between text-sm font-display font-bold mb-2">
          <span className="text-[#2B6CB0] flex items-center gap-1.5">
            🧸💙 Osito ({votes.boy} votos • {boyPercent}%)
          </span>
          <span className="text-[#5C4332] hidden sm:inline-flex items-center gap-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B08259]" /> Marcador en tiempo real
          </span>
          <span className="text-[#97266D] flex items-center gap-1.5">
            ({girlPercent}% • {votes.girl} votos) Osita 💗🧸
          </span>
        </div>

        <div className="w-full h-5 rounded-full overflow-hidden flex bg-[#F5EBE1] p-0.5 border border-[#E6D3C1]">
          <div
            style={{ width: `${boyPercent}%` }}
            className="bg-gradient-to-r from-[#72B6F6] to-[#BDE0FE] rounded-l-full transition-all duration-500"
          />
          <div
            style={{ width: `${girlPercent}%` }}
            className="bg-gradient-to-r from-[#FFC8DD] to-[#FF94B8] rounded-r-full transition-all duration-500"
          />
        </div>
      </Card>
    </SectionContainer>
  );
};
