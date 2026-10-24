import React from 'react';
import { Calendar, Clock, ExternalLink, Gift, MapPin, Shirt, Sparkles } from 'lucide-react';
import { EVENT_CONFIG } from '../../config/event.config';
import { EventDetailItem } from '../../types/invitation.types';
import { Badge, Button, Card, SectionContainer, SectionHeader } from '../ui';

const renderDetailIcon = (iconName: EventDetailItem['iconName']) => {
  const iconClass = 'w-6 h-6';
  switch (iconName) {
    case 'calendar':
      return <Calendar className={iconClass} />;
    case 'clock':
      return <Clock className={iconClass} />;
    case 'map-pin':
      return <MapPin className={iconClass} />;
    case 'shirt':
      return <Shirt className={iconClass} />;
    case 'gift':
      return <Gift className={iconClass} />;
    default:
      return <Sparkles className={iconClass} />;
  }
};

export const EventDetailsSection: React.FC = () => {
  return (
    <SectionContainer id="detalles" background="pastel-split">
      <SectionHeader
        badgeText="Coordenadas del Evento"
        badgeVariant="split"
        title="Detalles de la Celebración"
        subtitle="Hemos preparado una tarde llena de juegos, postres, ositos y mucha emoción para compartir en familia."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EVENT_CONFIG.details.map((item) => {
          const isBlue = item.variant === 'blue';
          const isPink = item.variant === 'pink';

          return (
            <Card
              key={item.id}
              variant={item.variant}
              hoverable
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${
                      isBlue
                        ? 'bg-[#BDE0FE]/70 border-[#72B6F6] text-[#2B6CB0]'
                        : isPink
                        ? 'bg-[#FFC8DD]/70 border-[#FF94B8] text-[#97266D]'
                        : 'bg-[#F5EBE1] border-[#D9B38C] text-[#5C4332]'
                    }`}
                  >
                    {renderDetailIcon(item.iconName)}
                  </div>
                  <Badge variant={item.variant}>{item.title}</Badge>
                </div>

                <h3 className="text-xl font-display font-bold text-[#5C4332] mb-2">
                  {item.subtitle}
                </h3>
                <p className="text-sm sm:text-base text-[#7D614D] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.actionUrl && item.actionLabel && (
                <div className="mt-6 pt-4 border-t border-[#E6D3C1]/60">
                  <a
                    href={item.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      type="button"
                      variant={item.variant === 'pink' ? 'pink' : 'blue'}
                      size="sm"
                      fullWidth
                      rightIcon={<ExternalLink className="w-4 h-4" />}
                    >
                      {item.actionLabel}
                    </Button>
                  </a>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
};
