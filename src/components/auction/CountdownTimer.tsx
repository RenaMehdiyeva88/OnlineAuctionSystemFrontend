import { useCountdown } from "@/hooks/useCountdown";
import { useI18n } from "@/context/I18nContext";
import { pad2 } from "@/utils/formatters";
import "./CountdownTimer.css";

interface CountdownTimerProps {
  endTime: string;
  size?: "sm" | "lg";
  onEnded?: () => void;
}

// F4: the scoreboard-style countdown — the design's signature element.
// Reused on cards (sm) and the auction detail hero (lg).
export default function CountdownTimer({ endTime, size = "sm", onEnded }: CountdownTimerProps) {
  const { t } = useI18n();
  const { days, hours, minutes, seconds, isEnded } = useCountdown(endTime);

  if (isEnded) {
    onEnded?.();
    return (
      <div className={`countdown countdown--${size} countdown--ended`}>
        <span className="countdown__ended-label">{t.ui.biddingClosed}</span>
      </div>
    );
  }

  const isUrgent = days === 0 && hours === 0;

  return (
    <div className={`countdown countdown--${size} ${isUrgent ? "countdown--urgent" : ""}`}>
      {days > 0 && (
        <div className="countdown__unit">
          <span className="countdown__value mono">{pad2(days)}</span>
          <span className="countdown__label">{t.ui.unitDays}</span>
        </div>
      )}
      <div className="countdown__unit">
        <span className="countdown__value mono">{pad2(hours)}</span>
        <span className="countdown__label">{t.ui.unitHours}</span>
      </div>
      <div className="countdown__unit">
        <span className="countdown__value mono">{pad2(minutes)}</span>
        <span className="countdown__label">{t.ui.unitMinutes}</span>
      </div>
      <div className="countdown__unit">
        <span className="countdown__value mono">{pad2(seconds)}</span>
        <span className="countdown__label">{t.ui.unitSeconds}</span>
      </div>
    </div>
  );
}