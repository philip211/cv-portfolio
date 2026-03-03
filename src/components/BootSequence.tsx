import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

const BOOT_LOGS = [
  { text: "Booting product-minded engineer...", delay: 300 },
  { text: "[OK] Core loaded: React 19, TypeScript, Vite", delay: 800 },
  { text: "Initializing Realtime Matrix...", delay: 1200 },
  { text: "[OK] WebSockets & Backend sync established", delay: 1500 },
  { text: "Checking strict type-safety boundaries...", delay: 1800 },
  { text: "[OK] 0 TS errors found. Drizzle schema generated.", delay: 2100 },
  { text: "Initiating premium interface sequence...", delay: 2400 },
  { text: "[System Ready] Welcome.", delay: 2800 },
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    BOOT_LOGS.forEach((log) => {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, log.text]);
      }, log.delay);
      timers.push(timer);
    });

    const completionTimer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 800); // fade out time
    }, BOOT_LOGS[BOOT_LOGS.length - 1].delay + 500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e] text-blue-400 font-mono text-xs sm:text-sm px-6"
        >
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-blue-500/50 pb-4 border-b border-blue-500/10">
              <Terminal size={16} /> <span>system_init.sh</span>
            </div>
            <div className="space-y-2">
              {logs.map((log, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${log.includes('[OK]') ? 'text-emerald-400' : 'text-blue-300'}`}
                >
                  <span className="opacity-50 text-gray-500 mr-4">
                    {new Date().toISOString().substring(11, 23)}
                  </span>
                  {log}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-blue-400 mt-2"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}