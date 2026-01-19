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
} from "lucide-react";

// --- THEME CONFIGURATION ---
const THEMES = {
  obsidian: {
    label: "Industrial",
    colors: {
      bg: "#0a0a0a",
      card: "#171717",
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
      card: "#f3f4f6",
      textMain: "#18181b",
      textSub: "#52525b",
      accent: "#3b82f6",
      border: "#e4e4e7",
    },
    font: "font-sans",
    radius: "rounded-2xl",
  },
  professional: {
    label: "Corporate Pro",
    colors: {
      bg: "#0f172a",
      card: "#1e293b",
      textMain: "#f8fafc",
      textSub: "#94a3b8",
      accent: "#38bdf8",
      border: "#334155",
    },
    font: "font-sans",
    radius: "rounded-md",
  },
};

type ThemeKey = keyof typeof THEMES;

// --- COMPONENTS ---

const Navbar = ({ currentTheme, setTheme, isMenuOpen, setIsMenuOpen }: any) => (
  <nav
    style={{ borderColor: THEMES[currentTheme as ThemeKey].colors.border }}
    className="fixed top-0 w-full z-50 px-6 py-6 border-b bg-transparent backdrop-blur-md transition-colors duration-500"
  >
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      <div
        style={{ color: THEMES[currentTheme as ThemeKey].colors.textMain }}
        className="font-black text-2xl tracking-tighter"
      >
        NS<span style={{ color: THEMES[currentTheme as ThemeKey].colors.accent }}>.</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            backgroundColor: THEMES[currentTheme as ThemeKey].colors.card,
            color: THEMES[currentTheme as ThemeKey].colors.textMain,
            borderColor: THEMES[currentTheme as ThemeKey].colors.border,
          }}
          className="flex items-center gap-2 px-4 py-2 border rounded-full font-medium text-sm hover:opacity-80 transition-all"
        >
          <Palette size={16} />
          <span>{THEMES[currentTheme as ThemeKey].label}</span>
          <ChevronDown size={14} className={isMenuOpen ? "rotate-180" : ""} />
        </button>

        {isMenuOpen && (
          <div
            style={{
              backgroundColor: THEMES[currentTheme as ThemeKey].colors.card,
              borderColor: THEMES[currentTheme as ThemeKey].colors.border,
            }}
            className="absolute right-0 mt-2 w-56 border rounded-xl shadow-2xl overflow-hidden flex flex-col p-2 z-[60]"
          >
            {Object.entries(THEMES).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  setTheme(key);
                  setIsMenuOpen(false);
                }}
                className="text-left px-4 py-3 rounded-lg text-sm hover:opacity-70 transition-opacity flex items-center gap-3"
              >
                <div style={{ background: theme.colors.accent }} className="w-3 h-3 rounded-full" />
                <span style={{ color: THEMES[currentTheme as ThemeKey].colors.textMain }}>{theme.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  </nav>
);

const TechSculpture = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  const blocks = Array.from({ length: 16 });

  return (
    <div className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center">
      <div className="grid grid-cols-4 gap-3 md:gap-5 rotate-12 transform hover:rotate-0 transition-transform duration-1000 ease-out">
        {blocks.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.05, 1],
              backgroundColor: [t.colors.card, t.colors.accent, t.colors.card],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            style={{ borderColor: t.colors.border }}
            className="w-12 h-12 md:w-20 md:h-20 border rounded-lg shadow-xl backdrop-blur-sm"
          />
        ))}
      </div>
      <div 
        className="absolute inset-0 blur-[120px] -z-10 opacity-30"
        style={{ background: `radial-gradient(circle, ${t.colors.accent} 0%, transparent 70%)` }}
      />
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
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: t.colors.accent }}></span>
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: t.colors.accent }}></span>
            </span>
            <span style={{ color: t.colors.textSub }} className="text-xs font-mono uppercase tracking-widest">System Architect // Active</span>
          </div>

          <h1 style={{ color: t.colors.textMain }} className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            NEZAR <br /> SAAB<span style={{ color: t.colors.accent }}>.</span>
          </h1>

          <p style={{ color: t.colors.textSub }} className="max-w-md text-lg mb-10 leading-relaxed">
            Specializing in <span style={{ color: t.colors.textMain }} className="font-bold">Software Architecture</span> and scalable backend systems. Building the engines that power modern web applications.
          </p>

          <div 
            onClick={handleCopy}
            style={{ backgroundColor: t.colors.card, borderColor: t.colors.border }}
            className="group cursor-pointer relative max-w-sm w-full rounded-xl border p-4 transition-all hover:scale-[1.02]"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Terminal size={18} style={{ color: t.colors.accent }} />
                <span style={{ color: t.colors.textMain }} className="font-mono text-sm">nwa200079@gmail.com</span>
              </div>
              <span style={{ color: copied ? t.colors.accent : t.colors.textSub }} className="text-[10px] font-bold uppercase tracking-tighter">
                {copied ? "COPIED" : "CLICK TO COPY"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <TechSculpture theme={theme} />
        </div>
      </div>
    </section>
  );
};

// --- REMAINDER OF COMPONENTS (Services, Experience, etc.) ---

function ThemeCard({ children, theme, className = "" }: any) {
  const t = THEMES[theme as ThemeKey];
  return (
    <div 
      className={`relative border overflow-hidden transition-all duration-500 ${t.radius} ${className}`}
      style={{ backgroundColor: t.colors.card, borderColor: t.colors.border }}
    >
      <div className="relative p-8 h-full z-10">{children}</div>
    </div>
  );
}

const Services = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  const items = [
    { title: "Custom Web Apps", icon: Monitor, desc: "SaaS platforms and complex dashboards with deep logic." },
    { title: "System Design", icon: Cpu, desc: "Architecting scalable backends and database structures." },
    { title: "API Development", icon: Terminal, desc: "Robust API services built for performance and security." }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <ThemeCard key={i} theme={theme}>
            <item.icon size={32} style={{ color: t.colors.accent }} className="mb-6" />
            <h3 style={{ color: t.colors.textMain }} className="text-xl font-bold mb-2">{item.title}</h3>
            <p style={{ color: t.colors.textSub }} className="text-sm">{item.desc}</p>
          </ThemeCard>
        ))}
      </div>
    </section>
  );
};

const ExperienceList = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  const jobs = [
    {
      company: "Khales Group",
      role: "Software Engineer",
      year: "2025 - Present",
      desc: "Engineering scalable project management platforms and optimizing server-side logic (Python/PHP)."
    },
    {
      company: "Ava Five",
      role: "Next.js Developer",
      year: "2024",
      desc: "Optimizing code splitting, SSR, and real-time content integration for high-performance apps."
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 style={{ color: t.colors.textMain }} className="text-4xl font-bold mb-12">Experience</h2>
        <div className="space-y-12">
          {jobs.map((job, i) => (
            <div key={i} style={{ borderColor: t.colors.border }} className="border-l-2 pl-8 relative">
              <div style={{ backgroundColor: t.colors.accent }} className="absolute -left-[5px] top-0 w-2 h-2 rounded-full" />
              <div className="flex justify-between items-start mb-2">
                <h3 style={{ color: t.colors.textMain }} className="text-2xl font-bold">{job.company}</h3>
                <span style={{ color: t.colors.accent }} className="text-sm font-mono">{job.year}</span>
              </div>
              <p style={{ color: t.colors.textSub }} className="font-medium mb-2">{job.role}</p>
              <p style={{ color: t.colors.textSub }} className="text-sm leading-relaxed">{job.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  return (
    <footer className="py-20 px-6 text-center border-t" style={{ borderColor: t.colors.border }}>
      <h2 style={{ color: t.colors.textMain }} className="text-4xl md:text-6xl font-black mb-8 uppercase italic">Let's Connect</h2>
      <a href="mailto:nwa200079@gmail.com" style={{ color: t.colors.accent }} className="text-xl font-mono underline">nwa200079@gmail.com</a>
      <p style={{ color: t.colors.textSub }} className="mt-12 text-xs uppercase tracking-widest">© 2026 Nezar Saab. All rights reserved.</p>
    </footer>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("obsidian");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main
      className="min-h-screen transition-colors duration-700 ease-in-out relative"
      style={{ backgroundColor: THEMES[currentTheme].colors.bg }}
    >
      <Navbar
        currentTheme={currentTheme}
        setTheme={setCurrentTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Hero theme={currentTheme} />
      <Services theme={currentTheme} />
      <ExperienceList theme={currentTheme} />
      <Footer theme={currentTheme} />
    </main>
  );
}
