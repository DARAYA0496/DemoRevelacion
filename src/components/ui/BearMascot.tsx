import React from 'react';

export interface BearMascotProps {
  variant?: 'boy' | 'girl' | 'couple' | 'mini';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-16 h-16',
  md: 'w-28 h-28',
  lg: 'w-40 h-40',
  xl: 'w-64 h-64',
};

/**
 * Componente reciclable de Osito(s) en SVG vectorial.
 * Soporta variantes: 'boy' (corbatín azul), 'girl' (lazo rosa), 'couple' (ambos con globos), 'mini' (carita).
 */
export const BearMascot: React.FC<BearMascotProps> = ({
  variant = 'boy',
  size = 'md',
  animated = true,
  className = '',
}) => {
  const animClass = animated ? 'animate-float-slow' : '';

  if (variant === 'mini') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${SIZE_MAP[size]} ${animClass} ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Orejas */}
        <circle cx="24" cy="28" r="16" fill="#C69C6D" />
        <circle cx="24" cy="28" r="9" fill="#FFC8DD" />
        <circle cx="76" cy="28" r="16" fill="#C69C6D" />
        <circle cx="76" cy="28" r="9" fill="#BDE0FE" />
        {/* Cabeza */}
        <circle cx="50" cy="54" r="34" fill="#D9B38C" />
        {/* Hocico */}
        <ellipse cx="50" cy="61" rx="14" ry="11" fill="#FFFDF9" />
        <ellipse cx="50" cy="57" rx="5.5" ry="4" fill="#5C4332" />
        <path
          d="M50 61V65M50 65C47 68 43 67 42 65M50 65C53 68 57 67 58 65"
          stroke="#5C4332"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Ojos */}
        <circle cx="37" cy="48" r="4" fill="#5C4332" />
        <circle cx="35.5" cy="46.5" r="1.3" fill="#FFFFFF" />
        <circle cx="63" cy="48" r="4" fill="#5C4332" />
        <circle cx="61.5" cy="46.5" r="1.3" fill="#FFFFFF" />
        {/* Mejillas mitad rosa mitad azul */}
        <ellipse cx="29" cy="56" rx="5.5" ry="3.5" fill="#FFAFCC" opacity="0.7" />
        <ellipse cx="71" cy="56" rx="5.5" ry="3.5" fill="#A2D2FF" opacity="0.8" />
      </svg>
    );
  }

  if (variant === 'couple') {
    return (
      <svg
        viewBox="0 0 360 260"
        className={`w-full max-w-[360px] h-auto ${animClass} ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Pareja de ositos con globos azul pastel y rosa pastel"
      >
        {/* Nube de fondo suave */}
        <path
          d="M50 225C30 225 18 212 22 195C25 181 40 175 52 178C60 160 85 152 106 162C122 145 155 142 175 158C195 142 228 145 245 162C268 152 292 162 300 178C315 175 332 183 335 198C338 214 324 225 305 225H50Z"
          fill="#FFFFFF"
          stroke="#F3E5D8"
          strokeWidth="3"
        />

        {/* Hilos de los globos */}
        <path
          d="M82 95C78 125 90 145 102 168"
          stroke="#B08259"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <path
          d="M278 95C282 125 270 145 258 168"
          stroke="#B08259"
          strokeWidth="2"
          strokeDasharray="3 3"
        />

        {/* Globo Azul Pastel (Izquierda) */}
        <g className="animate-float-reverse">
          <ellipse cx="76" cy="55" rx="32" ry="38" fill="#BDE0FE" stroke="#72B6F6" strokeWidth="2.5" />
          <ellipse cx="64" cy="40" rx="7" ry="12" transform="rotate(-20 64 40)" fill="#FFFFFF" opacity="0.65" />
          <polygon points="76,93 71,99 81,99" fill="#72B6F6" />
          <text x="76" y="63" textAnchor="middle" fill="#2B6CB0" fontSize="22" fontWeight="bold" fontFamily="Fredoka, sans-serif">
            ?
          </text>
        </g>

        {/* Globo Rosa Pastel (Derecha) */}
        <g className="animate-float-slow">
          <ellipse cx="284" cy="55" rx="32" ry="38" fill="#FFC8DD" stroke="#FF94B8" strokeWidth="2.5" />
          <ellipse cx="272" cy="40" rx="7" ry="12" transform="rotate(-20 272 40)" fill="#FFFFFF" opacity="0.65" />
          <polygon points="284,93 279,99 289,99" fill="#FF94B8" />
          <text x="284" y="63" textAnchor="middle" fill="#97266D" fontSize="22" fontWeight="bold" fontFamily="Fredoka, sans-serif">
            ?
          </text>
        </g>

        {/* ================= OSITO NIÑO (IZQUIERDA) ================= */}
        <g transform="translate(68, 86)">
          {/* Orejas */}
          <circle cx="26" cy="24" r="15" fill="#B08259" />
          <circle cx="26" cy="24" r="8.5" fill="#BDE0FE" />
          <circle cx="82" cy="24" r="15" fill="#B08259" />
          <circle cx="82" cy="24" r="8.5" fill="#BDE0FE" />

          {/* Cuerpo */}
          <ellipse cx="54" cy="102" rx="33" ry="32" fill="#D9B38C" />
          <ellipse cx="54" cy="105" rx="20" ry="20" fill="#FFFDF9" />

          {/* Brazos */}
          <ellipse cx="20" cy="95" rx="11" ry="18" transform="rotate(25 20 95)" fill="#C69C6D" />
          <ellipse cx="86" cy="95" rx="11" ry="18" transform="rotate(-25 86 95)" fill="#C69C6D" />

          {/* Patitas */}
          <circle cx="34" cy="128" r="13" fill="#C69C6D" />
          <circle cx="34" cy="129" r="7" fill="#BDE0FE" />
          <circle cx="74" cy="128" r="13" fill="#C69C6D" />
          <circle cx="74" cy="129" r="7" fill="#BDE0FE" />

          {/* Cabeza */}
          <circle cx="54" cy="52" r="34" fill="#D9B38C" />

          {/* Hocico */}
          <ellipse cx="54" cy="59" rx="14" ry="10.5" fill="#FFFDF9" />
          <ellipse cx="54" cy="55" rx="5" ry="3.8" fill="#5C4332" />
          <path
            d="M54 59V63M54 63C51 66 47 65 46 63M54 63C57 66 61 65 62 63"
            stroke="#5C4332"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Ojos y Mejillas */}
          <circle cx="41" cy="46" r="3.8" fill="#5C4332" />
          <circle cx="39.8" cy="44.5" r="1.2" fill="#FFFFFF" />
          <circle cx="67" cy="46" r="3.8" fill="#5C4332" />
          <circle cx="65.8" cy="44.5" r="1.2" fill="#FFFFFF" />
          <ellipse cx="33" cy="54" rx="5.5" ry="3.2" fill="#FFAFCC" opacity="0.65" />
          <ellipse cx="75" cy="54" rx="5.5" ry="3.2" fill="#FFAFCC" opacity="0.65" />

          {/* Corbatín Azul Pastel */}
          <path d="M54 83L40 76V90L54 83Z" fill="#72B6F6" />
          <path d="M54 83L68 76V90L54 83Z" fill="#72B6F6" />
          <circle cx="54" cy="83" r="4.5" fill="#BDE0FE" stroke="#72B6F6" strokeWidth="1.5" />
        </g>

        {/* ================= OSITA NIÑA (DERECHA) ================= */}
        <g transform="translate(184, 86)">
          {/* Orejas */}
          <circle cx="26" cy="24" r="15" fill="#B08259" />
          <circle cx="26" cy="24" r="8.5" fill="#FFC8DD" />
          <circle cx="82" cy="24" r="15" fill="#B08259" />
          <circle cx="82" cy="24" r="8.5" fill="#FFC8DD" />

          {/* Cuerpo */}
          <ellipse cx="54" cy="102" rx="33" ry="32" fill="#D9B38C" />
          <ellipse cx="54" cy="105" rx="20" ry="20" fill="#FFFDF9" />

          {/* Brazos */}
          <ellipse cx="22" cy="95" rx="11" ry="18" transform="rotate(25 22 95)" fill="#C69C6D" />
          <ellipse cx="88" cy="95" rx="11" ry="18" transform="rotate(-25 88 95)" fill="#C69C6D" />

          {/* Patitas */}
          <circle cx="34" cy="128" r="13" fill="#C69C6D" />
          <circle cx="34" cy="129" r="7" fill="#FFC8DD" />
          <circle cx="74" cy="128" r="13" fill="#C69C6D" />
          <circle cx="74" cy="129" r="7" fill="#FFC8DD" />

          {/* Cabeza */}
          <circle cx="54" cy="52" r="34" fill="#D9B38C" />

          {/* Moñito Rosa en la cabeza */}
          <g transform="translate(65, 16) rotate(15)">
            <path d="M0 0L-13 -7V7L0 0Z" fill="#FF94B8" />
            <path d="M0 0L13 -7V7L0 0Z" fill="#FF94B8" />
            <circle cx="0" cy="0" r="4" fill="#FFC8DD" stroke="#FF94B8" strokeWidth="1.5" />
          </g>

          {/* Hocico */}
          <ellipse cx="54" cy="59" rx="14" ry="10.5" fill="#FFFDF9" />
          <ellipse cx="54" cy="55" rx="5" ry="3.8" fill="#5C4332" />
          <path
            d="M54 59V63M54 63C51 66 47 65 46 63M54 63C57 66 61 65 62 63"
            stroke="#5C4332"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Ojos con pestañas y Mejillas */}
          <circle cx="41" cy="46" r="3.8" fill="#5C4332" />
          <circle cx="39.8" cy="44.5" r="1.2" fill="#FFFFFF" />
          <path d="M37 43L34 40M40 42L39 39" stroke="#5C4332" strokeWidth="1.6" strokeLinecap="round" />

          <circle cx="67" cy="46" r="3.8" fill="#5C4332" />
          <circle cx="65.8" cy="44.5" r="1.2" fill="#FFFFFF" />
          <path d="M71 43L74 40M68 42L69 39" stroke="#5C4332" strokeWidth="1.6" strokeLinecap="round" />

          <ellipse cx="33" cy="54" rx="6" ry="3.5" fill="#FF94B8" opacity="0.65" />
          <ellipse cx="75" cy="54" rx="6" ry="3.5" fill="#FF94B8" opacity="0.65" />
        </g>

        {/* Corazón Central Bicolor */}
        <g transform="translate(180, 72)" className="animate-pulse-soft">
          <path
            d="M0 12C0 12 -18 -2 -18 -11C-18 -17 -13 -21 -8 -21C-4 -21 -1 -18 0 -15C1 -18 4 -21 8 -21C13 -21 18 -17 18 -11C18 -2 0 12 0 12Z"
            fill="url(#heartGradient)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>

        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#72B6F6" />
            <stop offset="50%" stopColor="#BDE0FE" />
            <stop offset="50%" stopColor="#FFC8DD" />
            <stop offset="100%" stopColor="#FF94B8" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Variante Individual: 'boy' o 'girl'
  const isBoy = variant === 'boy';
  const accentColor = isBoy ? '#BDE0FE' : '#FFC8DD';
  const strongAccent = isBoy ? '#72B6F6' : '#FF94B8';

  return (
    <svg
      viewBox="0 0 140 160"
      className={`${SIZE_MAP[size]} ${animClass} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={isBoy ? 'Osito con corbatín azul pastel' : 'Osita con lazo rosa pastel'}
    >
      {/* Orejas */}
      <circle cx="38" cy="34" r="17" fill="#B08259" />
      <circle cx="38" cy="34" r="9.5" fill={accentColor} />
      <circle cx="102" cy="34" r="17" fill="#B08259" />
      <circle cx="102" cy="34" r="9.5" fill={accentColor} />

      {/* Cuerpo */}
      <ellipse cx="70" cy="116" rx="36" ry="34" fill="#D9B38C" />
      <ellipse cx="70" cy="119" rx="22" ry="21" fill="#FFFDF9" />

      {/* Corazón en la pancita */}
      <path
        d="M70 126C70 126 59 117 59 111C59 107 62 104 65 104C68 104 69 106 70 108C71 106 72 104 75 104C78 104 81 107 81 111C81 117 70 126 70 126Z"
        fill={accentColor}
        stroke={strongAccent}
        strokeWidth="1.5"
      />

      {/* Brazos */}
      <ellipse cx="33" cy="108" rx="12" ry="19" transform="rotate(22 33 108)" fill="#C69C6D" />
      <ellipse cx="107" cy="108" rx="12" ry="19" transform="rotate(-22 107 108)" fill="#C69C6D" />

      {/* Patitas */}
      <circle cx="48" cy="142" r="14" fill="#C69C6D" />
      <circle cx="48" cy="143" r="7.5" fill={accentColor} />
      <circle cx="92" cy="142" r="14" fill="#C69C6D" />
      <circle cx="92" cy="143" r="7.5" fill={accentColor} />

      {/* Cabeza */}
      <circle cx="70" cy="64" r="37" fill="#D9B38C" />

      {/* Lazo en la cabeza si es niña */}
      {!isBoy && (
        <g transform="translate(88, 25) rotate(14)">
          <path d="M0 0L-14 -8V8L0 0Z" fill={strongAccent} />
          <path d="M0 0L14 -8V8L0 0Z" fill={strongAccent} />
          <circle cx="0" cy="0" r="4.5" fill={accentColor} stroke={strongAccent} strokeWidth="1.5" />
        </g>
      )}

      {/* Hocico */}
      <ellipse cx="70" cy="72" rx="15" ry="11.5" fill="#FFFDF9" />
      <ellipse cx="70" cy="67" rx="5.5" ry="4" fill="#5C4332" />
      <path
        d="M70 71V76M70 76C66.5 79 62.5 78 61.5 76M70 76C73.5 79 77.5 78 78.5 76"
        stroke="#5C4332"
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      {/* Ojos */}
      <circle cx="55" cy="57" r="4.2" fill="#5C4332" />
      <circle cx="53.6" cy="55.4" r="1.4" fill="#FFFFFF" />
      <circle cx="85" cy="57" r="4.2" fill="#5C4332" />
      <circle cx="83.6" cy="55.4" r="1.4" fill="#FFFFFF" />

      {/* Pestañas si es niña */}
      {!isBoy && (
        <>
          <path d="M51 54L48 51M54 53L53 50" stroke="#5C4332" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M89 54L92 51M86 53L87 50" stroke="#5C4332" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}

      {/* Mejillas */}
      <ellipse cx="46" cy="66" rx="6" ry="3.5" fill="#FFAFCC" opacity="0.7" />
      <ellipse cx="94" cy="66" rx="6" ry="3.5" fill="#FFAFCC" opacity="0.7" />

      {/* Corbatín si es niño */}
      {isBoy && (
        <g transform="translate(70, 96)">
          <path d="M0 0L-15 -8V8L0 0Z" fill={strongAccent} />
          <path d="M0 0L15 -8V8L0 0Z" fill={strongAccent} />
          <circle cx="0" cy="0" r="4.5" fill={accentColor} stroke={strongAccent} strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
};
