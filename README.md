# Колесо фортуны — бьюти-скидки

React 18 + TypeScript + Vite. Готово к деплою на [Render](https://render.com).

## Возможности

- Колесо фортуны со скидками, бонусами и подарками
- Сегменты задаются массивом объектов в `src/config/wheelSegments.ts`
- Приз сохраняется в localStorage на **30 дней**
- При повторном заходе показывается сохранённый приз (без повторного спина)
- Работает как Telegram Mini App и через MAX (WebView)

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## Настройка призов

Отредактируйте `src/config/wheelSegments.ts`:

```typescript
{
  id: 'discount-10',       // уникальный id
  label: '10%',            // текст на колесе
  type: 'discount',        // discount | bonus | gift
  value: 10,               // число (%) или строка («бесплатная маска»)
  description: '...',      // описание для клиента
  color: '#e8a4c4',        // цвет сектора
  weight: 2,               // вероятность (больше = чаще)
}
```

Также измените `SALON_NAME` — название вашего салона в шапке.

## Telegram Mini App

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. `/newapp` → укажите URL вашего деплоя на Render
3. Отправляйте клиентам ссылку на Mini App

При открытии из Telegram приз привязывается к `user.id` — один спин на пользователя.

## MAX (WebView)

Добавьте параметры в URL при открытии из MAX:

```
https://your-app.onrender.com/?platform=max&user_id=123&user_name=Анна
```

- `platform=max` или `from=max` — определяет MAX
- `user_id` — id пользователя (для сохранения приза)
- `user_name` — имя для приветствия (опционально)

## Деплой на Render

1. Загрузите репозиторий на GitHub
2. Render → **New Static Site**
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`

Или используйте `render.yaml` (Blueprint):

```bash
# Render автоматически подхватит render.yaml
```

## Структура

```
src/
├── config/wheelSegments.ts   ← призы и название салона
├── components/
│   ├── FortuneWheel.tsx
│   ├── SavedPrizeCard.tsx
│   └── ResultCard.tsx
├── utils/
│   ├── storage.ts            ← localStorage, 30 дней
│   └── messenger.ts          ← Telegram / MAX
└── App.tsx
```

## Лицензия

MIT
