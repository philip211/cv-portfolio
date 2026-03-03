import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export function FloatingGlyph({
  Icon,
  className = '',
}: {
  Icon: LucideIcon;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={'pointer-events-none absolute opacity-[0.06] ' + className}
      animate={reduce ? undefined : { y: [0, -12, 0], rotate: [0, 3, 0] }}
      transition={
        reduce
          ? undefined
          : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      <Icon size={120} />
    </motion.div>
  );
}

export function TechBackdrop({
  orbColor1 = 'rgba(36,171,221,.15)',
  orbColor2 = 'rgba(30,114,147,.12)',
}: {
  orbColor1?: string;
  orbColor2?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* glow orbs */}
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${orbColor1}, transparent 60%)`,
        }}
      />
      <div
        className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full blur-3xl opacity-60"
        style={{
          background: `radial-gradient(circle, ${orbColor2}, transparent 60%)`,
        }}
      />
      {/* micro dots floating */}
      <motion.div
         className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-20"
         animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }}
         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
         className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-20"
         animate={{ y: [0, 30, 0], opacity: [0.1, 0.5, 0.1] }}
         transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
         className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-10"
         animate={{ y: [0, -15, 0], opacity: [0.05, 0.3, 0.05] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

export function ScanLine() {
  return (
    <motion.div
      className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent pointer-events-none z-20"
      animate={{ x: ['-200%', '1000%'] }}
      transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
      style={{ left: 0 }}
    />
  );
}

export function CornerBrackets() {
  return (
    <>
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/30 rounded-tl-sm pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-blue-500/30 rounded-tr-sm pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-blue-500/30 rounded-bl-sm pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 rounded-br-sm pointer-events-none"></div>
    </>
  );
}
