# 🆓 Бесплатная голосовая озвучка CV

Ваш CV-сайт теперь использует **Web Speech API** — встроенную в браузер технологию для синтеза речи.

## ✨ Преимущества

✅ **100% БЕСПЛАТНО** — никаких API ключей и платных сервисов  
✅ **Без backend** — работает прямо в браузере  
✅ **Без установки** — ничего дополнительно устанавливать не нужно  
✅ **Мгновенно** — нет задержек на запросы к серверу  
✅ **Приватность** — данные не покидают браузер  

## 🎯 Что добавлено

### Компонент BrowserVoiceIntro
Заменяет платный VoiceIntro, но работает через Web Speech API браузера.

**Файл:** [src/components/BrowserVoiceIntro.tsx](src/components/BrowserVoiceIntro.tsx)

**Возможности:**
- Автоматический запуск озвучки при загрузке
- Умная обработка блокировки autoplay
- Красивый UI с промптом
- Поддержка русского и английского
- Автоматический выбор лучшего голоса для языка

---

## 🚀 Быстрый старт

### Шаг 1: Запустить проект

```bash
npm run dev
```

**Всё!** Больше ничего не нужно:
- ❌ Не нужен backend сервер
- ❌ Не нужны API ключи
- ❌ Не нужны платные сервисы

### Шаг 2: Открыть сайт

Откройте: http://localhost:5173

Вы увидите:
- Автоматическая озвучка начнётся через 1.5 секунды
- Если браузер заблокирует — появится красивый промпт с кнопкой
- Справа внизу — кнопка управления озвучкой

---

## 🎨 Как это работает

```
User opens page
    ↓
Browser loads Web Speech API
    ↓
Text → SpeechSynthesis → Audio
    ↓
Browser plays voice
```

**Всё происходит в браузере пользователя.** Никаких серверов, никаких запросов.

---

## ⚙️ Настройка

### Изменить текст озвучки

В [src/components/BrowserVoiceIntro.tsx](src/components/BrowserVoiceIntro.tsx#L21):

```tsx
const getIntroText = () => {
  if (customText) return customText;
  return i18n.language === 'ru' 
    ? "Ваш новый текст на русском"
    : "Your new text in English";
};
```

### Изменить параметры

В [src/App.tsx](src/App.tsx):

```tsx
<BrowserVoiceIntro 
  autoplayDelay={1500}    // Задержка перед автозапуском (мс)
  position="bottom-right" // Позиция кнопки
  onPlay={() => console.log('Started')}
  onEnd={() => console.log('Finished')}
/>
```

### Настройка скорости и тембра

В [src/components/BrowserVoiceIntro.tsx](src/components/BrowserVoiceIntro.tsx#L85):

```tsx
utterance.rate = 0.95;  // Скорость: 0.1 - 10 (по умолчанию 1)
utterance.pitch = 1.0;  // Тембр: 0 - 2 (по умолчанию 1)
utterance.volume = 1.0; // Громкость: 0 - 1
```

---

## 🎭 Доступные голоса

Голоса зависят от браузера и операционной системы:

### Chrome/Edge (Windows)
- `Microsoft David` (en-US)
- `Microsoft Zira` (en-US)
- `Google русский` (ru-RU)

### Chrome/Edge (macOS)
- `Samantha` (en-US)
- `Alex` (en-US)
- `Yuri` (ru-RU)

### Safari (macOS/iOS)
- `Samantha (Enhanced)` (en-US)
- `Milena` (ru-RU)

### Firefox
Использует OS-синтезатор речи

Компонент автоматически выбирает **лучший голос** для текущего языка, приоритизируя:
1. Google voices
2. Microsoft Natural voices
3. Любой доступный голос для языка

---

## 🔧 Troubleshooting

### ❌ Голос не воспроизводится

**Возможные причины:**

1. **Браузер блокирует autoplay**
   - Это нормально! Покажется промпт с кнопкой
   - После клика озвучка начнётся

2. **Браузер не поддерживает Web Speech API**
   - Проверьте: https://caniuse.com/speech-synthesis
   - Поддержка: Chrome ✅, Edge ✅, Safari ✅, Firefox ✅

3. **Голоса ещё не загружены**
   - Компонент автоматически ждёт события `voiceschanged`
   - При первом запуске может быть небольшая задержка

### ❌ Голос звучит роботизированно

**Решение:**
1. Обновите браузер до последней версии
2. В Windows: установите лучшие голоса через Settings → Time & Language → Speech
3. В macOS: System Preferences → Accessibility → Spoken Content → System Voice

### ❌ Нет русского голоса

**Решение:**

**Windows:**
1. Settings → Time & Language → Speech
2. Add voices → Скачайте Russian language pack

**macOS:**
1. System Preferences → Accessibility → Spoken Content
2. System Voice → Manage Voices → Скачайте Yuri или Milena

**Linux:**
```bash
# Установить espeak
sudo apt-get install espeak

# Или festival
sudo apt-get install festival festvox-ru
```

---

## 📊 Сравнение с платными решениями

| Параметр | Web Speech API | xAI Voice | ElevenLabs |
|----------|----------------|-----------|------------|
| **Стоимость** | 🆓 Бесплатно | 💰 $4.20/1M символов | 💰 $0.30/1k символов |
| **Качество** | ⭐⭐⭐ Хорошее | ⭐⭐⭐⭐⭐ Отличное | ⭐⭐⭐⭐⭐ Отличное |
| **Эмоции** | ❌ Нет | ✅ Есть | ✅ Есть |
| **Backend** | ❌ Не нужен | ✅ Нужен | ✅ Нужен |
| **Приватность** | ✅ 100% | ⚠️ Облако | ⚠️ Облако |
| **Скорость** | ⚡ Мгновенно | ⏱️ ~1-2 сек | ⏱️ ~1-2 сек |

---

## 💡 Когда использовать

### ✅ Используйте Web Speech API если:
- Личный проект / портфолио
- Нужна бесплатность
- Важна приватность
- Хотите простоту (без backend)
- Демо и прототипы

### ⚠️ Используйте платные API если:
- Коммерческий продукт
- Нужны эмоции и живость
- Критично качество голоса
- Мультиязычность с одним качеством
- Кастомные голоса

---

## 🎉 Готово!

Теперь ваш CV-сайт:
- ✅ Автоматически озвучивает себя **бесплатно**
- ✅ Работает без backend и API ключей
- ✅ Поддерживает русский и английский
- ✅ Красивый UI с промптом
- ✅ Не требует никаких настроек

**Запускайте:**

```bash
npm run dev
```

Откройте http://localhost:5173 и послушайте!

---

## 🔮 Хотите больше?

Если захотите добавить платные голоса позже:

### Вариант 1: ElevenLabs (10k символов бесплатно)
- Регистрация: https://elevenlabs.io/
- Отличное качество
- Простой API

### Вариант 2: OpenAI TTS (дешевле xAI)
- $15 за 1M символов
- 6 голосов
- HD качество

### Вариант 3: Google Cloud TTS (1M бесплатно в месяц)
- WaveNet голоса
- Много языков

Но для личного CV-сайта **Web Speech API более чем достаточно**! 🚀
