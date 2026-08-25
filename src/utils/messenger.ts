import type { WheelSegment } from '../types';
import { MASTER_TELEGRAM } from '../config/wheelSegments';

export interface MessengerContext {
  userId: string;
  userName: string | null;
  isTelegram: boolean;
  isMax: boolean;
  isEmbedded: boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  initDataUnsafe: {
    user?: {
      id: number;
      first_name?: string;
      last_name?: string;
      username?: string;
    };
  };
  ready: () => void;
  expand: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  openTelegramLink: (url: string) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  themeParams: Record<string, string | undefined>;
  colorScheme: 'light' | 'dark';
  platform: string;
}

function detectMax(): boolean {
  const params = new URLSearchParams(window.location.search);
  if (params.get('platform') === 'max') return true;
  if (params.get('from') === 'max') return true;
  return /max/i.test(navigator.userAgent);
}

function guestId(): string {
  const key = 'fortune_guest_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = `guest_${crypto.randomUUID()}`;
    localStorage.setItem(key, id);
  }
  return id;
}

function isTelegramWebView(): boolean {
  if (window.Telegram?.WebApp) return true;
  if (/Telegram/i.test(navigator.userAgent)) return true;
  return window.location.hash.includes('tgWebAppData');
}

/** Загружает SDK только внутри Telegram — локально не блокирует старт */
export function ensureTelegramSdk(): Promise<void> {
  if (window.Telegram?.WebApp) return Promise.resolve();
  if (!isTelegramWebView()) return Promise.resolve();

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export function initMessenger(): MessengerContext {
  const isMax = detectMax();
  const tg = window.Telegram?.WebApp;
  const isTelegram = Boolean(tg?.initDataUnsafe?.user?.id);

  if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#f8e8ef');
    tg.setBackgroundColor('#fdf6f9');
  }

  if (isTelegram && tg?.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    const name = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || null;
    return {
      userId: String(user.id),
      userName: name,
      isTelegram: true,
      isMax: false,
      isEmbedded: true,
    };
  }

  if (isMax) {
    const params = new URLSearchParams(window.location.search);
    const maxUserId = params.get('user_id') ?? params.get('uid');
    return {
      userId: maxUserId ? `max_${maxUserId}` : guestId(),
      userName: params.get('user_name'),
      isTelegram: false,
      isMax: true,
      isEmbedded: true,
    };
  }

  return {
    userId: guestId(),
    userName: null,
    isTelegram: false,
    isMax: false,
    isEmbedded: false,
  };
}

export function pickWeightedSegment(segments: WheelSegment[]): WheelSegment {
  const totalWeight = segments.reduce((sum, s) => sum + (s.weight ?? 1), 0);
  let random = Math.random() * totalWeight;

  for (const segment of segments) {
    random -= segment.weight ?? 1;
    if (random <= 0) return segment;
  }

  return segments[segments.length - 1];
}

export function formatPrizeValue(segment: WheelSegment): string {
  if (segment.type === 'discount' && typeof segment.value === 'number') {
    return `−${segment.value}%`;
  }
  return String(segment.value);
}

export function prizeTypeLabel(type: WheelSegment['type']): string {
  switch (type) {
    case 'discount':
      return 'Скидка';
    case 'bonus':
      return 'Бонус';
    case 'gift':
      return 'Подарок';
  }
}

export function openExternalLink(url: string): void {
  const tg = window.Telegram?.WebApp;

  if (tg?.openLink) {
    tg.openLink(url, { try_instant_view: false });
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

export const MASTER_TELEGRAM_URL = `https://t.me/${MASTER_TELEGRAM}`;

export function openMasterTelegram(): void {
  const tg = window.Telegram?.WebApp;

  if (tg?.openTelegramLink) {
    tg.openTelegramLink(MASTER_TELEGRAM_URL);
    return;
  }

  window.open(MASTER_TELEGRAM_URL, '_blank', 'noopener,noreferrer');
}

