import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, PlayCircle, MousePointerClick, Zap, Database, CheckCircle2, ShieldAlert } from 'lucide-react';

type TraceStep = {
  id: number;
  type: 'action' | 'req' | 'db' | 'error' | 'resolved';
  label: string;
  icon: React.ElementType;
  color: string;
  delay: number;
};

const TRACE_SEQUENCE: TraceStep[] = [
  { id: 1, type: 'action', label: 'User clicked "Checkout"', icon: MousePointerClick, color: 'text-gray-400', delay: 0 },
  { id: 2, type: 'req', label: 'POST /api/checkout', icon: Zap, color: 'text-blue-400', delay: 800 },
  { id: 3, type: 'db', label: 'SELECT * FROM inventory FOR UPDATE', icon: Database, color: 'text-purple-400', delay: 1600 },
  { id: 4, type: 'error', label: 'Deadlock found when trying to get lock', icon: Bug, color: 'text-red-400', delay: 2400 },
];

export function SentryStory() {
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const [isError, setIsError] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [playing, setPlaying] = useState(false);

  const triggerSequence = () => {
    if (playing) return;
    setPlaying(true);
    setActiveSteps([]);
    setIsError(false);
    setIsResolved(false);

    TRACE_SEQUENCE.forEach((step) => {
      setTimeout(() => {
        setActiveSteps(prev => [...prev, step.id]);
        if (step.type === 'error') {
          setIsError(true);
        }
      }, step.delay);
    });
  };

  const handleFix = () => {
    setIsResolved(true);
    setIsError(false);
    setTimeout(() => {
      setPlaying(false);
    }, 2000);
  };

  return (
    <div className={`relative w-full p-8 transition-colors duration-700 bg-white/[0.01] border rounded-3xl overflow-hidden ${
      isError && !isResolved ? 'border-red-500/30 bg-red-500/[0.02] shadow-[inset_0_0_50px_rgba(239,68,68,0.05)]' : 
      isResolved ? 'border-emerald-500/20 bg-emerald-500/[0.02]' : 'border-white/5'
    }`}>
      <div className="flex justify-between items-start mb-8 relative z-10">
         <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
            <ShieldAlert size={20} className={isError && !isResolved ? 'text-red-400' : 'text-gray-400'} />
            Error Tracking & Resolution
          </h3>
          <p className="text-sm text-gray-400 max-w-sm">From user action to pinpointing the database exception. I don't just ship, I babysit my features in prod.</p>
        </div>
        
        {!playing && activeSteps.length === 0 && (
          <button 
            onClick={triggerSequence}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <PlayCircle size={14} /> Simulate Crash
          </button>
        )}

        <AnimatePresence>
          {isError && !isResolved && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <div className="text-[10px] font-mono tracking-widest text-red-400 uppercase flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-3 py-1.5 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                Issue Captured
              </div>
              <button 
                onClick={handleFix}
                className="px-4 py-1.5 bg-red-500 text-white text-xs font-mono tracking-widest uppercase rounded-lg hover:bg-red-600 transition-colors"
              >
                Apply Fix (Retry)
              </button>
            </motion.div>
          )}

          {isResolved && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
              <CheckCircle2 size={12} /> Resolved in 2 mins
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 relative z-10 font-mono text-sm">
        {TRACE_SEQUENCE.map((step, index) => {
          const isActive = activeSteps.includes(step.id);
          const isLastError = isError && !isResolved && step.type === 'error';
          
          return (
            <div key={step.id} className="relative">
              {/* Connecting line */}
              {index !== 0 && (
                <div className="absolute left-4 -top-4 w-px h-4 bg-white/10" />
              )}
              
              <AnimatePresence mode="popLayout">
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-4 p-3 rounded-xl border ${
                      isLastError ? 'border-red-500/30 bg-red-500/10 text-red-200' : 'border-white/5 bg-white/[0.02] text-gray-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isLastError ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-400'
                    }`}>
                      <step.icon size={16} />
                    </div>
                    
                    <div className="flex-1 flex justify-between items-center">
                      <span className={isLastError ? 'font-bold' : ''}>{step.label}</span>
                      <span className="text-[10px] text-gray-500">{(step.delay / 1000).toFixed(1)}s</span>
                    </div>

                    {isLastError && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }} 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute -inset-px border border-red-500 rounded-xl"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}