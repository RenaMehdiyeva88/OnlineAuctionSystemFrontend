import { useEffect, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isEnded: boolean;
}

function computeParts(endTime: string): CountdownParts {
  const totalMs = new Date(endTime).getTime() - Date.now();

  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, isEnded: true };
  }

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);

  return { days, hours, minutes, seconds, totalMs, isEnded: false };
}

// F4: drives every countdown timer (auction cards + detail page). Ticks
// every second and reports isEnded so callers can disable bidding
// immediately, without waiting on a network round-trip.
export function useCountdown(endTime: string): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => computeParts(endTime));

  useEffect(() => {
    setParts(computeParts(endTime));
    const interval = setInterval(() => setParts(computeParts(endTime)), 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return parts;
}