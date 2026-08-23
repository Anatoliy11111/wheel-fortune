import type { WheelSegment } from '../types';

/**
 * Сегменты колеса — заполните под свои услуги.
 * Добавляйте, удаляйте и меняйте объекты в массиве.
 */
export const WHEEL_SEGMENTS: WheelSegment[] = [
  {
    id: 'discount-5',
    label: '5%',
    type: 'discount',
    value: 5,
    description: 'Скидка 5% на любую услугу',
    color: '#f4c2d7',
    weight: 3,
  },
  {
    id: 'discount-10',
    label: '10%',
    type: 'discount',
    value: 10,
    description: 'Скидка 10% на любую услугу',
    color: '#e8a4c4',
    weight: 2,
  },
  {
    id: 'discount-15',
    label: '15%',
    type: 'discount',
    value: 15,
    description: 'Скидка 15% на любую услугу',
    color: '#d484a8',
    weight: 1,
  },
  {
    id: 'bonus-manicure',
    label: 'Маникюр',
    type: 'bonus',
    value: 'Бесплатное покрытие',
    description: 'Бесплатное покрытие гель-лаком при записи на маникюр',
    color: '#c9a0dc',
    weight: 1,
  },
  {
    id: 'bonus-brows',
    label: 'Брови',
    type: 'bonus',
    value: 'Коррекция в подарок',
    description: 'Коррекция бровей в подарок при любой услуге',
    color: '#b8d4e8',
    weight: 1,
  },
  {
    id: 'gift-mask',
    label: 'Подарок',
    type: 'gift',
    value: 'Маска для лица',
    description: 'Уходовая маска для лица в подарок',
    color: '#a8e6cf',
    weight: 1,
  },
  {
    id: 'discount-20',
    label: '20%',
    type: 'discount',
    value: 20,
    description: 'Скидка 20% — суперприз!',
    color: '#ffd700',
    weight: 0.5,
  },
  {
    id: 'bonus-consult',
    label: 'Консультация',
    type: 'bonus',
    value: 'Бесплатно',
    description: 'Бесплатная консультация мастера',
    color: '#ffe4b5',
    weight: 2,
  },
];

/** Название салона / мастера — отображается в шапке */
export const SALON_NAME = 'Beauty Studio';

/** Срок действия приза в днях */
export const PRIZE_VALIDITY_DAYS = 30;
