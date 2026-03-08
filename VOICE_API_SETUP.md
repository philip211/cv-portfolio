# 🎙️ xAI Voice Integration Setup

Этот проект использует **xAI Voice API** для голосовых возможностей CV-сайта.

## 🎯 Два режима работы

### 1. **Voice Intro** (Text-to-Speech)
Автоматическая озвучка CV при загрузке страницы. Простой способ сделать "говорящее резюме".

### 2. **Voice Agent** (Realtime Conversations) 🔥
Полноценный голосовой AI-ассистент для живого двустороннего общения. Посетитель может говорить в микрофон и получать голосовые ответы в реальном времени.

> 📖 **Полная документация по Voice Agent**: [VOICE_AGENT_GUIDE.md](VOICE_AGENT_GUIDE.md)

---

## 📋 Что было добавлено

### Voice Intro (TTS)

#### 1. **Компонент VoiceIntro** (`src/components/VoiceIntro.tsx`)
- ✨ Автоматический запуск озвучки при загрузке (с задержкой)
- 🚫 Умная обработка блокировки autoplay браузером
- 🎨 Красивый UI с overlay-промптом, если автозапуск заблокирован
- 🎚️ Floating кнопка управления с прогресс-баром
- 🌐 Поддержка i18n (русский/английский)
- 🎭 5 голосов на выбор: `eve`, `ara`, `rex`, `sal`, `leo`

#### 2. **Компонент VoiceAgent** (`src/components/VoiceAgent.tsx`)
- 🎤 Живое общение с AI через микрофон
- 🔄 TTS endpoint: `/api/voice-intro` для озвучки текста
- 🎙️ Voice Agent endpoint: `/api/voice-agent-token` для ephemeral tokens
- ⚡ Express сервер с CORS поддержкой
- 📦 Кеширование аудио (1 час)

#### 4
#### 3. **API Server** (`api-server.js`)
- 🔒 Безопасное хранение API ключа на backend
- 🎤 Proxy для запросов к xAI TTS API
- ⚡ Express сервер с CORS поддержкой
- 📦 Кеширование аудио (1 час)

#### 4. **Переводы** (обновлен `src/i18n.ts`)
- Добавлена секция `voice` для Voice Intro
- Добавлена секция `voiceAgent` для Voice Agent

---

## 🎬 Что вы увидите после запуска

1. **Справа внизу** — кнопка воспроизведения (Voice Intro, автозапуск озвучки)
2. **Справа внизу (выше)** — фиолетовая кнопка чата (Voice Agent для разговоров)
- Добавлена секция `voice` с полными переводами для UI

---

## 🚀 Быстрый старт

### Шаг 1: Установка зависимостей

```bash
npm install
```

Это установит:
- `express` - backend сервер
- `cors` - для CORS
- `dotenv` - для переменных окружения
- `concurrently` - для одновременного запуска frontend и backend

### Шаг 2: Получить API ключ xAI

1. Зарегистрируйтесь на [console.x.ai](https://console.x.ai/)
2. Создайте новый API key
3. Скопируйте ключ

### Шаг 3: Создать `.env` файл

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

Откройте `.env` и добавьте ваш API ключ:

```env
XAI_API_KEY=your_actual_api_key_here
PORT=3001
```

⚠️ **Важно**: Файл `.env` НЕ должен попадать в Git! Убедитесь, что он в `.gitignore`.

### Шаг 4: Запуск

**Вариант A: Полный стек (frontend + backend)**
```bash
npm run dev:full
```

Это запустит:
- Frontend на `http://localhost:5173` (Vite)
- Backend API на `http://localhost:3001` (Express)

**Вариант B: Только frontend**
```bash
npm run dev
```

**Вариант C: Только backend API**
```bash
npm run api
```

---

## 🎨 Как это работает

### Автоматическая озвучка при входе

1. Пользователь открывает сайт
2. После загрузки `BootSequence` (1.5 секунды задержки)
3. Компонент `VoiceIntro` пытается автоматически запустить озвучку
4. Если браузер блокирует autoplay:
   - Показывается полноэкранный промпт с кнопкой "Запустить голосовую презентацию"
   - После клика озвучка начинается

### Как работает API

```
Frontend → POST /api/voice-intro
         → Backend Express Server
         → POST https://api.x.ai/v1/tts
         → xAI генерирует аудио
         → Backend возвращает MP3
         → Frontend воспроизводит
```

---

## ⚙️ Настройка компонента VoiceIntro

В `App.tsx` вы можете изменить параметры:

```tsx
<VoiceIntro 
  autoplayDelay={1500}    // Задержка перед автозапуском (мс)
  voiceId="ara"           // Голос: eve | ara | rex | sal | leo
  position="bottom-right" // Позиция кнопки: top-right | bottom-right | center
  onPlay={() => console.log('Started')}
  onEnd={() => console.log('Finished')}
/>
```

### Доступные голоса xAI

| Voice | Характеристика |
|-------|----------------|
| `ara` | 🔥 Тёплый, дружелюбный (рекомендуется для CV) |
| `eve` | ⚡ Энергичный, яркий |
| `rex` | 💼 Деловой, профессиональный |
| `sal` | 🎯 Универсальный |
| `leo` | 💪 Уверенный, командный |

### Настройка текста озвучки

Текст берётся из компонента `VoiceIntro.tsx`, функция `getIntroText()`:

```tsx
const getIntroText = () => {
  if (customText) return customText;
  return i18n.language === 'ru' 
    ? "Привет! Я fullstack разработчик..."
    : "Hi! I'm a fullstack developer...";
};
```

Вы можете:
1. Изменить текст прямо в этой функции
2. Или передать кастомный текст через пропс `customText`

---

## 🎭 Эмоциональность и Speech Tags

xAI TTS поддерживает **speech tags** для более живой подачи:

```tsx
const text = "Привет! [pause] Я очень рад. <whisper>Это секрет</whisper> [laugh]";
```

Поддерживаемые теги:
- `[pause]` - пауза
- `[whisper]` - шёпот
- `[sigh]` - вздох
- `[laugh]` - смех
- `<whisper>...</whisper>` - обёрточный тег

---

## 🔧 Troubleshooting

### ❌ "Backend API not available"

**Проблема**: Frontend не может подключиться к backend API.

**Решение**:
```bash
# 1. Убедитесь, что backend запущен
npm run api

# 2. Проверьте, что он работает
curl http://localhost:3001/api/health

# 3. Или запустите оба сервера одновременно
npm run dev:full
```

### ❌ "XAI_API_KEY not set"

**Проблема**: API ключ не найден.

**Решение**:
1. Создайте файл `.env` в корне проекта
2. Добавьте: `XAI_API_KEY=your_key_here`
3. Перезапустите backend: `npm run api`

### ❌ Автозвук не работает

**Проблема**: Браузер блокирует autoplay.

**Это нормально!** Современные браузеры блокируют автозвук до первого взаимодействия пользователя.

**Решение**: Компонент автоматически покажет промпт с кнопкой.

### ❌ CORS ошибки

**Проблема**: `Access to fetch has been blocked by CORS policy`

**Решение**:
1. Убедитесь, что в `api-server.js` используется `cors()`
2. Проверьте, что Vite proxy настроен в `vite.config.ts`
3. Перезапустите оба сервера

---

## 💰 Стоимость xAI TTS

- **$4.20 за 1 млн символов**
- Примерный текст CV (~300 символов) ≈ **$0.00126** за одно воспроизведение
- 1000 прослушиваний ≈ **$1.26**

---

## 🚢 Deployment в Production

### Вариант 1: Vercel (Frontend) + Vercel Serverless Functions

1. Создайте `api/voice-intro.js` в корне:

```js
export default async function handler(req, res) {
  const { text, voice_id } = req.body;
  
  const response = await fetch('https://api.x.ai/v1/tts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, voice_id })
  });

  const audioBuffer = await response.arrayBuffer();
  res.setHeader('Content-Type', 'audio/mpeg');
  res.send(Buffer.from(audioBuffer));
}
```

2. В Vercel Dashboard добавьте Environment Variable:
   - Key: `XAI_API_KEY`
   - Value: ваш ключ

### Вариант 2: Deploy на Railway/Render

1. Push кода на GitHub
2. Подключите репозиторий к Railway/Render
3. Добавьте переменную окружения `XAI_API_KEY`
4. Deploy!

### Вариант 3: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "api"]
```

---

## 📚 Дополнительные ресурсы

- [xAI Console](https://console.x.ai/) - получить API ключ
- [xAI TTS Documentation](https://docs.x.ai/api/tts) - официальная документация
- [xAI Voice Agent API](https://docs.x.ai/api/realtime) - для realtime разговоров

---

## 🎉 Всё готово!

Теперь ваш CV-сайт умеет:
- ✅ Автоматически озвучивать себя при входе
- ✅ Показывать красивый промпт при блокировке autoplay
- ✅ Переключаться между 5 голосами
- ✅ Работать на русском и английском
- ✅ Безопасно хранить API ключи

**Запускайте и тестируйте:**

```bash
npm run dev:full
```

Open: http://localhost:5173

---

Если есть вопросы — пишите! 🚀
