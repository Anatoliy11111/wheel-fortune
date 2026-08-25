import { MASTER_MAX_URL } from '../config/wheelSegments';
import {
  MASTER_TELEGRAM_URL,
  openExternalLink,
  openMasterTelegram,
} from '../utils/messenger';

export function MessengerLinks() {
  return (
    <div className="prize-card__messengers">
      <a
        className="prize-card__messenger prize-card__messenger--tg"
        href={MASTER_TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Открыть чат в Telegram"
        onClick={(event) => {
          event.preventDefault();
          openMasterTelegram();
        }}
      >
        <TelegramIcon />
      </a>

      <a
        className="prize-card__messenger prize-card__messenger--max"
        href={MASTER_MAX_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Открыть чат в MAX"
        onClick={(event) => {
          event.preventDefault();
          openExternalLink(MASTER_MAX_URL);
        }}
      >
        <img
          className="prize-card__messenger-img"
          src="/max-icon.png"
          width={48}
          height={48}
          alt=""
        />
      </a>
    </div>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        fill="#fff"
        d="M21.5 3.4 2.9 10.6c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.9.7.9.4 0 .6-.2.8-.4l2.7-2.6 5.6 4.1c1 .6 1.8.3 2-.9L23 4.6c.3-1.3-.5-1.9-1.5-1.2Zm-3 4.2-8.9 8.1-.4 3.9-1.6-5.6 10.9-6.4Z"
      />
    </svg>
  );
}
