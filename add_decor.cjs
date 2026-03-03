const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Hero
if (!c.includes('<TechBackdrop />')) {
  c = c.replace(
    '          id="home"',
    '          id="home" className="space-y-8 relative z-10"'
  );
  c = c.replace(
    '<motion.section\n          id="home" className="space-y-8 relative z-10"\n          initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}\n        >',
    '<motion.section\n          id="home"\n          className="space-y-8 relative z-10"\n          initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}\n        >\n          <TechBackdrop />\n          <FloatingGlyph Icon={Cpu} className="top-10 right-10" />\n'
  );
  
  // Actually, wait, let's do a more robust replace for hero
  c = c.replace(
    '{/* HERO */}\n        <motion.section\n          id="home"\n          className="space-y-8"',
    '{/* HERO */}\n        <motion.section\n          id="home"\n          className="space-y-8 relative z-10"'
  );
  
  c = c.replace(
    '<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-gray-400 mb-4 tracking-widest backdrop-blur-md">',
    '<TechBackdrop /><FloatingGlyph Icon={Cpu} className="top-10 right-[5%] text-blue-500" />\n          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-gray-400 mb-4 tracking-widest backdrop-blur-md">'
  );
}

// 2. Add CornerBrackets and Scanline to Project Cards
// In App.tsx, the project cards are inside: className="group block relative p-6 md:p-8 rounded-3xl bg-[#0a0a0a]/80..." 
if (!c.includes('<CornerBrackets />')) {
  c = c.replaceAll(
    'className="group block relative p-6 md:p-8 rounded-3xl bg-[#0a0a0a]',
    'className="group block overflow-hidden relative p-6 md:p-8 rounded-3xl bg-[#0a0a0a]'
  );
  
  c = c.replaceAll(
    '<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>',
    '<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>\n                <CornerBrackets />\n                <ScanLine />\n'
  );
}

// 3. Stack section
if (!c.includes('<FloatingGlyph Icon={Layers}')) {
  c = c.replace(
    '{/* STACK */}\n        <section id="stack" className="space-y-12 relative z-10">',
    '{/* STACK */}\n        <section id="stack" className="space-y-12 relative z-10">\n          <FloatingGlyph Icon={Layers} className="bottom-0 left-10 text-purple-500" />\n'
  );
}

// 4. Contact section
if (!c.includes('<FloatingGlyph Icon={Terminal}')) {
  c = c.replace(
    'id="ai-pipeline" className="space-y-12 relative z-10 py-24 border-t border-white/5 mt-20"',
    'id="ai-pipeline" className="space-y-12 relative z-10 py-24 border-t border-white/5 mt-20 overflow-hidden"'
  );
  
  c = c.replace(
    '{/* AI PIPELINE SELLING POINT */}\n        <section id="ai-pipeline"',
    '{/* AI PIPELINE SELLING POINT */}\n        <section id="ai-pipeline"'
  );
  
  c = c.replace(
    '<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{i18n.language === "ru" ? "AI Pipeline Разработки" : "AI Dev Pipeline"}</h2>',
    '<FloatingGlyph Icon={Terminal} className="-top-10 right-20 text-cyan-500" />\n              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{i18n.language === "ru" ? "AI Pipeline Разработки" : "AI Dev Pipeline"}</h2>'
  );
}

fs.writeFileSync('src/App.tsx', c);
console.log('Decor injected');
