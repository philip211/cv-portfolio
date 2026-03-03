import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Database, Server, Smartphone, Zap, ShieldAlert, Layers } from 'lucide-react';

const NODES = [
  { id: 'client', icon: Smartphone, label: 'React / WebApp', x: 20, y: 50, color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-500/10', desc: "Optimistic UI, Zustand state, premium micro-interactions." },
  { id: 'gateway', icon: Layers, label: 'Nginx / Gateway', x: 40, y: 50, color: 'text-purple-400', border: 'border-purple-500/50', bg: 'bg-purple-500/10', desc: "Rate limiting, SSL termination, request routing." },
  { id: 'api', icon: Server, label: 'NestJS / Node', x: 60, y: 35, color: 'text-green-400', border: 'border-green-500/50', bg: 'bg-green-500/10', desc: "Business logic, Drizzle ORM schemas, strict DTOs." },
  { id: 'ws', icon: Zap, label: 'Socket.io', x: 60, y: 65, color: 'text-yellow-400', border: 'border-yellow-500/50', bg: 'bg-yellow-500/10', desc: "Realtime events, room synchronization, deterministic state." },
  { id: 'db', icon: Database, label: 'PostgreSQL', x: 80, y: 35, color: 'text-indigo-400', border: 'border-indigo-500/50', bg: 'bg-indigo-500/10', desc: "ACID compliance, relational data, secure migrations." },
  { id: 'redis', icon: Database, label: 'Redis', x: 80, y: 65, color: 'text-red-400', border: 'border-red-500/50', bg: 'bg-red-500/10', desc: "Pub/Sub layer, session cache, high-speed ephemeral data." },
  { id: 'sentry', icon: ShieldAlert, label: 'Sentry', x: 60, y: 15, color: 'text-gray-400', border: 'border-gray-500/50', bg: 'bg-gray-500/10', desc: "Error tracking, transaction tracing, reliable monitoring." },
];

const CONNECTIONS = [
  { id: 'c1', from: 'client', to: 'gateway', type: 'http' },
  { id: 'c2', from: 'client', to: 'ws', type: 'ws' },
  { id: 'c3', from: 'gateway', to: 'api', type: 'http' },
  { id: 'c4', from: 'api', to: 'db', type: 'db' },
  { id: 'c5', from: 'api', to: 'redis', type: 'db' },
  { id: 'c6', from: 'ws', to: 'redis', type: 'ws' },
  { id: 'c7', from: 'api', to: 'sentry', type: 'infra' },
];

export function SystemMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'ws' | 'http' | null>(null);
  const [pulses, setPulses] = useState<{id: number, path: string}[]>([]);

  useEffect(() => {
    if (!activeMode) return;

    const interval = setInterval(() => {
      const paths = activeMode === 'ws' ? ['c2', 'c6'] : ['c1', 'c3', 'c4', 'c5', 'c7'];
      const randomPath = paths[Math.floor(Math.random() * paths.length)];
      const newPulse = { id: Date.now() + Math.random(), path: randomPath };
      setPulses(p => [...p, newPulse]);
      setTimeout(() => {
        setPulses(p => p.filter(pulse => pulse.id !== newPulse.id));
      }, 2000);
    }, activeMode === 'ws' ? 300 : 800);

    return () => clearInterval(interval);
  }, [activeMode]);

  return (
    <div className="relative w-full aspect-square md:aspect-[2/1] bg-[#05070A] border border-white/10 rounded-3xl overflow-hidden group shadow-2xl">

      {/* Background grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34h-58.34l-.83-.83L54.627 0zM36.19 0l.83.83v39.903h-39.902l-.83-.83L36.19 0zM17.753 0l.83.83v21.466h-21.465l-.83-.83L17.753 0z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      {/* Ambient glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none transition-all duration-1000 ${
        activeMode === 'ws' ? 'bg-yellow-500/20' : activeMode === 'http' ? 'bg-blue-500/20' : 'bg-blue-500/10'
      }`}></div>

      <div className="absolute inset-0 overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className="relative w-full h-full min-w-[700px]">

          {/* SVG lines — viewBox 0 0 100 100 so node x/y coords map directly */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <linearGradient id="line-ws" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="rgba(250,204,21,0.2)" />
                <stop offset="1" stopColor="rgba(250,204,21,0.6)" />
              </linearGradient>
              <linearGradient id="line-http" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="rgba(96,165,250,0.2)" />
                <stop offset="1" stopColor="rgba(96,165,250,0.6)" />
              </linearGradient>
            </defs>

            {/* Static connection lines */}
            {CONNECTIONS.map((c) => {
              const fromNode = NODES.find(n => n.id === c.from)!;
              const toNode = NODES.find(n => n.id === c.to)!;
              const isActive = (activeMode === 'ws' && c.type === 'ws') || (activeMode === 'http' && c.type !== 'ws');
              const mx = (fromNode.x + toNode.x) / 2;
              return (
                <path
                  key={c.id}
                  d={`M ${fromNode.x} ${fromNode.y} C ${mx} ${fromNode.y}, ${mx} ${toNode.y}, ${toNode.x} ${toNode.y}`}
                  fill="none"
                  stroke={isActive ? (c.type === 'ws' ? 'url(#line-ws)' : 'url(#line-http)') : 'rgba(255,255,255,0.05)'}
                  strokeWidth={isActive ? 0.4 : 0.2}
                  className="transition-all duration-500"
                />
              );
            })}

            {/* Animated pulses */}
            <AnimatePresence>
              {pulses.map(pulse => {
                const c = CONNECTIONS.find(con => con.id === pulse.path)!;
                const fromNode = NODES.find(n => n.id === c.from)!;
                const toNode = NODES.find(n => n.id === c.to)!;
                const isWs = c.type === 'ws';
                const mx = (fromNode.x + toNode.x) / 2;
                return (
                  <motion.circle
                    key={pulse.id}
                    r={isWs ? "0.8" : "0.6"}
                    fill={isWs ? "#FACC15" : "#60A5FA"}
                    style={{ filter: `drop-shadow(0 0 2px ${isWs ? '#FACC15' : '#60A5FA'})` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                  >
                    <animateMotion
                      dur="1.5s"
                      fill="freeze"
                      path={`M ${fromNode.x} ${fromNode.y} C ${mx} ${fromNode.y}, ${mx} ${toNode.y}, ${toNode.x} ${toNode.y}`}
                    />
                  </motion.circle>
                );
              })}
            </AnimatePresence>
          </svg>

          {/* Nodes */}
          {NODES.map((node) => {
            const Icon = node.icon;
            const isHovered = activeNode === node.id;
            const isRelatedToWs = activeMode === 'ws' && ['client', 'ws', 'redis'].includes(node.id);
            const isRelatedToHttp = activeMode === 'http' && !['ws'].includes(node.id);
            const isActive = isHovered || isRelatedToWs || isRelatedToHttp;

            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 cursor-pointer z-10"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId={`focus-${node.id}`}
                      className={`absolute -inset-3 rounded-2xl opacity-40 blur-md ${node.bg}`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center bg-[#05070A] transition-all duration-300 relative z-20 ${
                      isActive ? `${node.border} shadow-[0_0_25px_rgba(255,255,255,0.1)]` : 'border-white/10'
                    }`}
                  >
                    <Icon className={`${isActive ? node.color : 'text-gray-500'} transition-colors duration-300`} size={24} />
                  </motion.div>
                </div>

                <div className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg border transition-all duration-300 backdrop-blur-md ${
                  isActive ? `bg-black/60 ${node.border} text-white` : 'bg-black/40 border-white/5 text-gray-500'
                }`}>
                  {node.label}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[400px] p-5 bg-[#0A0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl pointer-events-none text-left z-30 shadow-2xl"
          >
            {NODES.map(n => n.id === activeNode && (
              <div key={n.id}>
                <h4 className={`text-base font-bold mb-2 flex items-center gap-2 ${n.color}`}>
                  <n.icon size={18} /> {n.label}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-normal">{n.desc}</p>
                <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                  <span className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-1 rounded">STATUS: ONLINE</span>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">LATENCY: &lt;1ms</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Modes */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-30">
        <button
          onClick={() => setActiveMode(activeMode === 'ws' ? null : 'ws')}
          className={`text-[10px] font-mono tracking-widest uppercase border px-4 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
            activeMode === 'ws' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.2)]' : 'border-white/10 bg-black/40 hover:bg-white/10 text-gray-400'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${activeMode === 'ws' ? 'bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-gray-600'} transition-all`}></div>
          <span>Realtime Stream</span>
        </button>

        <button
          onClick={() => setActiveMode(activeMode === 'http' ? null : 'http')}
          className={`text-[10px] font-mono tracking-widest uppercase border px-4 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
            activeMode === 'http' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-white/10 bg-black/40 hover:bg-white/10 text-gray-400'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${activeMode === 'http' ? 'bg-blue-400 shadow-[0_0_10px_#3b82f6] animate-pulse' : 'bg-gray-600'} transition-all`}></div>
          <span>API Load Test</span>
        </button>
      </div>

    </div>
  );
}
