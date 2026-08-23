import { useCallback, useEffect, useState } from 'react';
import { FortuneWheel } from './components/FortuneWheel';
import { ResultCard } from './components/ResultCard';
import { SavedPrizeCard } from './components/SavedPrizeCard';
import { SALON_NAME, WHEEL_SEGMENTS } from './config/wheelSegments';
import type { AppPhase, SavedPrize, WheelSegment } from './types';
import { initMessenger, type MessengerContext } from './utils/messenger';
import { getSavedPrize, savePrize } from './utils/storage';

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('loading');
  const [messenger, setMessenger] = useState<MessengerContext | null>(null);
  const [savedPrize, setSavedPrize] = useState<SavedPrize | null>(null);
  const [resultSegment, setResultSegment] = useState<WheelSegment | null>(null);

  useEffect(() => {
    const ctx = initMessenger();
    setMessenger(ctx);

    const existing = getSavedPrize(ctx.userId);
    if (existing) {
      setSavedPrize(existing);
      setPhase('saved');
    } else {
      setPhase('spin');
    }
  }, []);

  const handleSpinComplete = useCallback(
    (segment: WheelSegment) => {
      if (!messenger) return;

      const prize = savePrize(messenger.userId, segment);
      setSavedPrize(prize);
      setResultSegment(segment);
      setPhase('result');
    },
    [messenger],
  );

  const handleResultClose = useCallback(() => {
    setResultSegment(null);
    setPhase('saved');
  }, []);

  if (phase === 'loading') {
    return (
      <div className="app app--loading">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">{SALON_NAME}</h1>
        <p className="header__subtitle">Колесо фортуны</p>
        {messenger?.userName && (
          <p className="header__greeting">Привет, {messenger.userName}!</p>
        )}
      </header>

      <main className="main">
        {phase === 'saved' && savedPrize && (
          <section className="section">
            <h2 className="section__title">Ваш приз</h2>
            <SavedPrizeCard prize={savedPrize} />
          </section>
        )}

        {phase === 'spin' && (
          <section className="section">
            <p className="section__lead">
              Крутите колесо и получите скидку или бонус на бьюти-услуги!
            </p>
            <FortuneWheel
              segments={WHEEL_SEGMENTS}
              onSpinComplete={handleSpinComplete}
            />
          </section>
        )}

        {phase === 'result' && resultSegment && (
          <ResultCard segment={resultSegment} onClose={handleResultClose} />
        )}
      </main>

      <footer className="footer">
        {messenger?.isTelegram && <span>Открыто в Telegram</span>}
        {messenger?.isMax && <span>Открыто в MAX</span>}
        {!messenger?.isEmbedded && <span>Демо-режим</span>}
      </footer>
    </div>
  );
}
