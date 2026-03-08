# 🎤 xAI Voice Agent - Realtime Conversations

Полноценный голосовой AI-ассистент для **живого двустороннего общения** через xAI Realtime API. Работает через WebSocket, поддерживает распознавание речи, синтез голоса и естественный диалог.

---

## 🎯 Что это даёт

В отличие от простого Text-to-Speech (озвучка текста), Voice Agent — это:

✅ **Двусторонний диалог** — говорите в микрофон, получаете ответы голосом  
✅ **Realtime** — обработка и ответы в реальном времени через WebSocket  
✅ **Voice Activity Detection (VAD)** — AI сам понимает, когда вы закончили говорить  
✅ **Интерактивный UI** — видите транскрипцию и историю разговора  
✅ **Безопасность** — ephemeral tokens вместо прямого API ключа в браузере  

---

## 🚀 Что добавлено

### 1. **Компонент VoiceAgent** ([src/components/VoiceAgent.tsx](src/components/VoiceAgent.tsx))
- WebSocket подключение к `wss://api.x.ai/v1/realtime`
- Захват аудио с микрофона (getUserMedia API)
- Конвертация аудио в PCM16 и отправка в base64
- Получение ответов AI и воспроизведение аудио
- Server-side VAD для автоматического определения конца речи
- Визуализация состояний: подключение, слушаю, думаю, говорю
- История сообщений с транскрипцией

### 2. **API Endpoint** (обновлён [api-server.js](api-server.js))
- `POST /api/voice-agent-token` — создаёт ephemeral token для безопасного подключения
- Токен действителен ограниченное время и не даёт доступа к основному API ключу

### 3. **Переводы** (обновлён [src/i18n.ts](src/i18n.ts))
- Добавлена полная секция `voiceAgent` с переводами для UI

---

## 📋 Как это работает

### Архитектура

```
User Microphone
    ↓
Browser (VoiceAgent)
    ↓ getUserMedia()
Raw Audio → PCM16 → Base64
    ↓
WebSocket wss://api.x.ai/v1/realtime
    ↓
xAI Grok Realtime API
    ├─ Speech-to-Text (транскрипция)
    ├─ AI Processing (ответ)
    └─ Text-to-Speech (синтез голоса)
    ↓
Audio Base64 Chunks
    ↓
Browser playback (Web Audio API)
    ↓
User hears response
```

### Безопасность: Ephemeral Tokens

Вместо того чтобы передавать основной API ключ в браузер, используется временный токен:

1. Frontend отправляет запрос на ваш backend: `POST /api/voice-agent-token`
2. Backend запрашивает у xAI временный `client_secret`
3. Frontend использует этот токен для WebSocket подключения
4. Токен истекает после сессии или по времени

Это защищает ваш основной API ключ от утечки.

---

## 🎨 Как использовать

### В вашем CV-сайте уже интегрировано!

После запуска проекта вы увидите **фиолетовую кнопку с иконкой чата** справа внизу:

1. **Нажмите на кнопку** → откроется модальное окно Voice Agent
2. **Нажмите "Start Conversation"** → AI подключится и будет готов слушать
3. **Говорите в микрофон** → AI автоматически поймёт, когда вы закончили
4. **Получите ответ голосом** → AI ответит и вы увидите транскрипцию

### Настройка инструкций AI

В [App.tsx](src/App.tsx):

```tsx
<VoiceAgent 
  voiceId="Ara"
  instructions="Ты голосовой помощник для CV разработчика..."
/>
```

По умолчанию AI знает о:
- React, TypeScript, WebSockets, NestJS
- Проектах: Ravenhill, NOIR, AI Dev Workflows
- Опыте и навыках

Вы можете изменить `instructions` прямо в компоненте `VoiceAgent.tsx`, функция `getInstructions()`.

### Выбор голоса

Доступны те же 5 голосов, что и в TTS:

```tsx
<VoiceAgent voiceId="Ara" />  // Ara | Eve | Rex | Sal | Leo
```

---

## 🔧 Технические детали

### Аудио форматы

- **Input**: PCM16, 24kHz, mono (оптимально для речи)
- **Output**: PCM16, 24kHz (конвертируется в Float32 для Web Audio API)

### Voice Activity Detection (VAD)

В `session.update` настроен server-side VAD:

```json
{
  "turn_detection": {
    "type": "server_vad",
    "threshold": 0.5,
    "prefix_padding_ms": 300,
    "silence_duration_ms": 500
  }
}
```

Это означает:
- AI сам определяет, когда вы говорите
- Ловит небольшую паузу (500ms) как конец речи
- Добавляет 300ms в начало для подстраховки

Вы можете **отключить VAD** и управлять вручную, отправляя `input_audio_buffer.commit`.

### События WebSocket

**От клиента к серверу:**
- `session.update` — настройка сессии
- `input_audio_buffer.append` — отправка аудио кусков
- `input_audio_buffer.commit` — закончили говорить (если VAD выключен)
- `response.create` — запросить ответ

**От сервера к клиенту:**
- `session.created` — сессия создана
- `input_audio_buffer.speech_started` — пользователь начал говорить
- `input_audio_buffer.speech_stopped` — пользователь закончил
- `conversation.item.created` — новое сообщение добавлено
- `response.audio.delta` — кусок аудио ответа
- `response.audio_transcript.delta` — кусок текстовой транскрипции
- `response.done` — ответ завершён

---

## ⚙️ Продвинутая настройка

### Изменить качество аудио

В `VoiceAgent.tsx`, функция `startAudioCapture()`:

```tsx
const stream = await navigator.mediaDevices.getUserMedia({
  audio: {
    channelCount: 1,
    sampleRate: 24000,  // Можно 16000 для экономии
    echoCancellation: true,
    noiseSuppression: true
  }
});
```

- `16000 Hz` — меньше трафика, хуже качество
- `24000 Hz` — баланс (текущая настройка)
- `48000 Hz` — максимум качества, больше трафика

### Добавить кастомные функции (Tools)

xAI Realtime API поддерживает **function calling**. Вы можете дать AI инструменты:

```json
{
  "tools": [
    {
      "type": "function",
      "name": "get_github_stats",
      "description": "Получить статистику GitHub пользователя",
      "parameters": {
        "type": "object",
        "properties": {
          "username": { "type": "string" }
        }
      }
    }
  ]
}
```

Когда AI захочет вызвать функцию, вы получите событие `response.function_call_arguments.done`, выполните функцию на backend и отправьте результат через `conversation.item.create`.

### Отключить VAD (ручное управление)

В `session.update` уберите `turn_detection` или поставьте `type: "none"`:

```tsx
ws.send(JSON.stringify({
  type: 'session.update',
  session: {
    instructions: getInstructions(),
    voice: voiceId,
    turn_detection: null,  // VAD выключен
    modalities: ['text', 'audio']
  }
}));
```

Теперь вам нужно вручную отправлять `input_audio_buffer.commit`, когда пользователь закончил говорить (например, по кнопке).

---

## 💰 Стоимость

По документации xAI:

- **$0.05 за минуту** подключения к Realtime API
- **Максимум 30 минут** на одну сессию
- **До 100 одновременных сессий** на команду

Пример:
- 1 разговор по 5 минут = **$0.25**
- 100 разговоров по 5 минут = **$25**

### Если используете инструменты (Tools):
- Web Search, X Search, Collections — дополнительная оплата
- Детали в [xAI Pricing](https://console.x.ai/pricing)

---

## 🚧 Troubleshooting

### ❌ "Failed to get session token"

**Проблема**: Backend не может получить ephemeral token от xAI.

**Решение**:
1. Проверьте, что `XAI_API_KEY` задан в `.env`
2. Перезапустите backend: `npm run api`
3. Проверьте квоту на [console.x.ai](https://console.x.ai/)

```bash
# Проверить, работает ли endpoint
curl -X POST http://localhost:3001/api/voice-agent-token \
  -H "Content-Type: application/json" \
  -d '{"voice": "Ara"}'
```

### ❌ "Microphone access denied"

**Проблема**: Браузер не дал доступ к микрофону.

**Решение**:
1. Разрешите доступ к микрофону в настройках браузера
2. В Chrome: `chrome://settings/content/microphone`
3. Для HTTPS нужен SSL сертификат (в production)

### ❌ WebSocket disconnects immediately

**Проблема**: Подключение обрывается сразу после открытия.

**Возможные причины**:
- Неверный токен
- API key истёк
- Сессия не в регионе `us-east-1` (если требуется)

**Решение**:
1. Проверьте консоль браузера на ошибки WebSocket
2. Убедитесь, что токен валиден
3. Проверьте, что в `api-server.js` правильно формируется запрос

### ❌ Audio не воспроизводится

**Проблема**: Ответы AI видны в тексте, но не слышны.

**Решение**:
1. Проверьте громкость браузера
2. Убедитесь, что в `session.update` установлен `output_audio_format: 'pcm16'`
3. Проверьте консоль на ошибки Web Audio API

---

## 📚 Дополнительные возможности

### 1. Добавить визуализацию аудио

Можно добавить волновой график или frequency bars:

```tsx
const analyser = audioContext.createAnalyser();
source.connect(analyser);
// ... draw canvas with getByteFrequencyData()
```

### 2. Сохранить историю разговора

Можно отправлять транскрипцию на backend:

```tsx
onSessionEnd={() => {
  fetch('/api/save-conversation', {
    method: 'POST',
    body: JSON.stringify({ messages })
  });
}}
```

### 3. Добавить emotion detection

xAI может анализировать эмоции в речи через дополнительные параметры.

### 4. Multi-user режим

Можно создать комнаты, где несколько пользователей говорят с одним AI агентом.

---

## 🎓 Примеры использования для CV-сайта

### Вариант 1: AI-интервьюер

Настройте AI как рекрутера, который задаёт вопросы:

```tsx
instructions: "Ты — HR-специалист. Задавай короткие вопросы о навыках кандидата."
```

### Вариант 2: Демо проектов

AI рассказывает о конкретных проектах:

```tsx
instructions: "Расскажи подробно про Ravenhill — multiplayer игру с WebSockets."
```

### Вариант 3: Tech Q&A

AI отвечает на технические вопросы про стек:

```tsx
instructions: "Ты — technical advisor. Отвечай на вопросы про React, TypeScript, NestJS."
```

---

## 🚀 Production Deployment

### Vercel Serverless Function

Создайте `api/voice-agent-token.js`:

```js
export default async function handler(req, res) {
  const { voice = 'Ara' } = req.body;
  
  const response = await fetch('https://api.x.ai/v1/realtime/client_secrets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-2-1212-realtime',
      voice
    })
  });

  const data = await response.json();
  res.json(data);
}
```

Добавьте `XAI_API_KEY` в Environment Variables в Vercel Dashboard.

### Railway/Render

1. Deploy backend как сервис
2. Добавьте Environment Variable: `XAI_API_KEY`
3. Обновите frontend URL для API вызовов

---

## 📖 Полезные ссылки

- [xAI Realtime API Docs](https://docs.x.ai/api/realtime)
- [xAI Console](https://console.x.ai/)
- [WebSocket MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Web Audio API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 🎉 Готово!

Теперь ваш CV-сайт имеет:

✅ **Автоматическую озвучку** при входе (Voice Intro)  
✅ **Живого голосового AI-ассистента** для разговоров (Voice Agent)  
✅ **Realtime WebSocket** связь с xAI  
✅ **Безопасные ephemeral tokens**  
✅ **Красивый интерактивный UI**  

**Запускайте и тестируйте:**

```bash
npm run dev:full
```

Откройте http://localhost:5173 и нажмите на фиолетовую кнопку чата!

---

Есть вопросы? Пишите! 🚀
