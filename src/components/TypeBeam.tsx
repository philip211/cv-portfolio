import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Database, Server, Smartphone, AlertTriangle, CheckCircle2, Braces } from 'lucide-react';

const NODES = [
  { 
    id: 'db', 
    icon: Database, 
    name: 'Drizzle Schema', 
    type: 'typeof users.$inferSelect',
    code: `const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  role: enum('roles', ['admin', 'user'])
});`
  },
  { 
    id: 'api', 
    icon: Server, 
    name: 'tRPC / Nest DTO', 
    type: 'UserPayloadDTO',
    code: `export class UserPayloadDTO {
  @IsUUID() id: string;
  @IsEmail() email: string;
  @IsEnum(Role) role: Role;
}`
  },
  { 
    id: 'ui', 
    icon: Smartphone, 
    name: 'React UI', 
    type: 'Props = { user: User }',
    code: `const UserProfile = ({ user }: Props) => {
  // Autocomplete: user.email ✓
  return <div>{user.email}</div>;
};`
  }
];

export function TypeBeam() {
  const [broken, setBroken] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const toggleBreak = () => {
    if (broken) return;
    setBroken(true);
    setHoveredNode(null);
    setTimeout(() => {
      setFixing(true);
      setTimeout(() => {
        setBroken(false);
        setFixing(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="relative w-full p-6 md:p-8 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden group min-h-[400px]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]"></div>

      <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between mb-16 gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          End-to-End Type Safety
          {!broken && !fixing && <span className="flex items-center gap-1 text-[10px] font-mono tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]"><CheckCircle2 size={12}/> 100% TYPED</span>}
          {broken && !fixing && <span className="flex items-center gap-1 text-[10px] font-mono tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded shadow-[0_0_10px_rgba(239,68,68,0.2)]"><AlertTriangle size={12}/> TYPE ERROR</span>}
          {fixing && <span className="flex items-center gap-1 text-[10px] font-mono tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-1 rounded shadow-[0_0_10px_rgba(234,179,8,0.2)]"><div className="w-2 h-2 border-t-2 border-yellow-400 rounded-full animate-spin"></div> RECONCILING</span>}
        </h3>
        
        <button 
          onClick={toggleBreak}
          disabled={broken}
          className={`relative overflow-hidden text-xs font-mono tracking-widest uppercase px-6 py-3 rounded-xl transition-all border outline-none ${
            broken ? 'bg-red-500/10 text-red-400 border-red-500/30 opacity-50 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
          }`}
        >
          {!broken && <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>}
          {broken ? 'Pipeline Broken' : 'Inject Error Type'}
        </button>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between mt-8 mb-8 pb-4 w-full px-4 md:px-12 gap-12 md:gap-0">
        
        {/* Connection Line & Particles */}
        <div className="absolute top-[28px] md:top-[23px] left-[50%] md:left-[10%] right-[50%] md:right-[10%] h-[100%] md:h-1 w-1 md:w-auto bg-white/5 rounded-full z-0 pointer-events-none"></div>
        
        {!broken && (
          <div className="absolute top-[28px] md:top-[23px] left-[50%] md:left-[10%] right-[50%] md:right-[10%] h-[100%] md:h-1 w-1 md:w-auto z-10 pointer-events-none overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 hidden md:block h-full md:h-1 w-full md:w-[150px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#34d399]"
              initial={{ x: '-100%' }}
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute top-0 bottom-0 left-0 block md:hidden h-[150px] w-full bg-gradient-to-b from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#34d399]"
              initial={{ y: '-100%' }}
              animate={{ y: ['-100%', '300%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {broken && (
          <div className="absolute top-[28px] md:top-[23px] left-[50%] md:left-[10%] right-[50%] md:right-[10%] h-[100%] md:h-1 w-1 md:w-auto bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#ef4444] rounded-full z-10 animate-pulse pointer-events-none"></div>
        )}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <div 
            key={node.id} 
            className="relative z-20 flex flex-col items-center group/node cursor-pointer px-4"
            onMouseEnter={() => !broken && setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div 
              whileHover={!broken ? { scale: 1.1, y: -5 } : {}}
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 transition-all duration-300 shadow-lg ${
              broken && i === 1 ? 'bg-red-500/10 border-red-500/50 text-red-400 animate-[wiggle_0.3s_infinite]' : 
              'bg-[#0a0d14] border-white/10 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:bg-emerald-900/20'
            }`}>
              {broken && i === 1 ? <AlertTriangle size={24} className="animate-pulse" /> : <node.icon size={24} />}
            </motion.div>
            <div className="text-sm font-bold text-white mb-2 tracking-tight">{node.name}</div>
            <div className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">{node.type}</div>
            
            {/* Popout Code Snippet */}
            <AnimatePresence>
              {hoveredNode === node.id && !broken && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 md:w-80 bg-[#07090e] border border-white/10 p-4 rounded-xl shadow-2xl z-50 pointer-events-none hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2 text-gray-300">
                    <Braces size={14} className="text-blue-400" />
                    <span className="text-xs font-mono">type_definition.ts</span>
                  </div>
                  <pre className="text-xs md:text-sm font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed bg-black/50 p-3 rounded-lg border border-emerald-900/30">
                    {node.code}
                  </pre>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#07090e] border-l border-t border-white/10 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {broken && i === 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-full mt-4 bg-red-950 border border-red-500/50 text-red-200 p-3 rounded-xl z-30 shadow-[0_0_30px_rgba(239,68,68,0.2)] md:w-64"
              >
                <div className="text-xs font-mono font-bold flex items-center gap-2"><AlertTriangle size={14}/> TS2322: Type Error</div>
                <div className="text-xs mt-1 opacity-80">Type 'string' is not assignable to type 'number'. Check DTO validation boundaries.</div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}