import type { SavedPrize, WheelSegment } from '../types';
import { PRIZE_VALIDITY_DAYS } from '../config/wheelSegments';

const STORAGE_PREFIX = 'fortune_prize_';
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function storageKey(userId: string): string {
  return `${STORAGE_PREFIX}${userId}`;
}

export function getSavedPrize(userId: string): SavedPrize | null {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return null;

    const prize = JSON.parse(raw) as SavedPrize;
    if (Date.now() > prize.expiresAt) {
      localStorage.removeItem(storageKey(userId));
      return null;
    }

    return prize;
  } catch {
    return null;
  }
}

export function savePrize(userId: string, segment: WheelSegment): SavedPrize {
  const now = Date.now();
  const prize: SavedPrize = {
    segment,
    wonAt: now,
    expiresAt: now + PRIZE_VALIDITY_DAYS * MS_PER_DAY,
  };

  localStorage.setItem(storageKey(userId), JSON.stringify(prize));
  return prize;
}

export function formatExpiryDate(timestamp: number): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(timestamp));
}

export function formatWonDate(timestamp: number): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(timestamp));
}

export function daysRemaining(expiresAt: number): number {
  return Math.max(0, Math.ceil((expiresAt - Date.now()) / MS_PER_DAY));
}
