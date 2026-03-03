import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Activity, TerminalSquare, Zap, Server } from 'lucide-react';

export function RealtimePlayground() {
  const [users, setUsers] = useState<{ id: number; r: number; active: boolean }[]>([]);
  const [latency, setLatency] = useState(50);
  const [isDeterministic, setIsDeterministic] = useState(true);
  const [logs, setLogs] = useState<{ id: number, text: string, type: 'join'|'sync'|'msg'|'warn' }[]>([]);

  const addLog = (text: string, type: 'join'|'sync'|'msg'|'warn') => {
    setLogs(prev => {
      const newLogs = [...prev, { id: Date.now() + Math.random(), text, type }];
      if (newLogs.length > 5) return newLogs.slice(1);
      return newLogs;
    });
  };

  const handleJoin = () => {
    if (users.length >= 8) return;
    const newUser = { id: Date.now(), r: Math.random() * 360, active: true };
    setUsers(prev => [...prev, newUser]);
    addLog(`User_${newUser.id.toString().slice(-4)} joined room`, 'join');
  };

  const fireEvent = () => {
    if (users.length === 0) return;
    
    // Server emits event
    addLog(`Server resolving action (lag: ${latency}ms)...`, 'sync');
    
    users.forEach(u => {
      const wait = isDeterministic ? latency : (latency + Math.random() * 150);
      
      setTimeout(() => {
        setUsers(prev => prev.map(user => 
          user.id === u.id ? { ...user, r: user.r + 45 } : user
        ));
      }, wait);
    });

    if (!isDeterministic) {
      setTimeout(() => addLog("State drift detected (no lockstep)", 'warn'), latency + 100);
    } else {
      setTimeout(() => addLog("All clients synced on tick #9381", 'msg'), latency + 50);
    }
  };

  return (
    <div className="relative w-full p-8 bg-[#05070a]/90 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Control Panel */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <Zap className="text-yellow-400" size={20} />
              Realtime Playground
            </h3>
            <p className="text-sm text-gray-400">WebSockets, lockstep sync, and determinism visualization.</p>
          </div>

          <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Network Latency</span>
              <span className="text-xs font-mono text-yellow-400">{latency}ms</span>
            </div>
            <input 
              type="range" min="10" max="300" step="10" 
              value={latency} onChange={(e) => setLatency(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Deterministic Engine</div>
              <button 
                onClick={() => setIsDeterministic(!isDeterministic)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isDeterministic ? 'bg-yellow-500' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isDeterministic ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleJoin} disabled={users.length >= 8} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold font-mono uppercase tracking-widest rounded-xl transition border border-white/10 flex justify-center items-center gap-2">
              <Wifi size={14} /> Join
            </button>
            <button onClick={fireEvent} disabled={users.length === 0} className="flex-1 py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-xs font-bold font-mono uppercase tracking-widest rounded-xl transition border border-yellow-500/30 flex justify-center items-center gap-2">
              <Activity size={14} /> Fire Sync
            </button>
          </div>

          <div className="h-32 bg-black/50 rounded-xl border border-white/5 p-3 overflow-y-auto flex flex-col justify-end font-mono text-[10px]">
            <AnimatePresence>
              {logs.map(log => (
                <motion.div 
                  key={log.id} 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className={`py-1 flex items-center gap-2 ${
                    log.type === 'join' ? 'text-gray-400' : 
                    log.type === 'sync' ? 'text-blue-400' : 
                    log.type === 'warn' ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  <TerminalSquare size={10} className="shrink-0 opacity-50" />
                  {log.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Visualization Area */}
        <div className="flex items-center justify-center p-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] rounded-2xl border border-white/5 relative min-h-[300px]">
          <div className="relative w-48 h-48 rounded-full border border-dashed border-white/20 flex items-center justify-center">
            {/* Server Central Node */}
            <div className={`w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-colors ${users.length > 0 ? 'border-yellow-400/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : ''}`}>
              <Server size={14} className="text-white/50" />
            </div>

            {/* Orbiting Users */}
            <AnimatePresence>
              {users.map((u, i) => {
                const angle = (i * (360 / users.length)) * (Math.PI / 180);
                const x = Math.cos(angle) * 100;
                const y = Math.sin(angle) * 100;

                return (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute z-20 flex flex-col items-center"
                    style={{ marginLeft: -16, marginTop: -16 }} // center offset (32px / 2)
                  >
                    <motion.div 
                      animate={{ rotate: u.r }}
                      transition={{ 
                        type: isDeterministic ? "spring" : "tween",
                        stiffness: isDeterministic ? Math.max(10, 300 - latency) : undefined,
                        duration: isDeterministic ? undefined : latency / 1000 + 0.2
                      }}
                      className="w-8 h-8 rounded-full bg-[#0a0d14] border border-white/20 flex items-center justify-center relative overflow-hidden"
                    >
                      <div className="absolute top-0 w-full h-1/2 bg-yellow-500/20"></div>
                      <div className="w-[2px] h-[2px] rounded-full bg-yellow-400 z-10 absolute top-1"></div>
                    </motion.div>

                    {/* Ping Indicator */}
                    <div className="absolute -bottom-5 text-[8px] font-mono text-gray-500 whitespace-nowrap bg-black/50 px-1 rounded">
                      uid_{u.id.toString().slice(-2)}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}