import { PRIZE_VALIDITY_DAYS } from '../config/wheelSegments';
import type { WheelSegment } from '../types';
import { formatPrizeValue, prizeTypeLabel } from '../utils/messenger';

interface ResultCardProps {
  segment: WheelSegment;
  onClose: () => void;
}

export function ResultCard({ segment, onClose }: ResultCardProps) {
  return (
    <div className="result-overlay">
      <div className="prize-card prize-card--result">
        <div className="prize-card__confetti" aria-hidden="true">✨</div>
        <h2 className="prize-card__title">Поздравляем!</h2>
        <div className="prize-card__badge">{prizeTypeLabel(segment.type)}</div>
        <div className="prize-card__value">{formatPrizeValue(segment)}</div>
        <p className="prize-card__description">
          {segment.description ?? segment.label}
        </p>
        <p className="prize-card__hint">
          Приз сохранён на {PRIZE_VALIDITY_DAYS} дней. При следующем заходе он будет здесь.
        </p>
        <button className="prize-card__button" onClick={onClose} type="button">
          Отлично!
        </button>
      </div>
    </div>
  );
}
