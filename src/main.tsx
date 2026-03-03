import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'
import { Smartphone, Monitor } from 'lucide-react'

function AppWrapper() {
  const [isMobileMode, setIsMobileMode] = useState(false);

  // If we are inside an iframe, just render the app normally (to avoid infinite recursion)
  if (window.self !== window.top) {
    return <App />;
  }

  if (!isMobileMode) {
    return (
      <>
        <App />
        <button 
          onClick={() => setIsMobileMode(true)} 
          className="fixed bottom-6 right-6 z-[9999] bg-[#030303]/80 hover:bg-[#0a0a0a] border border-blue-500/30 hover:border-blue-500 p-4 rounded-full backdrop-blur-md text-blue-400 hover:text-blue-300 transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group"
          title="Mobile Demo Mode"
        >
          <Smartphone size={24} className="group-hover:scale-110 transition-transform" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-mono tracking-widest text-blue-400">MOBILE DEMO</span>
        </button>
      </>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#030303] z-[99999] flex items-center justify-center overflow-hidden">
      {/* Background glow for the demo mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
             backgroundSize: "64px 64px",
           }}
      />

      <button 
        onClick={() => setIsMobileMode(false)} 
        className="absolute top-8 right-8 z-[99999] bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md text-white transition-all flex items-center gap-3 group"
      >
        <Monitor size={20} className="group-hover:text-blue-400 transition-colors" />
        <span className="text-xs font-mono tracking-widest uppercase group-hover:text-blue-400 transition-colors">Desktop View</span>
      </button>

      {/* Phone container */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] border-[8px] border-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_100px_rgba(59,130,246,0.15)] overflow-hidden ring-1 ring-white/10 flex flex-col scale-[0.85] sm:scale-100 origin-center">
        {/* Hardware details - buttons */}
        <div className="absolute -left-[10px] top-[120px] w-[2px] h-[30px] bg-[#2a2a2a] rounded-l-md"></div>
        <div className="absolute -left-[10px] top-[170px] w-[2px] h-[60px] bg-[#2a2a2a] rounded-l-md"></div>
        <div className="absolute -left-[10px] top-[240px] w-[2px] h-[60px] bg-[#2a2a2a] rounded-l-md"></div>
        <div className="absolute -right-[10px] top-[190px] w-[2px] h-[90px] bg-[#2a2a2a] rounded-r-md"></div>

        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 inset-x-0 h-8 bg-transparent z-[9999] flex justify-center mt-3 pointer-events-none">
          <div className="w-32 h-7 bg-black rounded-full flex items-center justify-between px-2 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)] border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a2a] ml-1 shadow-[inset_0_0_4px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900/40"></div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <iframe 
          src={window.location.href} 
          className="w-full h-full border-none bg-[#030303] rounded-[42px]" 
          title="Mobile Demo"
        />
      </div>
      
      <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-blue-500/50 font-mono text-xs uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">Interactive Mobile Preview</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
