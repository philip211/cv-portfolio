import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2, X, Volume2, MessageSquare, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VoiceAgentProps {
  /** System instructions for the AI agent */
  instructions?: string;
  /** xAI voice ID for responses */
  voiceId?: 'Ara' | 'Eve' | 'Rex' | 'Sal' | 'Leo';
  /** Callback when session starts */
  onSessionStart?: () => void;
  /** Callback when session ends */
  onSessionEnd?: () => void;
}

type SessionStatus = 
  | 'idle' 
  | 'connecting' 
  | 'connected' 
  | 'listening' 
  | 'thinking' 
  | 'speaking' 
  | 'error' 
  | 'disconnected';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function VoiceAgent({ 
  instructions,
  voiceId = 'Ara',
  onSessionStart,
  onSessionEnd
}: VoiceAgentProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SessionStatus>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);

  // Get AI instructions based on language
  const getInstructions = useCallback(() => {
    if (instructions) return instructions;
    
    return i18n.language === 'ru' 
      ? `Ты — голосовой AI-помощник для CV fullstack разработчика. Твоя задача — рассказать о его навыках, опыте и проектах. 
         Ключевые навыки: React, TypeScript, WebSockets, Realtime системы, Premium UI, NestJS.
         Основные проекты: Ravenhill (multiplayer игра с WebSockets), NOIR (Telegram premium UI), AI Dev Workflows.
         Отвечай кратко, по делу, дружелюбно. Если спрашивают о конкретной технологии — опирайся на реальный опыт из проектов.`
      : `You are a voice AI assistant for a fullstack developer's CV. Your task is to tell about his skills, experience and projects.
         Key skills: React, TypeScript, WebSockets, Realtime systems, Premium UI, NestJS.
         Main projects: Ravenhill (multiplayer game with WebSockets), NOIR (Telegram premium UI), AI Dev Workflows.
         Answer briefly, to the point, friendly. If asked about a specific technology — rely on real experience from projects.`;
  }, [instructions, i18n.language]);

  // Connect to xAI Realtime API
  const connect = async () => {
    try {
      setStatus('connecting');
      setError(null);

      // Get ephemeral token from backend
      const tokenResponse = await fetch('/api/voice-agent-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voice: voiceId })
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get session token');
      }

      const { client_secret } = await tokenResponse.json();

      // Connect to xAI WebSocket
      const ws = new WebSocket('wss://api.x.ai/v1/realtime', {
        headers: {
          'Authorization': `Bearer ${client_secret.value}`,
          'Content-Type': 'application/json',
        }
      } as any);

      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✓ Connected to xAI Realtime API');
        setStatus('connected');

        // Configure session
        ws.send(JSON.stringify({
          type: 'session.update',
          session: {
            instructions: getInstructions(),
            voice: voiceId,
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 500
            },
            modalities: ['text', 'audio']
          }
        }));

        onSessionStart?.();
        startAudioCapture();
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleServerEvent(data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error');
        setStatus('error');
      };

      ws.onclose = () => {
        console.log('✗ Disconnected from xAI');
        setStatus('disconnected');
        stopAudioCapture();
        onSessionEnd?.();
      };

    } catch (err: any) {
      console.error('Connection failed:', err);
      setError(err.message || 'Failed to connect');
      setStatus('error');
    }
  };

  // Handle events from xAI server
  const handleServerEvent = (event: any) => {
    switch (event.type) {
      case 'session.created':
        console.log('Session created:', event.session.id);
        break;

      case 'session.updated':
        console.log('Session updated');
        break;

      case 'input_audio_buffer.speech_started':
        setStatus('listening');
        setTranscript('');
        break;

      case 'input_audio_buffer.speech_stopped':
        setStatus('thinking');
        break;

      case 'conversation.item.created':
        if (event.item.role === 'user' && event.item.content) {
          const textContent = event.item.content.find((c: any) => c.type === 'input_text');
          if (textContent) {
            setMessages(prev => [...prev, {
              role: 'user',
              content: textContent.text,
              timestamp: Date.now()
            }]);
          }
        }
        break;

      case 'response.audio_transcript.delta':
        setTranscript(prev => prev + event.delta);
        break;

      case 'response.audio.delta':
        // Queue audio chunks for playback
        if (event.delta) {
          const audioData = base64ToArrayBuffer(event.delta);
          audioQueueRef.current.push(audioData);
          if (!isPlayingRef.current) {
            playAudioQueue();
          }
        }
        setStatus('speaking');
        break;

      case 'response.done':
        if (transcript) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: transcript,
            timestamp: Date.now()
          }]);
          setTranscript('');
        }
        setStatus('connected');
        break;

      case 'error':
        console.error('Server error:', event.error);
        setError(event.error.message);
        setStatus('error');
        break;
    }
  };

  // Start capturing audio from microphone
  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 24000,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      mediaStreamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        if (wsRef.current?.readyState === WebSocket.OPEN && status !== 'idle') {
          const inputData = e.inputBuffer.getChannelData(0);
          const pcm16 = floatTo16BitPCM(inputData);
          const base64Audio = arrayBufferToBase64(pcm16);

          wsRef.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: base64Audio
          }));
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

    } catch (err) {
      console.error('Failed to access microphone:', err);
      setError('Microphone access denied');
      setStatus('error');
    }
  };

  // Stop audio capture
  const stopAudioCapture = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // Play queued audio chunks
  const playAudioQueue = async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) return;
    
    isPlayingRef.current = true;

    while (audioQueueRef.current.length > 0) {
      const audioData = audioQueueRef.current.shift()!;
      await playAudioChunk(audioData);
    }

    isPlayingRef.current = false;
  };

  // Play single audio chunk
  const playAudioChunk = (arrayBuffer: ArrayBuffer): Promise<void> => {
    return new Promise((resolve) => {
      const audioContext = new AudioContext({ sampleRate: 24000 });
      const buffer = audioContext.createBuffer(1, arrayBuffer.byteLength / 2, 24000);
      const channelData = buffer.getChannelData(0);

      const view = new Int16Array(arrayBuffer);
      for (let i = 0; i < view.length; i++) {
        channelData[i] = view[i] / 32768.0;
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.onended = () => {
        audioContext.close();
        resolve();
      };
      source.start();
    });
  };

  // Disconnect from session
  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    stopAudioCapture();
    setStatus('idle');
    setMessages([]);
    setTranscript('');
    setIsOpen(false);
  };

  // Utility: Float32Array to 16-bit PCM
  const floatTo16BitPCM = (float32Array: Float32Array): ArrayBuffer => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new Int16Array(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return buffer;
  };

  // Utility: ArrayBuffer to Base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Utility: Base64 to ArrayBuffer
  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 p-5 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all"
        title={t('voiceAgent.startConversation')}
      >
        <MessageSquare size={28} className="text-white" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-20"></span>
        
        {/* Sparkle */}
        <Sparkles 
          size={16} 
          className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" 
        />
      </motion.button>

      {/* Voice Agent Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => status === 'idle' && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] border border-purple-500/30 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-[0_0_60px_rgba(168,85,247,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                    <MessageSquare className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {t('voiceAgent.title')}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {t('voiceAgent.subtitle')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    disconnect();
                    setIsOpen(false);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="relative">
                  {status === 'connecting' && <Loader2 className="text-purple-400 animate-spin" size={20} />}
                  {status === 'connected' && <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>}
                  {status === 'listening' && <Mic className="text-blue-400 animate-pulse" size={20} />}
                  {status === 'thinking' && <Loader2 className="text-yellow-400 animate-spin" size={20} />}
                  {status === 'speaking' && <Volume2 className="text-purple-400 animate-pulse" size={20} />}
                  {status === 'error' && <div className="w-3 h-3 rounded-full bg-red-500"></div>}
                  {status === 'idle' && <MicOff className="text-gray-500" size={20} />}
                </div>
                
                <span className="text-sm font-mono tracking-wider text-gray-400">
                  {status === 'idle' && t('voiceAgent.status.idle')}
                  {status === 'connecting' && t('voiceAgent.status.connecting')}
                  {status === 'connected' && t('voiceAgent.status.connected')}
                  {status === 'listening' && t('voiceAgent.status.listening')}
                  {status === 'thinking' && t('voiceAgent.status.thinking')}
                  {status === 'speaking' && t('voiceAgent.status.speaking')}
                  {status === 'error' && (error || t('voiceAgent.status.error'))}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-6 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                {messages.length === 0 && status === 'idle' && (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm">{t('voiceAgent.emptyState')}</p>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white/5 border border-white/10 text-gray-300'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Live transcript */}
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] p-4 rounded-2xl text-sm bg-white/5 border border-purple-500/30 text-gray-300">
                      {transcript}
                      <span className="inline-block w-1 h-4 ml-1 bg-purple-400 animate-pulse"></span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {status === 'idle' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={connect}
                    className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    {t('voiceAgent.startButton')}
                  </motion.button>
                )}

                {status !== 'idle' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={disconnect}
                    className="flex-1 py-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 font-bold rounded-xl transition-all"
                  >
                    {t('voiceAgent.endButton')}
                  </motion.button>
                )}
              </div>

              {/* Info */}
              <p className="text-xs text-gray-600 text-center mt-4">
                {t('voiceAgent.hint')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
