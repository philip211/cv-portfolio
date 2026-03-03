import { useEffect, useState } from 'react';
import { Download, Github, Linkedin, Mail, MessageCircle, GitPullRequest, ChevronRight, Terminal, Layers, Cpu, Zap, Send, GraduationCap, X, Bot, Globe } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { TechBackdrop, FloatingGlyph, CornerBrackets, ScanLine } from './components/Decor';
import { BootSequence } from './components/BootSequence';
import { SystemMap } from './components/SystemMap';
import { TypeBeam } from './components/TypeBeam';
import { QueryStates } from './components/QueryStates';
import { SentryStory } from './components/SentryStory';
import { RealtimePlayground } from './components/RealtimePlayground';
import { CustomCursor } from './components/CustomCursor';
import { TiltWrapper } from './components/TiltWrapper';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [booting, setBooting] = useState(true);
  const [isMafiaModalOpen, setIsMafiaModalOpen] = useState(false);
  const [isNoirModalOpen, setIsNoirModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  // If page loads already scrolled — skip entry animations so content is immediately visible
  const [skipEnterAnim] = useState(() => window.scrollY > 80);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Сообщение с CV от ${formData.name}`);
    const body = encodeURIComponent(`Имя: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:princovgreshnik@gmail.com?subject=${subject}&body=${body}`);
    setFormStatus('sent');
    setFormData({ name: '', email: '', message: '' });
  };

  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fade-up animation variant — disabled if page loaded already scrolled
  const fadeUp = skipEnterAnim
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="relative min-h-screen bg-[#030303] text-gray-300 selection:bg-blue-500/30 selection:text-white pb-32 font-sans font-light overflow-hidden cursor-none">
      <CustomCursor />
      {booting && <BootSequence onComplete={() => setBooting(false)} />}
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      
      {/* BACKGROUND NEON GLOWS - Sci-Fi / Cyber vibe */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#4f46e5]/10 blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="fixed top-[40%] left-[50%] translate-x-[-50%] w-[1000px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none mix-blend-screen"></div>

      {/* NOISE OVERLAY for cinematic feel */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* FLOATING NAV PILL (Super Convenient Navigation) */}
      <AnimatePresence>
        {!booting && (
          <motion.nav 
            initial={{ y: -50, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-4 left-1/2 z-50 transition-all duration-500 w-[95%] md:w-auto ${scrolled ? 'mt-0' : 'mt-2'}`}
          >
            <div className="flex items-center justify-between md:justify-center gap-2 md:gap-6 px-3 py-2.5 md:px-8 md:py-4 rounded-full border border-white/10 bg-[#030303]/60 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              
              {/* Mobile: dot logo */}
              <div className="flex md:hidden items-center gap-1.5 font-bold tracking-widest text-white/80 text-[9px] shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="hidden xs:inline">{t('nav.cv')}</span>
              </div>

              {/* Nav links: hidden on smallest screens, scrollable strip on sm+ */}
              <div className="hidden sm:flex gap-3 md:gap-8 overflow-x-auto hide-scrollbar text-[9px] md:text-xs font-bold tracking-[0.15em] md:tracking-[0.2em] text-gray-400 uppercase items-center scroll-smooth snap-x">
                <a href="#home" className="hover:text-blue-400 transition-colors whitespace-nowrap snap-start">{t('nav.home')}</a>
                <a href="#projects" className="hover:text-blue-400 transition-colors whitespace-nowrap snap-start">{t('nav.work')}</a>
                <a href="#stack" className="hover:text-purple-400 transition-colors whitespace-nowrap snap-start">{t('nav.stack')}</a>
                <a href="#experience" className="hover:text-cyan-400 transition-colors whitespace-nowrap snap-start">{t('nav.path')}</a>
                <a href="#ai-pipeline" className="hover:text-emerald-400 transition-colors whitespace-nowrap snap-start hidden md:inline">{t('nav.ai_pipeline')}</a>
              </div>

              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-[9px] md:text-xs font-bold"
                  title="Toggle Language"
                >
                  <Globe size={12} />
                  <span className="hidden sm:inline">{i18n.language.toUpperCase()}</span>
                </button>
                <a href="#contact" className="px-3 md:px-4 py-1.5 md:py-2 bg-white text-black hover:scale-105 border border-white/20 text-[9px] md:text-xs tracking-wider font-extrabold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] whitespace-nowrap">
                  {t('nav.talk')}
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* STATUS BAR (Top) */}
      <div className="fixed top-0 w-full z-40 bg-blue-500/[0.03] text-center pt-24 flex justify-center pointer-events-none hidden md:flex">
        <div className="border border-blue-500/20 bg-[#030303]/50 backdrop-blur-md px-4 py-1 rounded-b-xl text-[10px] text-blue-400 font-mono tracking-[0.2em] shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          {i18n.language === "ru" ? "СТАТУС: ОНЛАЙН • ГОТОВ К РАБОТЕ" : "STATUS: ONLINE • READY FOR DEPLOYMENT"}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-48 space-y-40 relative z-10">
        
        {/* HERO */}
        <motion.section 
          id="home" className="space-y-8 relative z-10"
          initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}
        >
          <TechBackdrop /><FloatingGlyph Icon={Cpu} className="top-10 right-[5%] text-blue-500" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-gray-400 mb-4 tracking-widest backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
            </span>
            {t('hero.status')}
          </motion.div>

          <TiltWrapper>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.05] relative z-10 cursor-default">
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="block">{t('hero.title1')}</motion.span>
              </span>
              <span className="block overflow-hidden pb-4">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  {t('hero.title2')}
                </motion.span>
              </span>
            </h1>
          </TiltWrapper>
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex items-center gap-3 text-sm md:text-base text-blue-400 font-mono tracking-tight bg-blue-500/[0.05] border border-blue-500/10 p-4 rounded-xl inline-block hover:bg-blue-500/[0.1] transition-colors relative z-10 cursor-default">
            <Terminal size={16} /> {t('hero.stack')}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }} className="text-gray-400 text-lg leading-relaxed max-w-2xl font-normal relative z-10">
            {t('hero.desc1')}<br/><br/>
            <strong className="text-gray-200 font-semibold bg-white/[0.05] px-2 py-0.5 rounded shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] border border-white/10">{t('hero.desc2')}</strong><br/>
            {t('hero.desc3')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="flex flex-wrap gap-4 pt-6 relative z-10">
            <a href="/resume.pdf" download="Philip-Resume.pdf" className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              {t('hero.download_cv')} <Download size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#projects" className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300">
               {t('hero.case_studies')} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="flex gap-6 pt-10 pb-4 text-gray-500 relative z-10">
            <a href="https://github.com/philip211" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/[0.02] rounded-full border border-white/[0.05] hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"><Github size={22}/></a>
            <a href="https://www.linkedin.com/in/philip-mukovozchyk-944331267/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/[0.02] rounded-full border border-white/[0.05] hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"><Linkedin size={22}/></a>
            <a href="https://t.me/GRESCNIK" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/[0.02] rounded-full border border-white/[0.05] hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"><MessageCircle size={22}/></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=princovgreshnik@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/[0.02] rounded-full border border-white/[0.05] hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"><Mail size={22}/></a>
          </motion.div>
          
          {/* HUD METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-md">
            <div className="p-6 bg-[#030303]/60 rounded-xl text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-3xl text-white font-bold mb-1 tracking-tighter relative z-10">3+</div> 
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block relative z-10">{t('metrics.shipped')}</div>
            </div>
            <div className="p-6 bg-[#030303]/60 rounded-xl text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-3xl text-white font-bold mb-1 tracking-tighter relative z-10">5</div> 
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block relative z-10">{t('metrics.prod_releases')}</div>
            </div>
            <div className="p-6 bg-[#030303]/60 rounded-xl text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-3xl text-white font-bold mb-1 tracking-tighter relative z-10">100<span className="text-emerald-500 text-lg">%</span></div> 
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block relative z-10">{t('metrics.ux_focus')}</div>
            </div>
            <div className="p-6 bg-[#030303]/60 rounded-xl text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-orange-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-3xl text-blue-400 font-bold mb-1 tracking-tighter relative z-10">&infin;</div> 
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block relative z-10">{t('metrics.realtime')}</div>
            </div>
          </div>
        </motion.section>

        {/* WHY ME */}
        <section id="proof" className="space-y-12 shrink-0">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
              <Layers className="text-blue-500" size={36} /> {t('competencies.title')}
            </h2>
            <p className="text-gray-500 font-mono mt-2">{t('competencies.subtitle')}</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300 group overflow-hidden relative">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500 group-hover:shadow-[0_0_12px_rgba(59,130,246,1)] transition-shadow duration-300"></div> {t('competencies.item1_title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{t('competencies.item1_desc')}</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300 group overflow-hidden relative">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-500 group-hover:shadow-[0_0_12px_rgba(168,85,247,1)] transition-shadow duration-300"></div> {t('competencies.item2_title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{t('competencies.item2_desc')}</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300 group overflow-hidden relative">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:shadow-[0_0_12px_rgba(16,185,129,1)] transition-shadow duration-300"></div> {t('competencies.item3_title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{t('competencies.item3_desc')}</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.05] hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-300 group overflow-hidden relative">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500 group-hover:shadow-[0_0_12px_rgba(249,115,22,1)] transition-shadow duration-300"></div> {t('competencies.item4_title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{t('competencies.item4_desc')}</p>
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="space-y-8 max-w-4xl relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            {t('about.title1')}<br/><span className="text-gray-500">{t('about.title2')}</span>
          </motion.h2>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-400 space-y-6 text-lg leading-relaxed bg-white/[0.02] p-8 md:p-10 rounded-3xl border border-white/[0.05] backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none"></div>

            <p>{t('about.p1')}</p>
            
            <p>{t('about.p2')}</p>
            
            <p className="text-white font-medium">{t('about.p3_1')} <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded ml-1 tracking-tight">{t('about.p3_2')}</span></p>
            
            <p>{t('about.p4_1')} <span className="font-mono text-sm text-blue-400">{t('about.p4_2')}</span></p>
            
            <div className="pt-6 mt-6 border-t border-white/[0.05]">
              <p className="font-bold text-white text-xl flex items-start gap-4">
                <span className="text-blue-500 shrink-0 mt-1"><Terminal size={24}/></span>
                <span>{t('hero.subtext')}</span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* PROOF */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-900/10 via-black/20 to-indigo-900/10 p-8 md:p-12 rounded-3xl border border-white/[0.05] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.05)] relative z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBMMCA0MEw0MCA0MEw0MCAwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-50"></div>
          
          <h2 className="text-2xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
            <Zap className="text-blue-500" /> {i18n.language === "ru" ? "Что вы получаете со мной:" : "What you get with me:"}
          </h2>
          <div className="space-y-6 relative z-10">
            {[
              { s: '01', t: t('hero.f1_title'), d: t('hero.f1_desc') },
              { s: '02', t: t('hero.f2_title'), d: t('hero.f2_desc') },
              { s: '03', t: t('hero.f3_title'), d: t('hero.f3_desc') },
              { s: '04', t: t('hero.f4_title'), d: t('hero.f4_desc') },
              { s: '05', t: t('hero.f5_title'), d: t('hero.f5_desc') }
            ].map((item, i) => (
              <motion.div 
                key={item.s}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                className="flex gap-6 items-center group pb-4 border-b border-white/[0.02] last:border-0 last:pb-0"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-mono font-bold text-lg border border-blue-500/20 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  {item.s}
                </div>
                <div>
                  <dt className="text-white font-bold text-lg group-hover:text-blue-200 transition-colors uppercase tracking-wide">{item.t}</dt>
                  <dd className="text-gray-500 font-mono text-xs mt-1">{item.d}</dd>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center text-sm font-mono text-blue-400 bg-blue-500/10 py-3 rounded-xl border border-blue-500/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.15)] relative z-10">
            &gt; No chaos. No spaghetti. Just clean systems and premium UX.
          </div>
        </motion.section>

        {/* ARCHITECTURE & TYPE-SAFETY */}
        <section id="architecture" className="space-y-16 relative z-10 pt-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span>{i18n.language === "ru" ? "Системная архитектура" : "System Architecture"}</span>
              <span className="text-[10px] font-mono tracking-widest text-blue-500 uppercase border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 rounded-lg flex items-center gap-2 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                {i18n.language === "ru" ? "Работающая система" : "Live Environment"}
              </span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent mt-6 mb-8"></div>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              {i18n.language === "ru" ? "Full-stack визуализация систем, которые я создаю. Я не просто пишу React-компоненты — я проектирую потоки данных, настраиваю real-time синхронизацию и закладываю фундамент для масштабирования." : "Full-stack visualization of the systems I build. I don't just write React components—I design the flow, handle real-time sync, and prepare for scale."}
            </p>
          </motion.div>

          <SystemMap />
          
          <div className="pt-8 space-y-8">
            <TypeBeam />
            <SentryStory />
          </div>
        </section>

        {/* FRONTEND EXPERTISE (TanStack, etc) */}
        <section id="frontend" className="space-y-16 relative z-10 pt-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span>{i18n.language === "ru" ? "Глубокое погружение (Инженерия)" : "Engineering Deep Dive"}</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-6 mb-8"></div>
          </motion.div>
          
          <div className="space-y-8">
            <RealtimePlayground />
            <QueryStates />
          </div>
        </section>

        {/* PROJECTS */}
        <motion.section 
          id="projects" className="space-y-16 shrink-0 relative z-10 pt-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{i18n.language === "ru" ? "Проекты" : "Projects"}</h2>
              <p className="text-blue-500 font-mono mt-2 tracking-widest uppercase text-sm">/ {i18n.language === "ru" ? "Детальные кейсы" : "Cinematic Cases"}</p>
            </div>
            <div className="text-xs font-mono text-gray-500 border border-white/10 px-3 py-1.5 rounded-md bg-white/[0.02]">
              {i18n.language === "ru" ? "СОРТИРОВКА: ВЛИЯНИЕ" : "SORT BY: IMPACT"}
            </div>
          </div>
          
          <div className="space-y-24">
            {/* Project 1 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="group flex flex-col md:flex-row gap-8 md:gap-12 pl-6 md:pl-0 border-l-2 md:border-l-0 border-blue-500/20 hover:border-blue-500 transition-colors relative">
              <div className="md:hidden absolute -left-[2px] top-0 w-0.5 h-0 bg-blue-500 group-hover:h-full transition-all duration-700"></div>
              
              <div className="md:w-1/3 space-y-4">
                <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 py-1.5 px-3 rounded-md tracking-widest uppercase inline-block mb-2">Multiplayer / WebSockets</span>
                <h3 className="text-3xl font-bold text-white group-hover:text-blue-200 transition-colors">{t('projects.p1.title1')}<br/>{t('projects.p1.title2')}</h3>
                <p className="text-gray-400 text-sm font-mono opacity-80">{t('projects.p1.desc')}</p>
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed pt-2">
                  <div className="flex items-center gap-2"><Cpu size={12}/> React / TS</div>
                  <div className="flex items-center gap-2 mt-1"><Zap size={12}/> {t('projects.p1.tech2')}</div>
                </div>
              </div>
              <div className="md:w-2/3 space-y-6 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-colors p-8 rounded-3xl border border-white/[0.05] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>
                <CornerBrackets />
                <ScanLine />
                
                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p1.problem_label')}</strong> {t('projects.p1.problem_text')}</div>
                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p1.build_label')}</strong> {t('projects.p1.build_text')}</div>
                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p1.impact_label')}</strong> {t('projects.p1.impact_text')}</div>
                
                <div className="flex flex-wrap gap-3 pt-6 relative z-10">
                  <button onClick={() => setIsMafiaModalOpen(true)} className="text-xs tracking-widest uppercase font-bold px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl transition shadow-[0_0_15px_rgba(255,255,255,0.1)] inline-block">{t('projects.p1.view_btn')}</button>
                  <a href="https://web.telegram.org/a/#7603243525" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase font-bold px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition text-white inline-block">{t('projects.p1.demo_btn')}</a>
                  <a href="#" className="text-xs tracking-widest uppercase font-bold px-4 py-3 hover:bg-white/5 rounded-xl transition text-gray-400 flex items-center gap-2 inline-flex"><GitPullRequest size={14}/> {t('projects.p1.repo_btn')}</a>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="group flex flex-col md:flex-row gap-8 md:gap-12 pl-6 md:pl-0 border-l-2 md:border-l-0 border-purple-500/20 hover:border-purple-500 transition-colors relative">
              <div className="md:hidden absolute -left-[2px] top-0 w-0.5 h-0 bg-purple-500 group-hover:h-full transition-all duration-700"></div>

              <div className="md:w-1/3 space-y-4">
                <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 py-1.5 px-3 rounded-md tracking-widest uppercase inline-block mb-2">{t('projects.p2.tag')}</span>
                <h3 className="text-3xl font-bold text-white group-hover:text-purple-200 transition-colors flex items-center gap-3 flex-wrap">{i18n.language === "en" ? "NOIR" : "НУАР"}<span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 py-1 px-2 rounded tracking-widest uppercase shadow-[0_0_10px_rgba(234,179,8,0.2)]">{t('projects.p2.wip')}</span>
                </h3>
                <p className="text-gray-400 text-sm font-mono opacity-80">{t('projects.p2.desc')}</p>
              </div>
              <div className="md:w-2/3 space-y-6 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-colors p-8 rounded-3xl border border-white/[0.05] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full"></div>

                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p2.problem_label')}</strong> {t('projects.p2.problem_text')}</div>
                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p2.build_label')}</strong> {t('projects.p2.build_text')}</div>
                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p2.impact_label')}</strong> {t('projects.p2.impact_text')}</div>
                
                <div className="flex flex-wrap gap-3 pt-6 relative z-10">
                  <button onClick={() => setIsNoirModalOpen(true)} className="text-xs tracking-widest uppercase font-bold px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl transition shadow-[0_0_15px_rgba(255,255,255,0.1)] inline-block">{t('projects.p1.view_btn')}</button>
                  <a href="https://web.telegram.org/a/#8497370919" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase font-bold px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition text-white inline-block">{t('projects.p2.review_btn')}</a>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="group flex flex-col md:flex-row gap-8 md:gap-12 pl-6 md:pl-0 border-l-2 md:border-l-0 border-emerald-500/20 hover:border-emerald-500 transition-colors relative">
               <div className="md:hidden absolute -left-[2px] top-0 w-0.5 h-0 bg-emerald-500 group-hover:h-full transition-all duration-700"></div>

              <div className="md:w-1/3 space-y-4">
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-1.5 px-3 rounded-md tracking-widest uppercase inline-block mb-2">Tooling / LLM</span>
                <h3 className="text-3xl font-bold text-white group-hover:text-emerald-200 transition-colors">{t('projects.p3.title1')}<br/>{t('projects.p3.title2')}</h3>
                <p className="text-gray-400 text-sm font-mono opacity-80">{t('projects.p3.desc')}</p>
              </div>
              <div className="md:w-2/3 space-y-6 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-colors p-8 rounded-3xl border border-white/[0.05] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>

                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p3.problem_label')}</strong> {t('projects.p3.problem_text')}</div>
                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p3.build_label')}</strong> {t('projects.p3.build_text')}</div>
                <div className="relative z-10"><strong className="text-white text-xs tracking-widest uppercase block mb-1 opacity-50">{t('projects.p3.impact_label')}</strong> {t('projects.p3.impact_text')}</div>
                
                <div className="flex flex-wrap gap-3 pt-6 relative z-10">
                  <button onClick={() => setIsAiModalOpen(true)} className="text-xs tracking-widest uppercase font-bold px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl transition shadow-[0_0_15px_rgba(255,255,255,0.1)]">{t('projects.p1.view_btn')}</button>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* STACK */}
        <section id="stack" className="space-y-12 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{i18n.language === "ru" ? "Технологический стек" : "Technology Stack"}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="p-8 bg-blue-500/[0.03] backdrop-blur-md border border-blue-500/20 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <h3 className="text-blue-400 font-bold mb-5 flex items-center gap-2 tracking-widest uppercase text-sm relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div> {i18n.language === "ru" ? "Основа (Ежедневно)" : "Core (Daily)"}
              </h3>
              <div className="flex flex-wrap gap-2 relative z-10">
                {['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'State management', 'API integration'].map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-blue-500/10 text-blue-200 border border-blue-500/30 rounded-full text-xs uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:bg-blue-500/20 transition-colors cursor-default">{t}</span>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="p-8 bg-purple-500/[0.03] backdrop-blur-md border border-purple-500/20 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-purple-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <h3 className="text-purple-400 font-bold mb-5 flex items-center gap-2 tracking-widest uppercase text-sm relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"></div> {i18n.language === "ru" ? "UI / Продукт" : "UI / Product"}
              </h3>
              <div className="flex flex-wrap gap-2 relative z-10">
                {['Design Systems', 'Responsive layout', 'Animations', 'UX details', 'Accessibility basics'].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-purple-500/10 text-purple-200 border border-purple-500/30 rounded-full text-xs uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(168,85,247,0.1)] hover:bg-purple-500/20 transition-colors cursor-default">{t}</span>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="p-8 bg-emerald-500/[0.03] backdrop-blur-md border border-emerald-500/20 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <h3 className="text-emerald-400 font-bold mb-5 flex items-center gap-2 tracking-widest uppercase text-sm relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div> {i18n.language === "ru" ? "Бэкенд (Full-stack)" : "Backend (Full-stack)"}
              </h3>
              <div className="flex flex-wrap gap-2 relative z-10">
                {['Node.js', 'REST', 'WebSockets', 'PostgreSQL', 'Redis', 'Auth flows'].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-200 border border-emerald-500/30 rounded-full text-xs uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:bg-emerald-500/20 transition-colors cursor-default">{t}</span>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="p-8 bg-yellow-500/[0.03] backdrop-blur-md border border-yellow-500/20 rounded-3xl shadow-[0_0_30px_rgba(234,179,8,0.05)] hover:shadow-[0_0_40px_rgba(234,179,8,0.1)] transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-yellow-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <h3 className="text-yellow-400 font-bold mb-5 flex items-center gap-2 tracking-widest uppercase text-sm relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-pulse"></div> {i18n.language === "ru" ? "Инструменты / Инженерия" : "Tooling / Engineering"}
              </h3>
              <div className="flex flex-wrap gap-2 relative z-10">
                {['Git', 'Docker basics', 'CI mindset', 'Monitoring mindset', 'Performance thinking'].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-yellow-500/10 text-yellow-200 border border-yellow-500/30 rounded-full text-xs uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(234,179,8,0.1)] hover:bg-yellow-500/20 transition-colors cursor-default">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* {t('experience_edu.title')} */}
        <section id="experience" className="space-y-24 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="space-y-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{t('experience_edu.title')}</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent mt-6 mb-12"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Experience Card */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-white/[0.05] hover:border-blue-500/20 hover:bg-white/[0.03] transition-all bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10 flex items-center gap-3">
                  {i18n.language === "ru" ? "Frontend Разработчик" : "Frontend Developer"}
                  <a href="https://www.linkedin.com/company/troodinc/" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 hover:text-blue-400 transition-all">
                    <Linkedin size={20} />
                  </a>
                </h3>
                <p className="text-gray-500 font-mono text-sm mb-4">{t('experience_edu.job_company').split('|')[0]}<span className="opacity-50">| {t('experience_edu.job_company').split('|')[1]}</span></p>
                <p className="font-mono text-xs text-blue-400 mb-8 tracking-widest uppercase relative z-10 bg-blue-500/10 py-1.5 px-3 rounded-md inline-block border border-blue-500/20">{t('experience_edu.job_stack')}</p>
                
                <ul className="space-y-6 text-gray-400 leading-relaxed relative z-10 text-sm md:text-base">
                  <li className="flex gap-4 items-start group/item"><span className="text-blue-500/50 group-hover/item:text-blue-400 transition-colors shrink-0 mt-1"><GitPullRequest size={16}/></span> <div>{t('experience_edu.job_point1')}</div></li>
                  <li className="flex gap-4 items-start group/item"><span className="text-blue-500/50 group-hover/item:text-blue-400 transition-colors shrink-0 mt-1"><GitPullRequest size={16}/></span> <div>{t('experience_edu.job_point2')}</div></li>
                  <li className="flex gap-4 items-start group/item"><span className="text-blue-500/50 group-hover/item:text-blue-400 transition-colors shrink-0 mt-1"><GitPullRequest size={16}/></span> <div>{t('experience_edu.job_point3')}</div></li>
                  <li className="flex gap-4 items-start group/item"><span className="text-blue-500/50 group-hover/item:text-blue-400 transition-colors shrink-0 mt-1"><GitPullRequest size={16}/></span> <div>{t('experience_edu.job_point4')}</div></li>
                </ul>
              </motion.div>

              {/* Education Card */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="border border-white/[0.05] hover:border-emerald-500/20 hover:bg-white/[0.03] transition-all bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
                
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10 flex items-center gap-3">
                  {i18n.language === "ru" ? "Starta Institute" : "Starta Institute"}
                  <a href="https://www.linkedin.com/school/startainstitute/" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 hover:text-emerald-400 transition-all">
                    <Linkedin size={20} />
                  </a>
                </h3>
                <p className="font-mono text-xs text-emerald-400 mb-8 tracking-widest uppercase relative z-10 bg-emerald-500/10 py-1.5 px-3 rounded-md inline-block border border-emerald-500/20">{t('experience_edu.edu_track')}</p>
                
                <ul className="space-y-6 text-gray-400 leading-relaxed relative z-10 text-sm md:text-base">
                  <li className="flex gap-4 items-start group/item"><span className="text-emerald-500/50 group-hover/item:text-emerald-400 transition-colors shrink-0 mt-1"><GraduationCap size={16}/></span> <div>{t('experience_edu.edu_point1')}</div></li>
                  <li className="flex gap-4 items-start group/item"><span className="text-emerald-500/50 group-hover/item:text-emerald-400 transition-colors shrink-0 mt-1"><GraduationCap size={16}/></span> <div>{t('experience_edu.edu_point2')}</div></li>
                  <li className="flex gap-4 items-start group/item"><span className="text-emerald-500/50 group-hover/item:text-emerald-400 transition-colors shrink-0 mt-1"><GraduationCap size={16}/></span> <div>{t('experience_edu.edu_point3')}</div></li>
                  <li className="flex gap-4 items-start group/item"><span className="text-emerald-500/50 group-hover/item:text-emerald-400 transition-colors shrink-0 mt-1"><GraduationCap size={16}/></span> <div>{t('experience_edu.edu_point4')}</div></li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} id="process" className="space-y-12 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{t('process.title')} <span className="text-blue-500/50 font-light text-2xl md:text-4xl">{t('process.subtitle')}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { s: "01", t: t("process_steps.s1_t"), d: t("process_steps.s1_d") },
                { s: "02", t: t("process_steps.s2_t"), d: t("process_steps.s2_d") },
                { s: "03", t: t("process_steps.s3_t"), d: t("process_steps.s3_d") },
                { s: "04", t: t("process_steps.s4_t"), d: t("process_steps.s4_d") },
                { s: "05", t: t("process_steps.s5_t"), d: t("process_steps.s5_d") }
              ].map((step, i) => (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} key={step.s} className="space-y-3 p-6 bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] hover:border-white/[0.08] rounded-2xl transition-all duration-300 group">
                  <div className="text-blue-500/50 group-hover:text-blue-400 transition-colors font-mono text-xs tracking-widest font-bold mb-2">{step.s} <span className="text-white ml-2 text-base">{step.t}</span></div>
                  <div className="h-px bg-gradient-to-r from-blue-500/20 to-transparent w-full mb-4 group-hover:from-blue-500/50 transition-all duration-300"></div>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{step.d}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* AI DEV PIPELINE (How I use AI) */}
        <section id="ai-pipeline" className="space-y-12 relative z-10 py-24 border-t border-white/5 mt-20 overflow-hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
              <Bot size={14} /> {i18n.language === "ru" ? "Стек" : "Workflow Stack"}
            </div>
            <FloatingGlyph Icon={Terminal} className="-top-10 right-20 text-cyan-500" />
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{i18n.language === "ru" ? "AI Pipeline Разработки" : "AI Dev Pipeline"}</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              {t("ai_pipeline2.desc")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: t("ai_pipeline2.s1_t"), desc: t("ai_pipeline2.s1_d"), delay: 0.1 },
              { num: "02", title: t("ai_pipeline2.s2_t"), desc: t("ai_pipeline2.s2_d"), delay: 0.2 },
              { num: "03", title: t("ai_pipeline2.s3_t"), desc: t("ai_pipeline2.s3_d"), delay: 0.3 },
              { num: "04", title: t("ai_pipeline2.s4_t"), desc: t("ai_pipeline2.s4_d"), delay: 0.4 },
              { num: "05", title: t("ai_pipeline2.s5_t"), desc: t("ai_pipeline2.s5_d"), delay: 0.5 },
              { num: "06", title: t("ai_pipeline2.s6_t"), desc: t("ai_pipeline2.s6_d"), delay: 0.6 }
            ].map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: step.delay }}
                className="group p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl hover:bg-emerald-500/[0.02] hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/10 transition-colors"></div>
                
                <div className="flex items-baseline gap-4 mb-4 relative z-10">
                  <span className="text-3xl font-black text-white/10 group-hover:text-emerald-500/30 transition-colors font-mono">{step.num}</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-12 bg-emerald-900/20 border border-emerald-500/20 rounded-2xl p-6 text-center shadow-[0_0_30px_rgba(16,185,129,0.05)] max-w-3xl mx-auto">
            <div className="font-mono text-emerald-400/80 text-xs tracking-widest uppercase mb-3">
              {i18n.language === "ru" ? "Генерация артефактов:" : "Output Generation:"}
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-white/50 font-mono">
              <span className="text-white/80">spec</span> <span className="opacity-50">•</span>
              <span className="text-white/80">diagrams</span> <span className="opacity-50">•</span>
              <span className="text-white/80">code</span> <span className="opacity-50">•</span>
              <span className="text-white/80">review notes</span> <span className="opacity-50">•</span>
              <span className="text-white/80">test skeleton</span> <span className="opacity-50">•</span>
              <span className="text-white/80">release checklist</span>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/10 inline-block px-12">
              <span className="text-emerald-300/80 text-sm italic font-serif">{i18n.language === "ru" ? "Правило: ИИ ускоряет процесс. Инженерия делает его стабильным." : "Rule: AI speeds me up. Engineering keeps it stable."}</span>
            </div>
          </motion.div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="space-y-12 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4">
              <GitPullRequest className="text-purple-400" size={36} />
              {i18n.language === "ru" ? "Отзывы" : "References"}
            </h2>
            <p className="text-gray-500 font-mono mt-2 text-sm tracking-widest uppercase">
              {i18n.language === "ru" ? "— Что говорят коллеги" : "— What colleagues say"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}
              variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              <div className="text-purple-400/40 text-6xl font-serif leading-none mb-4 select-none">"</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                {i18n.language === "ru"
                  ? "Philip быстро врубается в задачи и всегда думает о пользователе, а не только о технической реализации. Его компоненты — это не набор стилей, а продуманные интерфейсы с корректным состоянием."
                  : "Philip ramps up on tasks quickly and always thinks about the user rather than just the technical implementation. His components aren't just styled elements — they're thoughtful interfaces with proper state management."}
              </p>
              <div className="flex items-center gap-3 relative z-10 border-t border-white/5 pt-5">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">A</div>
                <div>
                  <div className="text-white text-sm font-semibold">Artem K.</div>
                  <div className="text-gray-500 text-xs font-mono tracking-widest uppercase">Frontend Lead · Trood</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0 }}
              variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] hover:border-blue-500/30 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
              <div className="text-blue-400/40 text-6xl font-serif leading-none mb-4 select-none">"</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                {i18n.language === "ru"
                  ? "Работал с Philip над системой real-time сессий. Удивляет то, как он подходит к синхронизации состояний — не hackish-решениями, а правильными event-паттернами. Кодовая база остаётся читаемой даже при высокой сложности."
                  : "Worked with Philip on a real-time session system. What stands out is how he approaches state synchronization — not with hacky solutions but with proper event patterns. The codebase stays readable even at high complexity."}
              </p>
              <div className="flex items-center gap-3 relative z-10 border-t border-white/5 pt-5">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">M</div>
                <div>
                  <div className="text-white text-sm font-semibold">Maxim V.</div>
                  <div className="text-gray-500 text-xs font-mono tracking-widest uppercase">Fullstack Engineer · Open Source</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="p-8 md:p-16 bg-gradient-to-br from-blue-900/10 to-purple-900/10 backdrop-blur-xl border border-white/10 rounded-[3rem] text-center max-w-4xl mx-auto shadow-[0_0_100px_rgba(59,130,246,0.1)] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 rotate-12"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] to-transparent opacity-80 z-0"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.2)] border border-blue-500/20 animate-pulse">
                <Send className="text-blue-400" size={24} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{i18n.language === "ru" ? "Давайте создадим что-то " : "Let's build something "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{i18n.language === "ru" ? "премиальное." : "premium."}</span></h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                {i18n.language === "ru" ? "Если нужен качественный фронтенд, предсказуемая поставка и продуктово-ориентированный инженер — я готов к диалогу." : "If you need high-end frontend execution, predictable delivery, and a product-minded engineer, I'm ready to talk."}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <a href="https://t.me/GRESCNIK" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-sm rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1">
                  Telegram 
                </a>
                <a href="https://github.com/philip211" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.05] border border-white/10 text-white font-bold tracking-widest uppercase text-sm rounded-xl hover:bg-white/10 transition-all hover:border-white/20 hover:-translate-y-1">
                  GitHub
                </a>
              </div>

              {/* Inline contact form */}
              <div className="border-t border-white/5 pt-10 text-left max-w-lg mx-auto">
                <p className="text-xs font-mono tracking-widest uppercase text-gray-500 text-center mb-6">
                  {i18n.language === "ru" ? "— или напишите прямо здесь —" : "— or reach out directly —"}
                </p>

                {formStatus === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                      <ChevronRight className="text-emerald-400" size={24} />
                    </div>
                    <p className="text-emerald-400 font-bold text-lg mb-1">
                      {i18n.language === "ru" ? "Сообщение отправлено!" : "Message sent!"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {i18n.language === "ru" ? "Отвечу в течение 24 часов." : "I'll reply within 24 hours."}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
                          {i18n.language === "ru" ? "Имя" : "Name"}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                          placeholder={i18n.language === "ru" ? "Ваше имя" : "Your name"}
                          className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-blue-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-blue-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
                        {i18n.language === "ru" ? "Сообщение" : "Message"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                        placeholder={i18n.language === "ru" ? "Расскажите о проекте или задаче..." : "Tell me about the project or role..."}
                        className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-blue-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/60 text-blue-400 font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-300"
                    >
                      {i18n.language === "ru" ? "Отправить" : "Send Message"} <Send size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Mafia Case Study Modal */}
      <AnimatePresence>
        {isMafiaModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsMafiaModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl relative overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />
              
              <button
                onClick={() => setIsMafiaModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 max-h-[85vh] overflow-y-auto hide-scrollbar text-gray-300 space-y-8 relative z-0">
                <header className="space-y-4 pr-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase">
                    Case Study
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Mafia in Telegram</h2>
                  <p className="text-xl text-blue-400">{i18n.language === "en" ? "From Idea to Release" : "От идеи до релиза"}</p>
                </header>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">{i18n.language === "en" ? "Project Essence" : "Суть проекта"}</h3>
                  <p className="leading-relaxed">{i18n.language === "en" ? "I created a multiplayer Mafia game as a Telegram WebApp, where players join a room, get roles, play in rounds (day/night), vote, chat, and progress through the scenario until one side wins." : "Я сделал мультиплеерную «Мафию» в формате Telegram WebApp, где игроки заходят в комнату, получают роли, играют раундами (день/ночь), голосуют, общаются в чате и проходят сценарий до победы одной из сторон."}</p>
                  <p className="leading-relaxed mt-4">{i18n.language === "en" ? "The main goal was not just to make a game, but to build a fair and stable realtime system, where:" : "Главная цель была не «сделать игру», а сделать честную и стабильную realtime-систему, где:"}</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>{i18n.language === "en" ? "all players have the same picture of what is happening," : "у всех игроков одинаковая картина происходящего,"}</li>
                    <li>{i18n.language === "en" ? "roles and events do not break due to delays," : "роли и события не ломаются из-за задержек,"}</li>
                    <li>{i18n.language === "en" ? "the scenario resolves predictably," : "сценарий предсказуемо резолвится,"}</li>
                    <li>{i18n.language === "en" ? "rooms handle activity and scaling well." : "комнаты выдерживают активность и масштабирование."}</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">{i18n.language === "en" ? "How the Idea Came About" : "Как появилась идея"}</h3>
                  <p className="leading-relaxed">{i18n.language === "en" ? "I saw that Telegram is the perfect platform for social games: people don’t need to install a separate app, entry is instant, the audience is already in the messenger, and social features are built-in." : "Я увидел, что Telegram — идеальная платформа для social-игр: людям не надо ставить отдельное приложение, вход мгновенный, аудитория уже в мессенджере, есть встроенная социальность."}</p>
                  <p className="leading-relaxed mt-4">{i18n.language === "en" ? "The idea was simple: Mafia as a product — fast entry, stylish interface, real rooms, private mechanics, and everything works like a service." : "Идея была простая: «Мафия как продукт» — быстрый вход, стильный интерфейс, реальные комнаты, приватные механики, и всё работает как сервис."}</p>
                </section>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">{i18n.language === "en" ? "Development Path (Stages)" : "Путь разработки (этапы)"}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-semibold mb-2">{i18n.language === "en" ? "1) Prototype → Hypothesis Validation" : "1) Прототип → проверка гипотезы"}</h4>
                      <p className="text-sm mb-2">{i18n.language === "en" ? "First I built the skeleton: lobby screen, create/join room, player list, basic game loop (start → rounds)." : "Сначала я собрал «скелет»: экран лобби, создание/вход в комнату, список игроков, базовый цикл игры (старт → раунды)."}</p>
                      <p className="text-sm text-blue-400/80">{i18n.language === "en" ? "Goal: Validate as quickly as possible that the mechanics feel native in Telegram, and that realtime works stably." : "Цель: как можно быстрее проверить, что механика в Telegram ощущается нативно, и что realtime работает стабильно."}</p>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">{i18n.language === "en" ? "2) Architecture for Fair Realtime" : "2) Архитектура под честный realtime"}</h4>
                      <p className="text-sm mb-2">{i18n.language === "en" ? "It became clear almost immediately: the standard CRUD approach doesn’t work here. An event system was needed. I built the logic around:" : "Почти сразу стало понятно: обычный «CRUD-подход» здесь не работает. Нужна система событий. Я построил логику вокруг:"}</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>{i18n.language === "en" ? "rooms (room lifecycle)," : "комнат (room lifecycle),"}</li>
                        <li>{i18n.language === "en" ? "events (join/leave, start, phase change, vote, night actions)," : "событий (join/leave, start, phase change, vote, night actions),"}</li>
                        <li>{i18n.language === "en" ? "a deterministic resolver (so the round result is the same for everyone)," : "детерминированного резолвера (чтобы результат раунда был одинаковым для всех),"}</li>
                        <li>{i18n.language === "en" ? "a state machine (so the game doesnt break from random clicks and race conditions)." : "машины состояний (чтобы игра не ломалась от случайных кликов и гонок)."}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">{i18n.language === "en" ? "3) Implementing Features that Make the Game Alive" : "3) Реализация фич, которые делают игру «живой»"}</h4>
                      <p className="text-sm mb-2">{i18n.language === "en" ? "When the skeleton worked, I started adding what turns a prototype into a product:" : "Когда скелет заработал, я начал добавлять то, что превращает прототип в продукт:"}</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>{i18n.language === "en" ? "roles + private actions," : "роли + приватные действия,"}</li>
                        <li>{i18n.language === "en" ? "daytime discussions and voting," : "дневные обсуждения и голосования,"}</li>
                        <li>{i18n.language === "en" ? "private chats/events (only for relevant players)," : "приватные чаты/события (только для нужных игроков),"}</li>
                        <li>{i18n.language === "en" ? "protection against UI chaos (proper locks, timers, phase restrictions)," : "защита от «хаоса» в UI (правильные блокировки, таймеры, ограничения фаз),"}</li>
                        <li>{i18n.language === "en" ? "normal UX of lobby and rooms (clear status, who is alive/dead, current phase, what to do now)." : "нормальный UX лобби и комнаты (понятный статус, кто жив/мертв, какая фаза, что делать сейчас)."}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">{i18n.language === "en" ? "4) Reliability and Production Approach" : "4) Надёжность и продакшн-подход"}</h4>
                      <p className="text-sm mb-2">{i18n.language === "en" ? "To make it really releasable and maintainable, I built an engineering foundation:" : "Чтобы это реально можно было выпускать и поддерживать, я сделал «инженерную основу»:"}</p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>{i18n.language === "en" ? "type safety at all levels (TS as standard)," : "типобезопасность на всех уровнях (TS как стандарт),"}</li>
                        <li>{i18n.language === "en" ? "DB migrations via Drizzle," : "миграции БД через Drizzle,"}</li>
                        <li>{i18n.language === "en" ? "health checks for services," : "health checks для сервисов,"}</li>
                        <li>{i18n.language === "en" ? "logging of critical actions (especially game events)," : "логирование критических действий (особенно игровых событий),"}</li>
                        <li>{i18n.language === "en" ? "monitoring via Sentry (errors, context, problem traces)." : "мониторинг через Sentry (ошибки, контекст, следы проблем)."}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">{i18n.language === "en" ? "5) Deploy & Release" : ''}</h4>
                      <p className="text-sm mb-2">{i18n.language === "en" ? "The project is packed into a scalable infrastructure: Docker / Compose, Nginx as a gateway, clear service structure." : ''}</p>
                      <p className="text-sm">{i18n.language === "en" ? "And then — release in Telegram: users log in, create rooms, and play." : ''}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">{i18n.language === "en" ? "Technical Essence" : ''}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <h4 className="text-blue-400 font-mono text-xs tracking-widest mb-3 uppercase">{i18n.language === "en" ? "Realtime Core" : ''}</h4>
                      <ul className="list-disc pl-4 text-sm space-y-1.5 marker:text-blue-500">
                        <li>{i18n.language === "en" ? "Socket.io rooms and events" : ''}</li>
                        <li>{i18n.language === "en" ? "State synchronization across clients" : ''}</li>
                        <li>{i18n.language === "en" ? "Race-condition / conflict control" : ''}</li>
                        <li>{i18n.language === "en" ? "Deterministic round resolver" : ''}</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                      {i18n.language === "en" ? <h4 className="text-blue-400 font-mono text-xs tracking-widest mb-3 uppercase">Full-stack outline</h4> : <h4 className="text-blue-400 font-mono text-xs tracking-widest mb-3 uppercase">Full-stack контур</h4>}
                      <ul className="list-disc pl-4 text-sm space-y-1.5 marker:text-blue-500">
                        {i18n.language === "en" ? <li>React + TypeScript frontend</li> : <li>React + TypeScript фронт</li>}
                        {i18n.language === "en" ? <li>Backend on NestJS/Fastify</li> : <li>Backend на NestJS/Fastify</li>}
                        <li>PostgreSQL + Drizzle ORM</li>
                        {i18n.language === "en" ? <li>Redis (cache/events/scale)</li> : <li>Redis (кэш/события/скейл)</li>}
                        {i18n.language === "en" ? <li>Monitoring/logging</li> : <li>Мониторинг/логирование</li>}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 relative overflow-hidden mt-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl"></div>
                  {i18n.language === "en" ? <h3 className="text-white text-lg font-bold mb-3 relative z-10">The most honest and strong block for CV: "What I understood"</h3> : <h3 className="text-white text-lg font-bold mb-3 relative z-10">Самый честный и сильный блок для CV: "Что понял"</h3>}
                  <p className="text-sm leading-relaxed relative z-10">
                    {i18n.language === "en" ? "This project was a trial product, and it taught a major lesson:" : "Этот проект был пробным продуктом, и он дал главный урок:"}<br/>
                    {i18n.language === "en" ? "in social/realtime games, features aren't the only important thing, but rather a ton of nuances — retention, anti-chaos, moderation, balance, onboarding, rules, protection from «breaking the game»." : "в social/realtime играх важны не только фичи, а куча нюансов — удержание, анти-хаос, модерация, баланс, онбординг, правила, защита от «ломания игры»."}
                  </p>
                  <p className="text-sm leading-relaxed mt-4 font-semibold text-white relative z-10">
                    {i18n.language === "en" ? "But that's exactly why this case is cool: it shows what I can do:" : "Но именно поэтому этот кейс крутой: он показывает, что я умею:"}
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm space-y-1 text-white/80 relative z-10">
                    {i18n.language === "en" ? <li>build a complex system,</li> : <li>строить сложную систему,</li>}
                    {i18n.language === "en" ? <li>bring to release,</li> : <li>доводить до релиза,</li>}
                    {i18n.language === "en" ? <li>see product weak spots,</li> : <li>видеть слабые места продукта,</li>}
                    {i18n.language === "en" ? <li>and in the next iteration do it right and stronger.</li> : <li>и на следующей итерации делать уже правильнее и сильнее.</li>}
                  </ul>
                </section>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* NOIR Case Study Modal */}
      <AnimatePresence>
        {isNoirModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsNoirModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl relative overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] pointer-events-none rounded-full" />
              
              <button
                onClick={() => setIsNoirModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 max-h-[85vh] overflow-y-auto hide-scrollbar text-gray-300 space-y-8 relative z-0">
                <header className="space-y-4 pr-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono tracking-widest uppercase">
                    Case Study
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-4 flex-wrap">
                    NOIR 
                    <span className="text-sm font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 py-1 px-2 rounded tracking-widest uppercase align-middle">{t('projects.p2.wip')}</span>
                  </h2>
                  <p className="text-xl text-purple-400">{i18n.language === "en" ? "From Idea to Release" : "От идеи до релиза"}</p>
                </header>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">{i18n.language === "en" ? "Project Essence" : "Суть проекта"}</h3>
                  <p className="leading-relaxed">
                    {i18n.language === "en" ? "NOIR is a premium social product in Telegram, where the main focus isn't on «just another chat», but on the feeling of quality, trust, and scenarios that make people actually return." : "NOIR — это премиальный социальный продукт в Telegram, где главный акцент не на «очередное общение», а на ощущение качества, доверие и сценарии, из-за которых люди реально возвращаются."}
                  </p>
                  <p className="leading-relaxed mt-4">
                    {i18n.language === "en" ? "I wanted to make not just an interface, but a complete system:" : "Я хотел сделать не просто интерфейс, а цельную систему:"}
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    {i18n.language === "en" ? <li>feed / content / scenarios (to have something to do),</li> : <li>лента / контент / сценарии (чтобы было что делать),</li>}
                    {i18n.language === "en" ? <li>community and interactions (to have someone with),</li> : <li>комьюнити и взаимодействия (чтобы было с кем),</li>}
                    {i18n.language === "en" ? <li>trust layer (so there's no garbage and toxicity),</li> : <li>слой доверия (чтобы не было мусора и токсичности),</li>}
                    {i18n.language === "en" ? <li>and all this - in a premium UX, like an iOS product.</li> : <li>и всё это — в premium UX, как iOS-продукт.</li>}
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">{i18n.language === "en" ? "How the Idea Came About" : "Как появилась идея"}</h3>
                  <p className="leading-relaxed">
                    {i18n.language === "en" ? "I saw a simple problem: most social/dating products look either cheap or overloaded, or they have too much «noise» and little trust." : "Я увидел простую проблему: большинство соц/знакомств-продуктов выглядят либо дешево, либо перегружено, либо там слишком много «шума» и мало доверия."}
                    {i18n.language === "en" ? "And I thought: what if we make a product that feels premium from the first second — and where the logic is built in such a way that the quality of content and people grows by itself?" : "И я подумал: а если сделать продукт, который ощущается как премиум с первой секунды — и где логика построена так, чтобы качество контента и людей росло само?"}
                  </p>
                  {i18n.language === "en" ? <p className="leading-relaxed mt-4 font-semibold text-white">Telegram fit perfectly:</p> : <p className="leading-relaxed mt-4 font-semibold text-white">Telegram подошёл идеально:</p>}
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    {i18n.language === "en" ? <li>quick login without installation,</li> : <li>быстрый вход без установки,</li>}
                    {i18n.language === "en" ? <li>familiar environment,</li> : <li>привычная среда,</li>}
                    {i18n.language === "en" ? <li>easy to scale audience,</li> : <li>легко масштабировать аудиторию,</li>}
                    {i18n.language === "en" ? <li>you can build a product right inside the messenger.</li> : <li>можно строить продукт прямо внутри мессенджера.</li>}
                  </ul>
                </section>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">{i18n.language === "en" ? "Development Path (Stages)" : "Путь разработки (этапы)"}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      {i18n.language === "en" ? <h4 className="text-white font-semibold mb-2">1) Concept → product principles</h4> : <h4 className="text-white font-semibold mb-2">1) Концепт → принципы продукта</h4>}
                      {i18n.language === "en" ? <p className="text-sm mb-2">First, I fixed the «rules» so that NOIR wouldn't turn into just another feed:</p> : <p className="text-sm mb-2">Сначала я зафиксировал «правила», чтобы NOIR не превратился в очередную ленту:</p>}
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {i18n.language === "en" ? <li>quality &gt; quantity</li> : <li>качество &gt; количество</li>}
                        {i18n.language === "en" ? <li>less noise, more sense</li> : <li>меньше шума, больше смысла</li>}
                        {i18n.language === "en" ? <li>trust and safety — part of the architecture, not «we'll add it later»</li> : <li>доверие и безопасность — часть архитектуры, а не «потом добавим»</li>}
                        {i18n.language === "en" ? <li>premium feel: speed, micro-interactions, clean typography, minimalism</li> : <li>premium feel: скорость, микровзаимодействия, чистая типографика, минимализм</li>}
                      </ul>
                    </div>

                    <div>
                      {i18n.language === "en" ? <h4 className="text-white font-semibold mb-2">2) UX-skeleton → retaining scenarios</h4> : <h4 className="text-white font-semibold mb-2">2) UX-скелет → сценарии, которые удерживают</h4>}
                      {i18n.language === "en" ? <p className="text-sm mb-2">I broke the product down into clear scenarios: onboarding (fast, no extra steps), profile (not as a form, but as a person's «showcase»), feed/interaction screen, trust/quality mechanics.</p> : <p className="text-sm mb-2">Я разложил продукт на понятные сценарии: онбординг (быстро, без лишних шагов), профиль (не как анкета, а как «витрина человека»), лента/экран взаимодействий, механики доверия/качества.</p>}
                      {i18n.language === "en" ? <p className="text-sm text-purple-400/80">The goal was: to make the user feel, not think, where to click and why.</p> : <p className="text-sm text-purple-400/80">Цель была: сделать так, чтобы пользователь не думал, а чувствовал, куда нажать и зачем.</p>}
                    </div>

                    <div>
                      {i18n.language === "en" ? <h4 className="text-white font-semibold mb-2">3) Design system and «premium UI»</h4> : <h4 className="text-white font-semibold mb-2">3) Дизайн-система и «premium UI»</h4>}
                      {i18n.language === "en" ? <p className="text-sm mb-2">I went straight through the design system: components, states, indents, typography, fonts, animations. Visually, NOIR is built on a neat grid, minimalism, contrast, «neon/glass» effects and dynamic theme.</p> : <p className="text-sm mb-2">Я сразу пошёл через дизайн-систему: компоненты, состояния, отступы, типографика, шрифты, анимации. Визуально NOIR строится на аккуратной сетке, минимализме, контрасте, «неон/гласс» эффектах и динамической теме.</p>}
                      {i18n.language === "en" ? <p className="text-sm text-purple-400/80">This is the part where you don't just «make it beautiful», but show that you know how to make a product feel.</p> : <p className="text-sm text-purple-400/80">Это та часть, где ты не просто «делаешь красиво», а показываешь, что умеешь делать ощущение продукта.</p>}
                    </div>

                    <div>
                      {i18n.language === "en" ? <h4 className="text-white font-semibold mb-2">4) Architecture and data (so it won't fall apart on scale)</h4> : <h4 className="text-white font-semibold mb-2">4) Архитектура и данные (чтобы не развалилось на росте)</h4>}
                      {i18n.language === "en" ? <p className="text-sm mb-2">Engineering principle: «end-to-end» type safety + clear contracts + predictable states.</p> : <p className="text-sm mb-2">Инженерный принцип: типобезопасность «сквозняком» + чёткие контракты + предсказуемые состояния.</p>}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <h5 className="text-purple-400 text-xs font-mono mb-2 uppercase">Frontend</h5>
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            <li>React 18 + TypeScript</li>
                            <li>Tailwind + shadcn/ui</li>
                            {i18n.language === "en" ? <li>TanStack Query (cache, refetch)</li> : <li>TanStack Query (кэш, refetch)</li>}
                            {i18n.language === "en" ? <li>Zustand (local states)</li> : <li>Zustand (локальные стейты)</li>}
                            <li>Telegram WebApp SDK</li>
                          </ul>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                          <h5 className="text-purple-400 text-xs font-mono mb-2 uppercase">Backend</h5>
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            <li>NestJS / Fastify</li>
                            <li>PostgreSQL + Drizzle ORM</li>
                            {i18n.language === "en" ? <li>Redis (cache/sessions/events)</li> : <li>Redis (кэш/сессии/события)</li>}
                            {i18n.language === "en" ? <li>Socket.io (optional)</li> : <li>Socket.io (опционально)</li>}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      {i18n.language === "en" ? <h4 className="text-white font-semibold mb-2">5) Security, trust and anti-chaos (core part)</h4> : <h4 className="text-white font-semibold mb-2">5) Безопасность, доверие и анти-хаос (часть ядра)</h4>}
                      {i18n.language === "en" ? <p className="text-sm mb-2">In NOIR, I initially laid down a «layer of reliability», because social products don't die from code, but from chaos:</p> : <p className="text-sm mb-2">В NOIR я изначально заложил «слой надёжности», потому что соц-продукты умирают не от кода, а от хаоса:</p>}
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {i18n.language === "en" ? <li>Telegram initData verification</li> : <li>верификация Telegram initData</li>}
                        {i18n.language === "en" ? <li>logging of critical operations and health checks</li> : <li>логирование критических операций и health checks</li>}
                        {i18n.language === "en" ? <li>spam control and rate limits</li> : <li>контроль спама и rate limits</li>}
                        {i18n.language === "en" ? <li>DB migrations via Drizzle and monitoring via Sentry</li> : <li>миграции БД через Drizzle и мониторинг через Sentry</li>}
                        {i18n.language === "en" ? <li>data privacy policy</li> : <li>политика приватности данных</li>}
                      </ul>
                    </div>

                    <div>
                      {i18n.language === "en" ? <h4 className="text-white font-semibold mb-2">6) DevOps and release (so it actually lives)</h4> : <h4 className="text-white font-semibold mb-2">6) Девопс и релиз (чтобы это реально жило)</h4>}
                      {i18n.language === "en" ? <p className="text-sm mb-2">I build deployment so that the product can be maintained and scaled: Docker / Compose, Nginx, Turborepo + pnpm, Sentry. Release path: closed launch → feedback gathering → iterations → audience expansion.</p> : <p className="text-sm mb-2">Деплой я строю так, чтобы продукт можно было поддерживать и масштабировать: Docker / Compose, Nginx, Turborepo + pnpm, Sentry. Релизный путь: закрытый запуск → сбор фидбэка → итерации → расширение аудитории.</p>}
                    </div>
                  </div>
                </section>

                <section className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 relative overflow-hidden mt-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl"></div>
                  {i18n.language === "en" ? <h3 className="text-white text-lg font-bold mb-3 relative z-10">Honest block "what I understood"</h3> : <h3 className="text-white text-lg font-bold mb-3 relative z-10">Честный блок "что понял"</h3>}
                  <p className="text-sm leading-relaxed relative z-10">
                    {i18n.language === "en" ? "In social products, it's not just development that matters. The decisive factors are: onboarding quality, feed content quality, trust/anti-spam, moderation, and iteration speed after launch." : "В соц-продуктах важна не только разработка. Решает: качество онбординга, качество контента в ленте, доверие/анти-спам, модерация, и скорость итераций после запуска."}
                  </p>
                  <p className="text-sm leading-relaxed mt-4 font-semibold text-white relative z-10">
                    {i18n.language === "en" ? "What is the strongest part of this case (what the employer sees):" : "Что в этом кейсе самое сильное (что видно работодателю):"}
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm space-y-1 text-white/80 relative z-10">
                    {i18n.language === "en" ? <li>systematic UX (scenarios, retention, clear states)</li> : <li>системный UX (сценарии, удержание, понятные состояния)</li>}
                    {i18n.language === "en" ? <li>design system and premium UI</li> : <li>дизайн-система и premium UI</li>}
                    {i18n.language === "en" ? <li>full-stack mindset (data, contracts, infrastructure)</li> : <li>full-stack мышление (данные, контракты, инфраструктура)</li>}
                    {i18n.language === "en" ? <li>trust/security as part of architecture</li> : <li>доверие/безопасность как часть архитектуры</li>}
                    {i18n.language === "en" ? <li>production approach: monitoring, migrations, health checks, logging</li> : <li>продакшн-подход: мониторинг, миграции, health checks, логирование</li>}
                  </ul>
                </section>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Dev Team Case Study Modal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsAiModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl relative overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
              
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 max-h-[85vh] overflow-y-auto hide-scrollbar text-gray-300 space-y-8 relative z-0">
                <header className="space-y-4 pr-10">
                  <div className="flex gap-2 items-center flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase">
                      Case Study
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                      {i18n.language === "en" ? "Confidential" : "Конфиденциально"}
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">AI Dev Team Workflows</h2>
                  {i18n.language === "en" ? <p className="text-xl text-red-400/80">Project is closed for public access</p> : <p className="text-xl text-red-400/80">Проект закрыт для общего доступа</p>}
                </header>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">{i18n.language === "en" ? "Project Essence" : "Суть проекта"}</h3>
                  <p className="leading-relaxed">
                    {i18n.language === "en" ? "I assembled a system where AI agents work as a dev team: one gathers requirements and specs, another designs architecture, then comes code generation, review, test skeleton and final release checklist." : "Я собрал систему, где ИИ-агенты работают как команда разработки: один собирает требования и спецификацию, второй проектирует архитектуру, дальше — генерация кода, ревью, тест-скелет и финальный релиз-чеклист."}
                  </p>
                  <p className="leading-relaxed mt-4">
                    {i18n.language === "en" ? "The goal is not to «generate code», but to make the result predictable, repeatable and with artifacts, like in proper engineering development." : "Цель — не «нагенерить код», а сделать так, чтобы результат был предсказуемым, повторяемым и с артефактами, как в нормальной инженерной разработке."}
                  </p>
                </section>

                <section>
                  {i18n.language === "en" ? <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">Problem (What was the issue)</h3> : <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">Problem (В чём была проблема)</h3>}
                  {i18n.language === "en" ? <p className="leading-relaxed mb-3">In real development, what kills mostly is not the code, but:</p> : <p className="leading-relaxed mb-3">В реальной разработке больше всего убивает не код, а:</p>}
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    {i18n.language === "en" ? <li>chaos in tasks and lack of clear \"done\" criteria,</li> : <li>задачи в хаосе и без чётких критериев «готово»,</li>}
                    {i18n.language === "en" ? <li>long reviews and endless revisions,</li> : <li>долгое ревью и бесконечные правки,</li>}
                    {i18n.language === "en" ? <li>lack of artifacts (specs, schemas, checklists, test plan),</li> : <li>отсутствие артефактов (спеки, схемы, чеклисты, тест-план),</li>}
                    {i18n.language === "en" ? <li>dependence on \"keeping it in head\".</li> : <li>зависимость от «в голове держу».</li>}
                  </ul>
                  <p className="leading-relaxed mt-4">
                    {i18n.language === "en" ? "I wanted to remove this and make a process where any feature request would pass through the same clear path." : "Я хотел это убрать и сделать процесс таким, чтобы любой фиче-запрос проходил один и тот же понятный путь."}
                  </p>
                </section>

                <section>
                  <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">Built (Interactive Pipeline)</h3>
                  {i18n.language === "en" ? <p className="leading-relaxed mb-6 text-sm text-gray-400">Click on any step to see how agents pass data to each other:</p> : <p className="leading-relaxed mb-6 text-sm text-gray-400">Нажмите на любой шаг, чтобы увидеть, как агенты передают данные друг другу:</p>}
                  
                  <div className="flex flex-col md:flex-row gap-6 bg-black/40 p-6 rounded-2xl border border-white/5">
                    {/* Pipeline Steps (Timeline) */}
                    <div className="md:w-1/3 flex flex-col space-y-2 relative">
                      {/* Connecting Line */}
                      <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-white/10 hidden md:block z-0"></div>
                      
                      {[
                        { title: "Spec / Clarify", agent: "PM Agent" },
                        { title: "Architecture", agent: "Architect Agent" },
                        { title: "Implementation", agent: "Dev Agents" },
                        { title: "Review / Quality Gate", agent: "Review Agent" },
                        { title: "Test Skeleton", agent: "QA Agent" },
                        { title: "Release Checklist", agent: "DevOps Agent" }
                      ].map((step, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePipelineStep(idx)}
                          className={`relative z-10 flex items-center gap-4 p-3 rounded-xl transition-all duration-300 text-left ${
                            activePipelineStep === idx 
                              ? "bg-emerald-500/20 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                              : "hover:bg-white/5 border border-transparent"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${
                            activePipelineStep === idx ? "bg-emerald-500 text-black font-bold" : "bg-white/10 text-gray-500"
                          }`}>
                            0{idx + 1}
                          </div>
                          <div>
                            <div className={`font-bold text-sm ${activePipelineStep === idx ? "text-emerald-400" : "text-gray-300"}`}>
                              {step.title}
                            </div>
                            <div className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mt-1">
                              {step.agent}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Active Step Content */}
                    <div className="md:w-2/3 bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden flex flex-col justify-center min-h-[250px]">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full"></div>
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activePipelineStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="relative z-10"
                        >
                          {activePipelineStep === 0 && (
                            <div>
                              {i18n.language === "en" ? <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">AI agent turns idea into spec</h4> : <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">ИИ-агент превращает идею в спеку</h4>}
                              {i18n.language === "en" ? <p className="text-gray-300 mb-4 text-sm leading-relaxed">Instead of abstract "make a feature", the agent asks clarifying questions and creates a strict specification.</p> : <p className="text-gray-300 mb-4 text-sm leading-relaxed">Вместо абстрактного "сделай фичу", агент задаёт уточняющие вопросы и формирует жёсткую спецификацию.</p>}
                              <div className="bg-black/50 p-3 rounded text-xs font-mono text-emerald-500/70 border border-emerald-500/10">
                                {i18n.language === "en" ? "> Output: Goal, usage scenarios, edge-cases, acceptance criteria." : "> Output: Цель, сценарии использования, edge-cases, критерии готовности (Acceptance Criteria)."}
                              </div>
                            </div>
                          )}
                          {activePipelineStep === 1 && (
                            <div>
                              {i18n.language === "en" ? <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Architecture design</h4> : <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Проектирование архитектуры</h4>}
                              {i18n.language === "en" ? <p className="text-gray-300 mb-4 text-sm leading-relaxed">The architect agent analyzes the spec and draws the structure. Determines which files to create and writes contracts (API, types).</p> : <p className="text-gray-300 mb-4 text-sm leading-relaxed">Архитектор-агент анализирует спеку и рисует структуру. Определяет, какие файлы нужно создать, и прописывает контракты (API, типы).</p>}
                              <div className="bg-black/50 p-3 rounded text-xs font-mono text-emerald-500/70 border border-emerald-500/10">
                                {i18n.language === "en" ? "> Output: Module structure, contracts, state machine, potential technical risks." : "> Output: Структура модулей, контракты, машина состояний, потенциальные технические риски."}
                              </div>
                            </div>
                          )}
                          {activePipelineStep === 2 && (
                            <div>
                              {i18n.language === "en" ? <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Strict code generation</h4> : <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Строгая кодогенерация</h4>}
                              {i18n.language === "en" ? <p className="text-gray-300 mb-4 text-sm leading-relaxed">Dev agents write code not "as it goes" from a single prompt, but strictly following architectural contracts and separating logic and UI.</p> : <p className="text-gray-300 mb-4 text-sm leading-relaxed">Dev-агенты пишут код не "как получится" из одного промпта, а строго следуя архитектурным контрактам и разделяя логику и UI.</p>}
                              <div className="bg-black/50 p-3 rounded text-xs font-mono text-emerald-500/70 border border-emerald-500/10">
                                {i18n.language === "en" ? "> Output: Feature source code broken down into components and services." : "> Output: Исходный код фичи, разбитый по компонентам и сервисам."}
                              </div>
                            </div>
                          )}
                          {activePipelineStep === 3 && (
                            <div>
                              {i18n.language === "en" ? <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Automatic Code Review</h4> : <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Автоматический Code Review</h4>}
                              {i18n.language === "en" ? <p className="text-gray-300 mb-4 text-sm leading-relaxed">Review agent acts as a Quality Gate. It won't pass code if architecture is broken, vulnerabilities exist or types don't match spec.</p> : <p className="text-gray-300 mb-4 text-sm leading-relaxed">Ревью-агент выступает Quality Gate-ом. Он не пропустит код, если нарушена архитектура, есть уязвимости или типы не совпадают со спекой.</p>}
                              <div className="bg-black/50 p-3 rounded text-xs font-mono text-emerald-500/70 border border-emerald-500/10">
                                {i18n.language === "en" ? "> Output: PR Summary, remarks list, auto bug fixes." : "> Output: PR Summary, список замечаний, автоматические исправления багов."}
                              </div>
                            </div>
                          )}
                          {activePipelineStep === 4 && (
                            <div>
                              {i18n.language === "en" ? <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Quality Assurance (QA)</h4> : <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Обеспечение качества (QA)</h4>}
                              {i18n.language === "en" ? <p className="text-gray-300 mb-4 text-sm leading-relaxed">QA agent analyzes finished code and generates tests skeleton (unit and integration), so quality doesn't remain merely "on paper".</p> : <p className="text-gray-300 mb-4 text-sm leading-relaxed">QA-агент анализирует готовый код и генерирует скелет тестов (unit и интеграционных), чтобы качество не оставалось "на словах".</p>}
                              <div className="bg-black/50 p-3 rounded text-xs font-mono text-emerald-500/70 border border-emerald-500/10">
                                {i18n.language === "en" ? "> Output: .test.ts files, data mocks, coverage of main use-cases from step 1." : "> Output: Файлы .test.ts, моки данных, покрытие основных use-cases из шага 1."}
                              </div>
                            </div>
                          )}
                          {activePipelineStep === 5 && (
                            <div>
                              {i18n.language === "en" ? <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Production preparation</h4> : <h4 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 border-b border-emerald-500/20 pb-2 inline-block">Подготовка к продакшену</h4>}
                              {i18n.language === "en" ? <p className="text-gray-300 mb-4 text-sm leading-relaxed">DevOps agent collects the final checklist before merging to the `main` branch.</p> : <p className="text-gray-300 mb-4 text-sm leading-relaxed">DevOps-агент собирает финальный чеклист перед слиянием с `main` веткой.</p>}
                              <div className="bg-black/50 p-3 rounded text-xs font-mono text-emerald-500/70 border border-emerald-500/10">
                                {i18n.language === "en" ? "> Output: Checklist (DB migrations, new ENV variables, health checks, metrics logging)." : "> Output: Чеклист (миграции БД, новые ENV переменные, health checks, логирование метрик)."}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <section>
                    {i18n.language === "en" ? <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">Artifacts <span className="text-sm font-normal text-gray-500">(most important)</span></h3> : <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">Артефакты <span className="text-sm font-normal text-gray-500">(самое важное)</span></h3>}
                    {i18n.language === "en" ? <p className="leading-relaxed text-sm mb-3">The output is not just «code», but a set:</p> : <p className="leading-relaxed text-sm mb-3">На выходе получается не просто «код», а комплект:</p>}
                    <ul className="list-disc pl-5 space-y-1.5 text-sm marker:text-emerald-500 text-white/80">
                      {i18n.language === "en" ? <li>Specification + acceptance criteria</li> : <li>Спецификация + acceptance criteria</li>}
                      {i18n.language === "en" ? <li>Flows/states scheme</li> : <li>Схема потоков/состояний</li>}
                      {i18n.language === "en" ? <li>API/events contracts</li> : <li>Контракты API/событий</li>}
                      {i18n.language === "en" ? <li>PR summary and risk list</li> : <li>PR summary и список рисков</li>}
                      {i18n.language === "en" ? <li>Test-skeleton</li> : <li>Тест-скелет</li>}
                      {i18n.language === "en" ? <li>Release checklist</li> : <li>Релиз-чеклист</li>}
                    </ul>
                  </section>

                  <section>
                    {i18n.language === "en" ? <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">Impact</h3> : <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2 mb-4">Impact (Влияние)</h3>}
                    <ul className="list-disc pl-5 space-y-3 text-sm marker:text-emerald-500 text-white/80">
                      {i18n.language === "en" ? <li>Development speed grows because there are fewer empty discussions and «what are we doing?».</li> : <li>Скорость разработки растёт, потому что меньше пустых обсуждений и «а что делаем?».</li>}
                      {i18n.language === "en" ? <li>Quality doesn't drop because there is a quality-gate, typing and a test skeleton.</li> : <li>Качество не падает, потому что есть quality-gate, типизация и тест-скелет.</li>}
                      {i18n.language === "en" ? <li>Process becomes repeatable: any feature goes through one path.</li> : <li>Процесс становится повторяемым: любая фича проходит один путь.</li>}
                      {i18n.language === "en" ? <li><strong>Less chaos → less bugs → faster releases.</strong></li> : <li><strong>Меньше хаоса → меньше багов → быстрее релизы.</strong></li>}
                    </ul>
                  </section>
                </div>

                <section className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden mt-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl"></div>
                  {i18n.language === "en" ? <h3 className="text-white text-lg font-bold mb-3 relative z-10">Super short version</h3> : <h3 className="text-white text-lg font-bold mb-3 relative z-10">Супер-короткая версия</h3>}
                  <p className="text-sm leading-relaxed relative z-10">
                    {i18n.language === "en" ? "I built an AI agent dev pipeline: spec → code → review → test-skeleton → release checklist. It removes task chaos, speeds up reviews and provides artifacts at every step. Result: speed grows and quality holds on systemic checks, not on «luck»." : "Я собрал pipeline для разработки с ИИ-агентами: спека → код → ревью → тест-скелет → релиз-чеклист. Это убирает хаос задач, ускоряет ревью и даёт артефакты на каждом шаге. В итоге скорость растёт, а качество держится на системных проверках, а не на «везении»."}
                  </p>
                </section>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
