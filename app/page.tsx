"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  Palette,
  Layout,
  Cpu,
  Terminal,
  Globe,
  ChevronDown,
  Database,
  Monitor,
  Rocket,
  Smartphone,
  Store,
  Briefcase,
  Code2,
  Layers,
  Zap
} from "lucide-react";

// --- THEME CONFIGURATION ---
const THEMES = {
  obsidian: {
    label: "Industrial Obsidian",
    colors: {
      bg: "#0a0a0a",
      card: "#141414",
      textMain: "#ffffff",
      textSub: "#a3a3a3",
      accent: "#a3e635",
      border: "#262626",
    },
    font: "font-sans",
    radius: "rounded-3xl",
  },
  modern: {
    label: "Modern Minimalist",
    colors: {
      bg: "#ffffff",
      card: "#f9fafb",
      textMain: "#111827",
      textSub: "#4b5563",
      accent: "#3b82f6",
      border: "#e5e7eb",
    },
    font: "font-sans",
    radius: "rounded-2xl",
  },
  professional: {
    label: "Slate Pro",
    colors: {
      bg: "#0f172a",
      card: "#1e293b",
      textMain: "#f8fafc",
      textSub: "#94a3b8",
      accent: "#38bdf8",
      border: "#334155",
    },
    font: "font-sans",
    radius: "rounded-xl",
  },
};

type ThemeKey = keyof typeof THEMES;

// --- SHARED UI COMPONENTS ---

function ThemeCard({ children, theme, className = "", noPadding = false }: any) {
  const t = THEMES[theme as ThemeKey];
  return (
    <div 
      className={`relative border overflow-hidden transition-all duration-500 group ${t.radius} ${className}`}
      style={{ backgroundColor: t.colors.card, borderColor: t.colors.border }}
    >
      <div className={`relative z-10 h-full ${noPadding ? "" : "p-8"}`}>
        {children}
      </div>
    </div>
  );
}

// --- SECTION: NAVBAR ---

const Navbar = ({ currentTheme, setTheme, isMenuOpen, setIsMenuOpen }: any) => {
  const t = THEMES[currentTheme as ThemeKey];
  return (
    <nav
      style={{ borderColor: t.colors.border }}
      className="fixed top-0 w-full z-50 px-6 py-6 border-b bg-transparent backdrop-blur-md transition-colors duration-500"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div style={{ color: t.colors.textMain }} className="font-black text-2xl tracking-tighter">
          NS<span style={{ color: t.colors.accent }}>.</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ backgroundColor: t.colors.card, color: t.colors.textMain, borderColor: t.colors.border }}
            className="flex items-center gap-2 px-4 py-2 border rounded-full font-medium text-sm hover:opacity-80 transition-all"
          >
            <Palette size={16} />
            <span>{t.label}</span>
            <ChevronDown size={14} className={isMenuOpen ? "rotate-180" : ""} />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ backgroundColor: t.colors.card, borderColor: t.colors.border }}
                className="absolute right-0 mt-2 w-56 border rounded-xl shadow-2xl overflow-hidden flex flex-col p-2 z-[60]"
              >
                {Object.entries(THEMES).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => { setTheme(key); setIsMenuOpen(false); }}
                    className="text-left px-4 py-3 rounded-lg text-sm hover:opacity-70 transition-opacity flex items-center gap-3"
                  >
                    <div style={{ background: theme.colors.accent }} className="w-3 h-3 rounded-full" />
                    <span style={{ color: t.colors.textMain }}>{theme.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

// --- SECTION: HERO ---

const TechSculpture = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="grid grid-cols-4 gap-4 rotate-12 transform hover:rotate-0 transition-all duration-1000">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.1, 1],
              backgroundColor: [t.colors.card, t.colors.accent, t.colors.card],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.15 }}
            style={{ borderColor: t.colors.border }}
            className="w-14 h-14 md:w-20 md:h-20 border rounded-xl shadow-2xl"
          />
        ))}
      </div>
      <div className="absolute inset-0 blur-[120px] -z-10 opacity-20" style={{ background: t.colors.accent }} />
    </div>
  );
};

const Hero = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("nwa200079@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute h-full w-full rounded-full opacity-75" style={{ backgroundColor: t.colors.accent }}></span>
              <span className="relative h-3 w-3 rounded-full" style={{ backgroundColor: t.colors.accent }}></span>
            </span>
            <span style={{ color: t.colors.textSub }} className="text-xs font-mono uppercase tracking-[0.2em]">Engineer_Status: Active</span>
          </div>

          <h1 style={{ color: t.colors.textMain }} className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
            NEZAR<br />SAAB<span style={{ color: t.colors.accent }}>.</span>
          </h1>

          <p style={{ color: t.colors.textSub }} className="text-xl max-w-lg mb-12 leading-relaxed">
            Software Engineer specializing in <span style={{ color: t.colors.textMain }} className="font-bold underline decoration-2" style={{ textDecorationColor: t.colors.accent }}>Scalable Systems</span>. I architect and build robust digital infrastructures in Dubai.
          </p>

          <div 
            onClick={handleCopy}
            style={{ backgroundColor: t.colors.card, borderColor: t.colors.border }}
            className="group cursor-pointer max-w-md border rounded-2xl p-5 flex justify-between items-center transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-white/5" style={{ color: t.colors.accent }}><Terminal size={20} /></div>
              <span style={{ color: t.colors.textMain }} className="font-mono text-sm md:text-base tracking-tight">nwa200079@gmail.com</span>
            </div>
            <div className="text-right">
               <span style={{ color: copied ? t.colors.accent : t.colors.textSub }} className="text-[10px] font-bold block uppercase">
                 {copied ? "Copied!" : "Copy"}
               </span>
            </div>
          </div>
        </div>

        <TechSculpture theme={theme} />
      </div>
    </section>
  );
};

// --- SECTION: SERVICES (THE BENTO GRID) ---

const Services = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 style={{ color: t.colors.textMain }} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Core <span style={{ color: t.colors.accent }}>Engineering</span>.
            </h2>
            <p style={{ color: t.colors.textSub }} className="text-xl">Solutions built for performance, security, and extreme scale.</p>
          </div>
          <div style={{ color: t.colors.accent }} className="font-mono text-sm hidden md:block tracking-widest uppercase">/ Capabilities_List</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ThemeCard theme={theme} className="md:col-span-2">
            <Layers size={40} style={{ color: t.colors.accent }} className="mb-6" />
            <h3 style={{ color: t.colors.textMain }} className="text-3xl font-bold mb-4">Software Architecture</h3>
            <p style={{ color: t.colors.textSub }} className="text-lg leading-relaxed max-w-xl">
              I design the skeleton of your application. From database schemas to server-side logic in Python and PHP, ensuring your system can handle thousands of concurrent users without breaking.
            </p>
          </ThemeCard>

          <ThemeCard theme={theme}>
            <Zap size={40} style={{ color: t.colors.accent }} className="mb-6" />
            <h3 style={{ color: t.colors.textMain }} className="text-2xl font-bold mb-4">Performance</h3>
            <p style={{ color: t.colors.textSub }} className="text-base">
              Optimizing Core Web Vitals, code splitting, and server-side rendering (SSR) for lightning-fast delivery.
            </p>
          </ThemeCard>

          <ThemeCard theme={theme}>
            <Database size={40} style={{ color: t.colors.accent }} className="mb-6" />
            <h3 style={{ color: t.colors.textMain }} className="text-2xl font-bold mb-4">Backend Logic</h3>
            <p style={{ color: t.colors.textSub }} className="text-base">
              Integration of complex APIs, secure authentication flows, and automated data processing pipelines.
            </p>
          </ThemeCard>

          <ThemeCard theme={theme} className="md:col-span-2">
            <Code2 size={40} style={{ color: t.colors.accent }} className="mb-6" />
            <h3 style={{ color: t.colors.textMain }} className="text-3xl font-bold mb-4">Full-Stack Development</h3>
            <p style={{ color: t.colors.textSub }} className="text-lg leading-relaxed max-w-xl">
              Seamlessly connecting high-end React/Next.js frontends with robust backends. Focused on clean code and maintainable version control.
            </p>
          </ThemeCard>
        </div>
      </div>
    </section>
  );
};

// --- SECTION: EXPERIENCE ---

const Experience = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  const jobs = [
    {
      company: "Khales Group",
      role: "Software Engineer",
      period: "02/2025 - Present",
      location: "Dubai, UAE",
      tasks: [
        "Architecting large-scale project management systems.",
        "Developing high-performance backend logic using Python and PHP environments.",
        "Managing system migrations and optimizing database query performance for large datasets.",
        "Leading the integration of complex APIs with Next.js 14+ architectures."
      ]
    },
    {
      company: "Ava Five",
      role: "Next.js / React Developer",
      period: "04/2024 - 12/2024",
      location: "Dubai, UAE",
      tasks: [
        "Optimized application speed by 40% through code splitting and lazy loading.",
        "Implemented advanced SSR/SSG patterns for SEO-sensitive corporate projects.",
        "Built dynamic CMS-driven interfaces using Sanity and real-time content pipelines."
      ]
    }
  ];

  return (
    <section className="py-32 px-6 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <h2 style={{ color: t.colors.textMain }} className="text-5xl md:text-7xl font-bold tracking-tighter mb-20">
          Career <span style={{ color: t.colors.accent }}>Trajectory</span>.
        </h2>

        <div className="space-y-24">
          {jobs.map((job, i) => (
            <div key={i} className="group relative">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
                <div>
                  <span style={{ color: t.colors.accent }} className="font-mono text-sm block mb-2">{job.period}</span>
                  <span style={{ color: t.colors.textSub }} className="text-xs uppercase tracking-widest">{job.location}</span>
                </div>
                
                <div>
                  <h3 style={{ color: t.colors.textMain }} className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
                    {job.company}
                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: t.colors.accent }} />
                  </h3>
                  <p style={{ color: t.colors.accent }} className="text-xl font-medium mb-8 uppercase tracking-tighter">{job.role}</p>
                  
                  <ul className="space-y-4">
                    {job.tasks.map((task, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <div className="mt-2.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.colors.accent }} />
                        <p style={{ color: t.colors.textSub }} className="text-lg leading-relaxed">{task}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION: FOOTER ---

const Footer = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  return (
    <footer className="py-24 px-6 border-t" style={{ borderColor: t.colors.border }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <h2 style={{ color: t.colors.textMain }} className="text-4xl font-black mb-4 tracking-tighter uppercase italic">Ready to Scale?</h2>
          <a href="mailto:nwa200079@gmail.com" className="text-2xl md:text-3xl font-mono underline decoration-1" style={{ color: t.colors.accent, textDecorationColor: t.colors.border }}>
            nwa200079@gmail.com
          </a>
        </div>
        
        <div className="text-sm font-mono uppercase tracking-[0.2em]" style={{ color: t.colors.textSub }}>
          <p className="mb-2">Dubai, UAE // 2026</p>
          <p>© Nezar Saab / Dev_Archive</p>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN PAGE ---

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("obsidian");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main
      className="min-h-screen transition-colors duration-700 ease-in-out relative selection:bg-white selection:text-black"
      style={{ backgroundColor: THEMES[currentTheme].colors.bg }}
    >
      <Navbar
        currentTheme={currentTheme}
        setTheme={setCurrentTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <div className="relative z-10">
        <Hero theme={currentTheme} />
        <Services theme={currentTheme} />
        <Experience theme={currentTheme} />
        <Footer theme={currentTheme} />
      </div>

      {/* Subtle Background Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </main>
  );
}
