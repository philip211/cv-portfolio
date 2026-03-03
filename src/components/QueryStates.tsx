import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Heart, CheckCircle2, Server, Smartphone, Loader2 } from 'lucide-react';

type QueryState = 'idle' | 'fetching' | 'success' | 'stale';

export function QueryStates() {
  const [state, setState] = useState<QueryState>('success');
  const [likes, setLikes] = useState(128);
  const [optimistic, setOptimistic] = useState(false);

  const simulateRefetch = () => {
    setState('fetching');
    setTimeout(() => {
      setState('success');
    }, 1500);
  };

  const handleLike = () => {
    // Optimistic Update
    setLikes(l => l + 1);
    setOptimistic(true);
    
    // Server confirmation simulation
    setTimeout(() => {
      setOptimistic(false);
    }, 1000);
  };

  // Auto-stale simulation
  useEffect(() => {
    if (state === 'success') {
      const timer = setTimeout(() => {
        setState('stale');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="relative w-full p-8 bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full"></div>
      
      <div className="flex flex-col md:flex-row justify-between mb-8 relative z-10 gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">TanStack Query States</h3>
          <p className="text-sm text-gray-400">Optimistic UI & Cache Management</p>
        </div>
        
        {/* Status Indicators */}
        <div className="flex gap-2 text-[10px] font-mono tracking-widest uppercase">
          <div className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2 ${
            state === 'fetching' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-white/5 text-gray-500 border-white/10'
          }`}>
            {state === 'fetching' && <Loader2 size={12} className="animate-spin" />}
            Fetching
          </div>
          <div className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2 ${
            state === 'stale' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
            state === 'success' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/5 text-gray-500 border-white/10'
          }`}>
            {state === 'stale' ? 'Stale' : state === 'success' ? 'Fresh' : 'Idle'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Component UI */}
        <div className="p-6 border border-white/10 rounded-2xl bg-[#0a0d14] relative">
          {state === 'fetching' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#0a0d14]/50 backdrop-blur-[2px] z-10 rounded-2xl flex items-center justify-center">
              <div className="animate-spin text-blue-500"><RefreshCw size={24} /></div>
            </motion.div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
               <div className="w-full h-full bg-gradient-to-tr from-blue-500/40 to-purple-500/40"></div>
            </div>
            <div>
              <div className="h-4 w-24 bg-white/10 rounded mb-2"></div>
              <div className="h-3 w-16 bg-white/5 rounded"></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Data fetching isn't just about showing a spinner. It's about perceived performance, background updates, and preventing layout shifts.
          </p>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 text-sm transition-colors ${optimistic ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Heart size={16} className={optimistic ? 'fill-current' : ''} /> 
              {likes}
            </button>
            <AnimatePresence mode="popLayout">
              {optimistic && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-1 rounded"
                >
                  Optimistic Render...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Network & Cache Log */}
        <div className="flex flex-col justify-end space-y-4 font-mono text-[10px] uppercase tracking-widest relative">
          {/* Connecting line */}
          <div className="absolute left-[-2rem] top-1/2 w-8 h-[1px] bg-white/10 hidden md:block"></div>
          
          <button 
            onClick={simulateRefetch}
            disabled={state === 'fetching'}
            className="self-start text-xs flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            <RefreshCw size={14} className={state === 'fetching' ? 'animate-spin' : ''} />
            Background Refetch
          </button>
          
          <div className="space-y-2 max-h-[150px] overflow-hidden flex flex-col justify-end">
            <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-gray-500">
              <Smartphone size={12} /> <span className="opacity-50">12:00:00</span> Component Mounted
            </motion.div>
            
            {optimistic && (
              <motion.div layout initial={{ opacity: 0, flex: 0 }} animate={{ opacity: 1, flex: 1 }} className="flex items-center gap-2 text-pink-400">
                <CheckCircle2 size={12} /> <span className="opacity-50">Cache</span> Patched queryData (likes: {likes})
              </motion.div>
            )}
            
            {state === 'fetching' && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-blue-400">
                <Server size={12} /> <span className="opacity-50">Network</span> GET /api/post/1
              </motion.div>
            )}

            {state === 'success' && !optimistic && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={12} /> <span className="opacity-50">Cache</span> Query updated. State fresh.
              </motion.div>
            )}
            
            {state === 'stale' && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-yellow-400">
                <Server size={12} /> <span className="opacity-50">Cache</span> Data stale. Ready for refetch.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}