import React, { useState } from "react";
import {
  Check,
  Heart,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
  Users,
  Utensils,
} from "lucide-react";
import { EVENT_CONFIG } from "../../config/event.config";
import { useRsvpForm } from "../../hooks/useRsvpForm";
import { TeamGender } from "../../types/invitation.types";
import {
  Badge,
  BearMascot,
  Button,
  Card,
  InputField,
  SectionContainer,
  SectionHeader,
  TextAreaField,
} from "../ui";

export interface RsvpSectionProps {
  selectedTeam: TeamGender;
  onSelectTeam: (team: TeamGender) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  selectedTeam,
  onSelectTeam,
}) => {
  const {
    values,
    errors,
    isSubmitting,
    submittedEntry,
    savedList,
    updateField,
    handleSubmit,
    resetForm,
    getWhatsAppUrl,
  } = useRsvpForm(selectedTeam);

  const [showGuestbook, setShowGuestbook] = useState(false);

  const handleTeamChange = (team: TeamGender) => {
    updateField("teamVote", team);
    onSelectTeam(team);
  };

  return (
    <SectionContainer id="confirmar-asistencia" background="pastel-split">
      <SectionHeader
        showMiniBear
        badgeText="RSVP • Confirmación"
        badgeVariant="split"
        title="Confirma tu Asistencia"
        subtitle="Para nosotros es muy especial contar contigo. Por favor completa tus datos para reservar tu lugar."
      />

      <div className="max-w-2xl mx-auto">
        {submittedEntry ? (
          <Card
            variant={submittedEntry.teamVote === "boy" ? "blue" : "pink"}
            className="text-center py-10"
          >
            <div className="flex justify-center mb-4">
              <BearMascot
                variant={submittedEntry.teamVote}
                size="lg"
                animated
              />
            </div>

            <Badge
              variant={submittedEntry.teamVote === "boy" ? "blue" : "pink"}
              icon={<Check className="w-4 h-4" />}
              className="mb-3"
            >
              ¡Registro Guardado con Éxito!
            </Badge>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#5C4332]">
              ¡Muchas gracias, {submittedEntry.guestName}!
            </h3>

            <p className="mt-2 text-[#7D614D] max-w-md mx-auto">
              {submittedEntry.attending === "yes"
                ? `Hemos registrado tu confirmación para ${submittedEntry.guestsCount} ${
                    submittedEntry.guestsCount === 1 ? "persona" : "personas"
                  } apoyando al ${
                    submittedEntry.teamVote === "boy"
                      ? EVENT_CONFIG.boyTeamName
                      : EVENT_CONFIG.girlTeamName
                  }.`
                : "Gracias por avisarnos y por tus hermosos deseos para nuestro bebé."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl(submittedEntry)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  type="button"
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  Enviar Confirmación por WhatsApp
                </Button>
              </a>

              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={resetForm}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Registrar otro invitado
              </Button>
            </div>
          </Card>
        ) : (
          <Card variant="split">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Nombre Completo o Familia *"
                  placeholder="Ej. Familia Araya / Ana Gómez"
                  value={values.guestName}
                  onChange={(e) => updateField("guestName", e.target.value)}
                  error={errors.guestName}
                  icon={<Users className="w-4 h-4" />}
                />

                <InputField
                  label="Teléfono / WhatsApp (Opcional)"
                  type="tel"
                  placeholder="Ej. 8888-8888"
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  icon={<Phone className="w-4 h-4" />}
                />
              </div>

              {/* ¿Asistirás? */}
              <div>
                <label className="block text-sm font-display font-semibold text-[#5C4332] mb-2">
                  ¿Podrás acompañarnos en este día tan especial? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => updateField("attending", "yes")}
                    className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 font-display font-semibold border-2 transition-all cursor-pointer ${
                      values.attending === "yes"
                        ? "bg-[#E8F4FE] border-[#72B6F6] text-[#2B6CB0] shadow-xs"
                        : "bg-white border-[#E6D3C1] text-[#7D614D] hover:bg-[#FFFDF9]"
                    }`}
                  >
                    <span>🎉 ¡Sí, ahí estaré!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateField("attending", "no")}
                    className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 font-display font-semibold border-2 transition-all cursor-pointer ${
                      values.attending === "no"
                        ? "bg-[#FFF0F6] border-[#FF94B8] text-[#97266D] shadow-xs"
                        : "bg-white border-[#E6D3C1] text-[#7D614D] hover:bg-[#FFFDF9]"
                    }`}
                  >
                    <span>💌 No podré, los acompaño de corazón</span>
                  </button>
                </div>
              </div>

              {/* Cantidad de personas y notas (solo si asiste) */}
              {values.attending === "yes" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="guests-count"
                      className="block text-sm font-display font-semibold text-[#5C4332] mb-1.5"
                    >
                      Número de Asistentes (incluyéndote) *
                    </label>
                    <select
                      id="guests-count"
                      value={values.guestsCount}
                      onChange={(e) =>
                        updateField("guestsCount", Number(e.target.value))
                      }
                      className="w-full rounded-2xl bg-white border-2 border-[#E6D3C1] focus:border-[#72B6F6] px-4 py-3 text-[#5C4332] font-semibold focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Persona" : "Personas"}
                        </option>
                      ))}
                    </select>
                    {errors.guestsCount && (
                      <p className="mt-1 text-xs font-semibold text-rose-600">
                        {errors.guestsCount}
                      </p>
                    )}
                  </div>

                  <InputField
                    label="Alergias o Nota Especial (Opcional)"
                    placeholder="Ej. 1 silla de bebé, vegetariano..."
                    value={values.dietaryOrNotes}
                    onChange={(e) =>
                      updateField("dietaryOrNotes", e.target.value)
                    }
                    icon={<Utensils className="w-4 h-4" />}
                  />
                </div>
              )}

              {/* Selector de Equipo: Azul o Rosa */}
              <div>
                <label className="block text-sm font-display font-semibold text-[#5C4332] mb-2">
                  Tu Predicción: *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleTeamChange("boy")}
                    className={`flex flex-col items-center justify-center rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                      values.teamVote === "boy"
                        ? "bg-[#BDE0FE]/75 border-[#72B6F6] text-[#2B6CB0] ring-2 ring-[#72B6F6]"
                        : "bg-white border-[#E6D3C1] text-[#7D614D] hover:bg-[#E8F4FE]/40"
                    }`}
                  >
                    <span className="text-2xl mb-1">🧸💙</span>
                    <span className="font-display font-bold text-sm sm:text-base">
                      {EVENT_CONFIG.boyOptionLabel}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTeamChange("girl")}
                    className={`flex flex-col items-center justify-center rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                      values.teamVote === "girl"
                        ? "bg-[#FFC8DD]/75 border-[#FF94B8] text-[#97266D] ring-2 ring-[#FF94B8]"
                        : "bg-white border-[#E6D3C1] text-[#7D614D] hover:bg-[#FFF0F6]/40"
                    }`}
                  >
                    <span className="text-2xl mb-1">🧸💗</span>
                    <span className="font-display font-bold text-sm sm:text-base">
                      {EVENT_CONFIG.girlOptionLabel}
                    </span>
                  </button>
                </div>
              </div>

              {/* Mensaje para el bebé */}
              <TextAreaField
                label="Mensaje de cariño para el Bebé y los Papás (Opcional)"
                rows={3}
                placeholder="Escribe tus buenos deseos para nuestro pequeño osito o osita..."
                value={values.messageForBaby}
                onChange={(e) => updateField("messageForBaby", e.target.value)}
              />

              {/* Botón de envío */}
              <Button
                type="submit"
                variant={values.teamVote === "boy" ? "blue" : "pink"}
                size="lg"
                fullWidth
                disabled={isSubmitting}
                leftIcon={<Send className="w-5 h-5" />}
              >
                {isSubmitting
                  ? "Guardando confirmación..."
                  : `Confirmar Asistencia (${
                      values.teamVote === "boy"
                        ? "Team Osito 💙"
                        : "Team Osita 💗"
                    })`}
              </Button>
            </form>
          </Card>
        )}

        {/* Muro de confirmaciones / deseos registrados en el dispositivo */}
        {savedList.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowGuestbook((prev) => !prev)}
              leftIcon={
                <Heart className="w-4 h-4 text-[#FF94B8] fill-current" />
              }
            >
              {showGuestbook
                ? "Ocultar confirmaciones recientes"
                : `Ver confirmaciones y deseos (${savedList.length})`}
            </Button>

            {showGuestbook && (
              <div className="mt-4 space-y-3 text-left">
                {savedList.map((entry) => (
                  <Card
                    key={entry.id}
                    variant={entry.teamVote === "boy" ? "blue" : "pink"}
                    className="p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-display font-bold text-[#5C4332]">
                        {entry.guestName}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={entry.teamVote === "boy" ? "blue" : "pink"}
                        >
                          {entry.teamVote === "boy"
                            ? "🧸💙 Osito"
                            : "🧸💗 Osita"}
                        </Badge>
                        <Badge variant="neutral">
                          {entry.attending === "yes"
                            ? `Asiste (${entry.guestsCount})`
                            : "No asiste"}
                        </Badge>
                      </div>
                    </div>
                    {entry.messageForBaby && (
                      <p className="mt-2 text-sm italic text-[#7D614D]">
                        "{entry.messageForBaby}"
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  );
};
