import { MessengerLinks } from './MessengerLinks';
import { BOOKING_URL, SALON_NAME } from '../config/wheelSegments';
import type { SavedPrize } from '../types';
import { formatPrizeValue, openExternalLink, prizeTypeLabel } from '../utils/messenger';
import { formatWonDate } from '../utils/storage';

interface SavedPrizeCardProps {
  prize: SavedPrize;
}

export function SavedPrizeCard({ prize }: SavedPrizeCardProps) {
  const { segment } = prize;

  return (
    <div className="prize-card prize-card--saved">
      <div className="prize-capture">
        <p className="prize-capture__salon">{SALON_NAME}</p>
        <div className="prize-card__badge">{prizeTypeLabel(segment.type)}</div>
        <div className="prize-card__value">{formatPrizeValue(segment)}</div>
        <p className="prize-card__description">
          {segment.description ?? segment.label}
        </p>
        <div className="prize-card__meta">
          <span>Получено {formatWonDate(prize.wonAt)}</span>
        </div>
        <p className="prize-card__note">
          Бонус действует единоразово при записи на любую услугу
        </p>
        <p className="prize-card__hint prize-card__hint--after-note">
          Сделайте скриншот этого экрана и отправьте мастеру в мессенджер
        </p>
      </div>

      <a
        className="prize-card__button prize-card__button--booking"
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          event.preventDefault();
          openExternalLink(BOOKING_URL);
        }}
      >
        Онлайн-запись
      </a>

      <MessengerLinks />
    </div>
  );
}
