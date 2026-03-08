import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavbarVoiceButtonProps {
  customText?: string;
  onPlay?: () => void;
  onEnd?: () => void;
}

export function NavbarVoiceButton({ 
  customText,
  onPlay,
  onEnd
}: NavbarVoiceButtonProps) {
  const { t, i18n } = useTranslation();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused' | 'error'>('idle');
  const [isSupported, setIsSupported] = useState(true);

  // Get full CV text
  const getIntroText = () => {
    if (customText) return customText;
    
    if (i18n.language === 'ru') {
      return `Привет! Меня зовут Филипп, и я буду вашим голосовым проводником по резюме Павла.

Позвольте рассказать о себе и моем подходе к разработке.

Я не просто собираю экраны. Я делаю готовые продукты. Мой стек: Реакт, ТайпСкрипт, Телеграм ЮАй.

Я превращаю идею в интерфейс, который цепляет, и в систему, которая не ломается под нагрузкой. Премиальный интерфейс плюс инженерная логика плюс скорость доставки.

Мои ключевые компетенции:

Первое — Продуктовая инженерия. Думаю результатом: пользователь... ценность... метрика... решение. Не делаю фичи ради фич, делаю то что улучшает продукт.

Второе — Премиальный интерфейс. Дизайн-система, компоненты, типизация, микро-анимации. Интерфейс выглядит как Ай О Эс продукт, а не набор экранов.

Третье — Риалтайм системы. Сокеты, комнаты, события, роли, приватные чаты. Когда важна честность, стабильность и предсказуемость, я в своей стихии.

Четвертое — Автоматизация с ИИ. Ускоряю цикл разработки: спека, код, ревью, тесты, релиз.

Немного о проектах:

Рэйвенхилл: Ночные Улицы — мультиплеерная социальная игра на Веб Сокетах до 30 игроков. Сложная синхронизация и честная игровая логика. Построил: локации, катсцены, приватные чаты, голосовые события, детерминистичный резолвер.

НОАР — Телеграм продукт с упором на премиальный интерфейс. Дизайн-система, лента, продуктовые скрипты.

Ай Дев Тим — оркестрация команды ИИ агентов для разработки. Решает хаос задач, долгие ревью. Построил пайплайн: спека, генерация, ревью, тест-скелет, релиз чеклист.

Мой опыт:

Труд, практика 2024 года. Фронтенд на Реакт и ТайпСкрипт. Взаимодействовал с командой, рефакторил компоненты, выстраивал процессы дизайн в код.

Образование — Фронтенд разработка с фокусом на Реакт, 2021-2022. Разработал полноценный онлайн-магазин с интеграцией фронтенда и бэкенда.

Мой подход к работе:

Шаг первый — Выравнивание. Цель, пользователь, критерии готовности. Никакого тумана.

Шаг второй — Чертеж. Схема экранов и событий. Риски отмечаю сразу.

Шаг третий — Сборка. Сначала скелет и архитектура, потом детали. ТайпСкрипт ферст.

Шаг четвертый — Полировка. Микро интерфейс, скорость, анимации. Премиальное ощущение.

Шаг пятый — Релиз. Выпуск, фидбэк, улучшения по приоритетам.

Я открыт для стажировки или Джуниор плюс позиции. Готов создавать продукты, которыми удобно пользоваться.

Свяжитесь со мной, чтобы обсудить сотрудничество! До встречи!`;
    } else {
      return `Hello! My name is Philip, and I'll be your voice guide through Pavel's resume.

Let me tell you about myself and my approach to development.

I don't build pages. I ship products. My stack: React, TypeScript, Telegram UI.

I turn ideas into engaging interfaces and systems that don't break under load. Premium UI plus engineering logic plus delivery speed.

My core competencies:

First — Product Engineering. I think in terms of results: user, value, metric, solution. I don't do features for features sake, I do what improves the product.

Second — Premium UI. Design system, components, state, typing, micro-animations. The interface looks like an iOS product, not a set of screens.

Third — Realtime Systems. Sockets, rooms, events, roles, private chats. When fairness, stability, and predictability are important, I am in my element.

Fourth — Automation with AI. I speed up the development cycle: spec, code, review, tests, release.

A bit about my projects:

Ravenhill: Night Streets — multiplayer social game on WebSockets for up to 30 players. Complex synchronization and fair game logic. Built: locations, cutscenes, private chats, voice events, deterministic resolver.

NOIR — Telegram product with emphasis on premium UX. Design system, feed, product scripts.

AI Dev Team — orchestration of AI agent team for development. Solves task chaos and long reviews. Built pipeline: spec, generation, review, test skeleton, release checklist.

My experience:

Trood, internship 2024. Frontend with React and TypeScript. Collaborated with the team, refactored components, established design-to-code processes.

Education — Frontend development focused on React, 2021-2022. Built a full-featured online store with frontend and backend integration.

My work approach:

Step one — Align. Goal, user, acceptance criteria. No fog.

Step two — Blueprint. Screen and event schematic. Marking risks immediately.

Step three — Build. Skeleton and architecture first, then details. TypeScript first.

Step four — Polish. Micro UX, speed, animations. Premium feel.

Step five — Ship. Release, feedback, priority improvements.

I'm open to internship or Junior plus positions. Ready to create products that people love to use.

Contact me to discuss collaboration! See you soon!`;
    }
  };

  // Check browser support
  useEffect(() => {
    if (!window.speechSynthesis) {
      setIsSupported(false);
      setStatus('error');
    }
  }, []);

  // Get best voice for language
  const getVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const lang = i18n.language === 'ru' ? 'ru' : 'en';
    
    // Try to find a good voice for the language
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith(lang) && (
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') ||
        voice.name.includes('Natural')
      )
    );
    
    return preferredVoice || voices.find(voice => voice.lang.startsWith(lang)) || voices[0];
  };

  // Play speech
  const playVoice = () => {
    if (!isSupported || status === 'playing') return;

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const text = getIntroText();
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Wait for voices to load
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          utterance.voice = getVoice();
        }, { once: true });
      } else {
        utterance.voice = getVoice();
      }

      // Configure speech for natural human-like voice
      utterance.rate = 0.8; // Even slower for better comprehension
      utterance.pitch = 0.9; // Lower pitch for professional sound
      utterance.volume = 1.0;
      utterance.lang = i18n.language === 'ru' ? 'ru-RU' : 'en-US';

      // Event handlers
      utterance.onstart = () => {
        setStatus('playing');
        onPlay?.();
      };

      utterance.onend = () => {
        setStatus('idle');
        onEnd?.();
      };

      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        setStatus('error');
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to play voice:', error);
      setStatus('error');
    }
  };

  // Pause speech
  const pauseVoice = () => {
    window.speechSynthesis.pause();
    setStatus('paused');
  };

  // Resume speech
  const resumeVoice = () => {
    window.speechSynthesis.resume();
    setStatus('playing');
  };

  // Toggle play/pause/stop
  const toggleVoice = () => {
    if (status === 'playing') {
      pauseVoice();
    } else if (status === 'paused') {
      resumeVoice();
    } else {
      playVoice();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <button 
      onClick={toggleVoice}
      className="group relative bg-[#030303]/90 hover:bg-[#0a0a0a] border border-blue-500/30 hover:border-blue-500 px-4 py-3 rounded-full backdrop-blur-md transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center gap-2"
      title={status === 'playing' ? t('voice.pause') : t('voice.play')}
    >
      {status === 'playing' && (
        <>
          <Volume2 size={18} className="text-blue-400 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
        </>
      )}
      {status === 'paused' && (
        <Pause size={18} className="text-blue-400" />
      )}
      {status === 'idle' && (
        <Play size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
      )}
      {status === 'error' && (
        <VolumeX size={18} className="text-red-400" />
      )}
      
      {/* Text label */}
      <span className="hidden md:flex flex-col items-start text-left">
        <span className="text-[8px] text-gray-500 uppercase tracking-wider font-mono">
          {status === 'idle' ? 'Voice Guide' : status === 'playing' ? 'Playing...' : 'Paused'}
        </span>
        <span className="text-[10px] text-gray-300 font-bold tracking-wide">
          ФИЛИПП
        </span>
      </span>
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-mono tracking-widest text-blue-400 backdrop-blur-sm bg-[#030303]/80 px-3 py-1.5 rounded-md border border-blue-500/20 pointer-events-none">
        {status === 'idle' && t('voice.listenCV').replace('🎧 ', '')}
        {status === 'playing' && t('voice.playingCV')}
        {status === 'paused' && t('voice.pause')}
      </span>
    </button>
  );
}
