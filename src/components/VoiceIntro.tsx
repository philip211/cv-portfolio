import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Loader2, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VoiceIntroProps {
  /** Delay before attempting autoplay (ms) */
  autoplayDelay?: number;
  /** Text to synthesize - if not provided, uses CV intro from translations */
  customText?: string;
  /** xAI voice ID: eve, ara, rex, sal, leo */
  voiceId?: 'eve' | 'ara' | 'rex' | 'sal' | 'leo';
  /** Position of the control button */
  position?: 'top-right' | 'bottom-right' | 'center';
  /** Callback when audio starts playing */
  onPlay?: () => void;
  /** Callback when audio ends */
  onEnd?: () => void;
}

export function VoiceIntro({ 
  autoplayDelay = 1500,
  customText,
  voiceId = 'ara',
  position = 'bottom-right',
  onPlay,
  onEnd
}: VoiceIntroProps) {
  const { t, i18n } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAttemptedAutoplay = useRef(false);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error'>('idle');
  const [showPrompt, setShowPrompt] = useState(false);
  const [progress, setProgress] = useState(0);

  // Get CV intro text based on current language
  const getIntroText = () => {
    if (customText) return customText;
    return i18n.language === 'ru' 
      ? "Привет! Я fullstack разработчик с опытом создания realtime приложений. Специализируюсь на React, TypeScript и WebSocket решениях. Готов создавать продукты, которыми удобно пользоваться."
      : "Hi! I'm a fullstack developer with experience building realtime applications. I specialize in React, TypeScript and WebSocket solutions. Ready to create products that people love to use.";
  };

  // Fetch audio from backend
  const fetchAudio = async (): Promise<string> => {
    const text = getIntroText();
    
    // Check if we have a backend endpoint
    try {
      const response = await fetch('/api/voice-intro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice_id: voiceId })
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.warn('Backend not available, falling back to mock audio:', error);
      // In development without backend, show error
      throw new Error('Backend API not available. Please set up /api/voice-intro endpoint.');
    }
  };

  // Attempt to play audio
  const playAudio = async () => {
    try {
      setStatus('loading');
      
      // Fetch audio URL
      const audioUrl = await fetchAudio();
      
      // Create or update audio element
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = audioUrl;
      } else {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        // Set up event listeners
        audio.addEventListener('play', () => {
          setStatus('playing');
          setShowPrompt(false);
          onPlay?.();
        });

        audio.addEventListener('pause', () => {
          if (audio.currentTime > 0 && audio.currentTime < audio.duration) {
            setStatus('paused');
          }
        });

        audio.addEventListener('ended', () => {
          setStatus('idle');
          setProgress(0);
          onEnd?.();
        });

        audio.addEventListener('timeupdate', () => {
          if (audio.duration) {
            setProgress((audio.currentTime / audio.duration) * 100);
          }
        });

        audio.addEventListener('error', (e) => {
          console.error('Audio playback error:', e);
          setStatus('error');
        });
      }

      // Try to play
      await audioRef.current.play();
      
    } catch (error: any) {
      console.error('Failed to play audio:', error);
      
      // If it's a DOMException, likely autoplay was blocked
      if (error.name === 'NotAllowedError') {
        setStatus('blocked');
        setShowPrompt(true);
      } else {
        setStatus('error');
      }
    }
  };

  // Pause audio
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Toggle play/pause
  const toggleAudio = () => {
    if (status === 'playing') {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Attempt autoplay on mount
  useEffect(() => {
    if (hasAttemptedAutoplay.current) return;
    hasAttemptedAutoplay.current = true;

    const timer = setTimeout(() => {
      playAudio();
    }, autoplayDelay);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Position classes
  const positionClasses = {
    'top-right': 'fixed top-20 right-6 z-40',
    'bottom-right': 'fixed bottom-6 right-6 z-40',
    'center': 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40'
  };

  return (
    <>
      {/* Floating Control Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={positionClasses[position]}
      >
        <motion.button
          onClick={toggleAudio}
          className="group relative bg-[#030303]/90 hover:bg-[#0a0a0a] border border-blue-500/30 hover:border-blue-500 p-4 rounded-full backdrop-blur-md transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={status === 'playing' ? t('voice.pause') : t('voice.play')}
        >
          {/* Status Icon */}
          {status === 'loading' && (
            <Loader2 size={24} className="text-blue-400 animate-spin" />
          )}
          {status === 'playing' && (
            <Volume2 size={24} className="text-blue-400 animate-pulse" />
          )}
          {(status === 'idle' || status === 'paused' || status === 'blocked') && (
            <Play size={24} className="text-blue-400 group-hover:text-blue-300" />
          )}
          {status === 'error' && (
            <VolumeX size={24} className="text-red-400" />
          )}

          {/* Progress Ring */}
          {status === 'playing' && (
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="28"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="28"
                stroke="rgba(59, 130, 246, 1)"
                strokeWidth="2"
                fill="none"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={2 * Math.PI * 28 * (1 - progress / 100)}
                className="transition-all duration-300"
              />
            </svg>
          )}

          {/* Tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-mono tracking-widest text-blue-400 backdrop-blur-sm bg-[#030303]/80 px-3 py-1.5 rounded-md border border-blue-500/20">
            {status === 'loading' && t('voice.loading')}
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
            onClick={toggleAudio}
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
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                {t('voice.promptDescription')}
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={toggleAudio}
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
