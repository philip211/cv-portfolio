import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BrowserVoiceIntroProps {
  autoplayDelay?: number;
  customText?: string;
  position?: 'top-right' | 'bottom-right' | 'center';
  showBigButton?: boolean;
  onPlay?: () => void;
  onEnd?: () => void;
}

export function BrowserVoiceIntro({ 
  autoplayDelay = 1500,
  customText,
  position = 'bottom-right',
  showBigButton = true,
  onPlay,
  onEnd
}: BrowserVoiceIntroProps) {
  const { t, i18n } = useTranslation();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasAttemptedAutoplay = useRef(false);
  
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused' | 'blocked' | 'error'>('idle');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [showBigBtn, setShowBigBtn] = useState(showBigButton);

  // Get full CV text
  const getIntroText = () => {
    if (customText) return customText;
    
    if (i18n.language === 'ru') {
      return `Привет! Меня зовут Филипп, и я буду вашим голосовым проводником по резюме Павла.

Позвольте рассказать о нём и его подходе к разработке.

Павел не просто собирает экраны. Он делает готовые продукты. Его стек: Реакт, ТайпСкрипт, Телеграм ЮАй.

Он превращает идею в интерфейс, который цепляет, и в систему, которая не ломается под нагрузкой. Премиальный интерфейс плюс инженерная логика плюс скорость доставки.

Его ключевые компетенции:

Первое — Продуктовая инженерия. Павел думает результатом: пользователь... ценность... метрика... решение. Он не делает фичи ради фич, делает то что улучшает продукт.

Второе — Премиальный интерфейс. Дизайн-система, компоненты, типизация, микро-анимации. Интерфейс выглядит как Ай О Эс продукт, а не набор экранов.

Третье — Риалтайм системы. Сокеты, комнаты, события, роли, приватные чаты. Когда важна честность, стабильность и предсказуемость, Павел в своей стихии.

Четвертое — Автоматизация с ИИ. Павел ускоряет цикл разработки: спека, код, ревью, тесты, релиз.

Немного о его проектах:

Рэйвенхилл: Ночные Улицы — мультиплеерная социальная игра на Веб Сокетах до 30 игроков. Сложная синхронизация и честная игровая логика. Он построил: локации, катсцены, приватные чаты, голосовые события, детерминистичный резолвер.

НОАР — Телеграм продукт с упором на премиальный интерфейс. Дизайн-система, лента, продуктовые скрипты.

Ай Дев Тим — оркестрация команды ИИ агентов для разработки. Решает хаос задач, долгие ревью. Он построил пайплайн: спека, генерация, ревью, тест-скелет, релиз чеклист.

Его опыт:

Труд, практика 2024 года. Фронтенд на Реакт и ТайпСкрипт. Взаимодействовал с командой, рефакторил компоненты, выстраивал процессы дизайн в код.

Образование — Фронтенд разработка с фокусом на Реакт, 2021-2022. Разработал полноценный онлайн-магазин с интеграцией фронтенда и бэкенда.

Мой подход к работе:

Шаг первый — Выравнивание. Цель, пользователь, критерии готовности. Никакого тумана.

Шаг второй — Чертеж. Схема экранов и событий. Риски отмечаю сразу.

Шаг третий — Сборка. Сначала скелет и архитектура, потом детали. ТайпСкрипт ферст.

Шаг четвертый — Полировка. Микро интерфейс, скорость, анимации. Премиальное ощущение.

Шаг пятый — Релиз. Выпуск, фидбэк, улучшения по приоритетам.

Павел открыт для стажировки или Джуниор плюс позиции. Он готов создавать продукты, которыми удобно пользоваться.

Свяжитесь с Павлом, чтобы обсудить сотрудничество! До встречи!`;
    } else {
      return `Hello! My name is Philip, and I'll be your voice guide through Pavel's resume.

Let me tell you about him and his approach to development.

I don't build pages. I ship products. My stack: React, TypeScript, Telegram UI.

I turn ideas into engaging interfaces and systems that don't break under load. Premium UI plus engineering logic plus delivery speed.

Pavel's core competencies:

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

Contact me to discuss collaboration!`;
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
    if (!isSupported) {
      setStatus('error');
      return;
    }

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
      utterance.rate = 0.85; // Slower for better understanding and natural pace
      utterance.pitch = 0.95; // Slightly lower pitch for more natural sound
      utterance.volume = 1.0;
      utterance.lang = i18n.language === 'ru' ? 'ru-RU' : 'en-US';

      // Event handlers
      utterance.onstart = () => {
        setStatus('playing');
        setShowPrompt(false);
        setShowBigBtn(false); // Hide big button after first play
        onPlay?.();
      };

      utterance.onend = () => {
        setStatus('idle');
        onEnd?.();
      };

      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        
        // "not-allowed" means user interaction required
        if (event.error === 'not-allowed') {
          setStatus('blocked');
          setShowPrompt(true);
        } else {
          setStatus('error');
        }
      };

      utterance.onpause = () => {
        setStatus('paused');
      };

      utterance.onresume = () => {
        setStatus('playing');
      };

      // Start speaking
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('Failed to play voice:', error);
      setStatus('error');
    }
  };

  // Pause speech
  const pauseVoice = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  };

  // Resume speech
  const resumeVoice = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  // Stop speech
  const stopVoice = () => {
    window.speechSynthesis.cancel();
    setStatus('idle');
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

  // Handle double-click to stop
  const handleDoubleClick = () => {
    if (status === 'playing' || status === 'paused') {
      stopVoice();
    }
  };

  // Attempt autoplay on mount
  useEffect(() => {
    if (!isSupported || hasAttemptedAutoplay.current) return;
    hasAttemptedAutoplay.current = true;

    const timer = setTimeout(() => {
      playVoice();
    }, autoplayDelay);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!isSupported) {
    return null; // Don't show button if not supported
  }

  // Position classes
  const positionClasses = {
    'top-right': 'fixed top-20 right-6 z-40',
    'bottom-right': 'fixed bottom-6 right-6 z-40',
    'center': 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40'
  };

  return (
    <>
      {/* Big Listen Button - Shows on first load */}
      <AnimatePresence>
        {showBigBtn && status === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.button
              onClick={playVoice}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-full shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-all border border-blue-400/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                <Volume2 size={24} className="animate-pulse" />
                <span className="tracking-wider">{t('voice.listenCV')}</span>
              </span>
              
              {/* Animated border glow */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 animate-pulse"></span>
            </motion.button>

            {/* Helper text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center text-gray-500 text-xs mt-3 font-mono"
            >
              🆓 Бесплатно • Работает в браузере
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Control Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={positionClasses[position]}
      >
        <motion.button
          onClick={toggleVoice}
          onDoubleClick={handleDoubleClick}
          className="group relative bg-[#030303]/90 hover:bg-[#0a0a0a] border border-blue-500/30 hover:border-blue-500 p-4 rounded-full backdrop-blur-md transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={status === 'playing' ? t('voice.pause') : t('voice.play')}
        >
          {/* Status Icon */}
          {status === 'playing' && (
            <Volume2 size={24} className="text-blue-400 animate-pulse" />
          )}
          {status === 'paused' && (
            <Pause size={24} className="text-blue-400" />
          )}
          {(status === 'idle' || status === 'blocked') && (
            <Play size={24} className="text-blue-400 group-hover:text-blue-300" />
          )}
          {status === 'error' && (
            <VolumeX size={24} className="text-red-400" />
          )}

          {/* Pulse effect when playing */}
          {status === 'playing' && (
            <>
              <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></span>
              <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-pulse"></span>
            </>
          )}

          {/* Tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-mono tracking-widest text-blue-400 backdrop-blur-sm bg-[#030303]/80 px-3 py-1.5 rounded-md border border-blue-500/20">
            {status === 'playing' && t('voice.listening')}
            {status === 'paused' && t('voice.paused')}
            {status === 'blocked' && t('voice.clickToPlay')}
            {status === 'idle' && t('voice.startIntro')}
            {status === 'error' && t('voice.error')}
          </span>
        </motion.button>
      </motion.div>

      {/* Full-screen Prompt for Autoplay Block */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]/95 backdrop-blur-md"
            onClick={toggleVoice}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="text-center px-6 max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pulsing Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6 flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                  <Volume2 size={64} className="text-blue-400 relative" />
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                {t('voice.promptTitle')}
              </h2>
              <p className="text-gray-400 mb-2 text-sm leading-relaxed">
                {t('voice.promptDescription')}
              </p>
              <p className="text-gray-500 mb-8 text-xs">
                🆓 Работает прямо в браузере • Без серверов и API ключей
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={toggleVoice}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Play size={20} />
                  {t('voice.startVoiceIntro')}
                </span>
              </motion.button>

              {/* Skip link */}
              <button
                onClick={() => setShowPrompt(false)}
                className="mt-4 text-gray-500 hover:text-gray-400 text-sm underline"
              >
                {t('voice.skipIntro')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
