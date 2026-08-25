import type { WheelSegment } from '../types';

/**
 * Сегменты колеса — заполните под свои услуги.
 * Добавляйте, удаляйте и меняйте объекты в массиве.
 * Все сектора одинакового размера; weight влияет только на шанс выпадения.
 */
export const WHEEL_SEGMENTS: WheelSegment[] = [
  {
    id: 'discount-5',
    label: '−5%',
    type: 'discount',
    value: 5,
    description: 'Скидка 5% на любую услугу. Приятный бонус к любимой процедуре.',
    color: '#f4c2d7',
    weight: 2.5,
  },
  {
    id: 'discount-10',
    label: '−10%',
    type: 'discount',
    value: 10,
    description: 'Скидка 10% на любую услугу. Отличный повод попробовать что-то новое.',
    color: '#e8a4c4',
    weight: 2.5,
  },
  {
    id: 'discount-15',
    label: '−15%',
    type: 'discount',
    value: 15,
    description: 'Скидка 15% на любую услугу. Побалуйте себя любимой процедурой выгоднее.',
    color: '#d484a8',
    weight: 1,
  },
  {
    id: 'bonus-brows',
    label: 'Коррекция',
    type: 'bonus',
    value: 'Коррекция бровей',
    description: 'Идеальная форма бровей — наш комплимент. Приходите на коррекцию в подарок.',
    color: '#c9a0dc',
    weight: 3,
  },
  {
    id: 'bonus-organic-brow',
    label: 'Organic Brow',
    type: 'bonus',
    value: 'Уход Organic Brow',
    description: 'Комплексный уход Organic Brow в подарок. Питание, восстановление бровей.',
    color: '#ffe4b5',
    weight: 1,
  },
];

/** Название салона / мастера — отображается в шапке */
export const SALON_NAME = 'Ариша.лами';

/** Telegram мастера без @ */
export const MASTER_TELEGRAM = 'arissha14';

/** Онлайн-запись DIKIDI */
export const BOOKING_URL = 'https://dikidi.net/1873765';

/**
 * Ссылка на профиль мастера в MAX (https://max.ru/u/...).
 * Скопируйте из приложения: профиль → QR → Поделиться.
 */
export const MASTER_MAX_URL =
  'https://max.ru/u/f9LHodD0cOL63eE4tTMPec1QJxiIqhew8Moe5k3sTyD_S1wuQdYatpqjiHY';

/** Срок действия приза в днях */
export const PRIZE_VALIDITY_DAYS = 30;
