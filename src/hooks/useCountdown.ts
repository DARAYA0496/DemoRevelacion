import { useEffect, useState } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const calculateTimeLeft = (targetDateISO: string): CountdownTime => {
  const difference = new Date(targetDateISO).getTime() - new Date().getTime();

  if (Number.isNaN(difference) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
};

/**
 * Hook reciclable para calcular cuenta regresiva en tiempo real hacia cualquier fecha ISO.
 */
export const useCountdown = (targetDateISO: string): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateTimeLeft(targetDateISO)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDateISO));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateISO]);

  return timeLeft;
};
