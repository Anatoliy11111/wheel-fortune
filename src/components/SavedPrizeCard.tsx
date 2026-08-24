import type { SavedPrize } from '../types';
import { daysRemaining, formatExpiryDate, formatWonDate } from '../utils/storage';
import { formatPrizeValue, prizeTypeLabel } from '../utils/messenger';

interface SavedPrizeCardProps {
  prize: SavedPrize;
}

export function SavedPrizeCard({ prize }: SavedPrizeCardProps) {
  const { segment } = prize;
  const remaining = daysRemaining(prize.expiresAt);

  return (
    <div className="prize-card prize-card--saved">
      <div className="prize-card__badge">{prizeTypeLabel(segment.type)}</div>
      <div className="prize-card__value">{formatPrizeValue(segment)}</div>
      <p className="prize-card__description">
        {segment.description ?? segment.label}
      </p>
      <div className="prize-card__meta">
        <span>Получено {formatWonDate(prize.wonAt)}</span>
        <span className="prize-card__expiry">
          Действует до {formatExpiryDate(prize.expiresAt)}
          {remaining > 0 && ` (${remaining} дн.)`}
        </span>
      </div>
      <p className="prize-card__hint">
        Покажите этот экран мастеру при записи
        <br/>
        <br/>
        <p style={{fontWeight: 'bold'}}>*бонус действует единоразово при записи на любую услугу</p>
      </p>
    </div>
  );
}
