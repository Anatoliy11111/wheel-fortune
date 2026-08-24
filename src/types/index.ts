export type PrizeType = 'discount' | 'bonus' | 'gift';

export interface WheelSegment {
  /** Уникальный идентификатор сектора */
  id: string;
  /** Текст на колесе (короткий) */
  label: string;
  /** Тип приза: скидка, бонус или подарок */
  type: PrizeType;
  /** Значение: число для % скидки или текст («бесплатная маска») */
  value: number | string;
  /** Подробное описание приза для экрана результата */
  description?: string;
  /** Цвет сектора на колесе */
  color: string;
  /** Вес вероятности (по умолчанию 1). На размер сектора не влияет */
  weight?: number;
}

export interface SavedPrize {
  segment: WheelSegment;
  wonAt: number;
  expiresAt: number;
}

export type AppPhase = 'loading' | 'saved' | 'spin' | 'result';
