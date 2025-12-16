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
// Define the specific styles for every mode requested
const THEMES = {
  obsidian: {
    label: "Industrial (Current)",
    colors: {
      bg: "#0a0a0a", // Deep Black
      card: "#171717",
      textMain: "#ffffff",
      textSub: "#a3a3a3",
      accent: "#a3e635", // Electric Lime
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
      accent: "#3b82f6", // Vivid Blue
      border: "#e4e4e7",
    },
    font: "font-sans",
    radius: "rounded-2xl",
  },
  classic: {
    label: "Timeless Classic",
    colors: {
      bg: "#fdfbf7", // Cream / Off-white
      card: "#ffffff",
      textMain: "#2c2420", // Deep Brown/Black
      textSub: "#594a42",
      accent: "#d4af37", // Gold
      border: "#e6e0d4",
    },
    font: "font-serif", // Uses Playfair Display
    radius: "rounded-sm", // Sharp corners
  },
  vintage: {
    label: "Retro 70s",
    colors: {
      bg: "#2b211e", // Dark Espresso
      card: "#4a3b32",
      textMain: "#fcecd0", // Warm Beige
      textSub: "#d4a373",
      accent: "#e76f51", // Burnt Orange
      border: "#5e4b40",
    },
    font: "font-mono",
    radius: "rounded-md",
  },
  chic: {
    label: "Chic & Soft", // Interactive for Women style
    colors: {
      bg: "#fff1f2", // Very light rose
      card: "#ffffff",
      textMain: "#4c0519", // Dark Rose
      textSub: "#9f1239",
      accent: "#fb7185", // Pink/Coral
      border: "#fecdd3",
    },
    font: "font-sans",
    radius: "rounded-[2rem]", // Very round (Pill shape)
  },
  professional: {
    label: "Corporate Pro",
    colors: {
      bg: "#0f172a", // Slate 900
      card: "#1e293b", // Slate 800
      textMain: "#f8fafc",
      textSub: "#94a3b8",
      accent: "#38bdf8", // Sky Blue
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
    className="fixed top-0 w-full z-50 px-6 py-6 border-b bg-[var(--bg)]/80 backdrop-blur-md transition-colors duration-500"
  >
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      <div
        style={{ color: THEMES[currentTheme as ThemeKey].colors.textMain }}
        className={`font-black text-2xl tracking-tighter ${
          THEMES[currentTheme as ThemeKey].font
        }`}
      >
        NS
        <span style={{ color: THEMES[currentTheme as ThemeKey].colors.accent }}>
          .
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            backgroundColor: THEMES[currentTheme as ThemeKey].colors.card,
            color: THEMES[currentTheme as ThemeKey].colors.textMain,
            borderColor: THEMES[currentTheme as ThemeKey].colors.border,
          }}
          className={`flex items-center gap-2 px-4 py-2 border rounded-full font-medium text-sm hover:opacity-80 transition-all`}
        >
          <Palette size={16} />
          <span>{THEMES[currentTheme as ThemeKey].label}</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isMenuOpen && (
          <div
            style={{
              backgroundColor: THEMES[currentTheme as ThemeKey].colors.card,
              borderColor: THEMES[currentTheme as ThemeKey].colors.border,
            }}
            className="absolute right-0 mt-2 w-56 border rounded-xl shadow-2xl overflow-hidden flex flex-col p-2"
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
                <div
                  style={{ background: theme.colors.accent }}
                  className="w-3 h-3 rounded-full"
                />
                <span
                  style={{
                    color: THEMES[currentTheme as ThemeKey].colors.textMain,
                  }}
                >
                  {theme.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  </nav>
);

// Dynamic Card Component that respects the active theme
function ThemeCard({
  children,
  theme,
  className = "",
}: {
  children: React.ReactNode;
  theme: ThemeKey;
  className?: string;
}) {
  const activeTheme = THEMES[theme];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border overflow-hidden transition-all duration-500 ${activeTheme.radius} ${className}`}
      style={{
        backgroundColor: activeTheme.colors.card,
        borderColor: activeTheme.colors.border,
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${activeTheme.colors.accent}15,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// Inside app/page.tsx

const Hero = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT: Text Content */}
        <motion.div
          // We add a key here so text re-animates slightly on theme change if you want,
          // or remove 'key' to keep text static while photo changes.
          className="order-2 md:order-1 relative z-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              style={{ backgroundColor: t.colors.accent }}
              className="h-[2px] w-12 transition-colors duration-500"
            ></div>
            <span
              style={{ color: t.colors.accent }}
              className="font-mono tracking-widest uppercase text-sm font-bold transition-colors duration-500"
            >
              Frontend Architect
            </span>
          </div>

          <h1
            style={{ color: t.colors.textMain }}
            className={`text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 transition-colors duration-500 ${t.font}`}
          >
            NEZAR <br />
            SAAB<span style={{ color: t.colors.accent }}>.</span>
          </h1>

          <p
            style={{ color: t.colors.textSub }}
            className="max-w-lg text-lg leading-relaxed mb-8 transition-colors duration-500"
          >
            Engineering highly interactive digital experiences in{" "}
            <span style={{ color: t.colors.textMain }} className="font-bold">
              Dubai
            </span>
            . Turning complex logic into pixel-perfect interfaces.
          </p>

          <div className="flex gap-4">
            {/* Buttons... */}
            {["GitHub", "LinkedIn"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: t.colors.textSub,
                  borderColor: t.colors.border,
                }}
                className="px-6 py-3 border rounded-full hover:scale-105 transition-all font-mono uppercase text-sm flex items-center gap-2 group bg-white/5 backdrop-blur-sm"
              >
                <span
                  className="group-hover:text-[var(--accent)]"
                  style={{ "--accent": t.colors.accent } as any}
                >
                  {item}
                </span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Dynamic Photo Switching */}
        <div className="order-1 md:order-2 relative flex justify-center md:justify-end mt-10 md:mt-0 h-[450px] md:h-[650px] w-full">
          {/* Ambient Glow behind the photo */}
          <motion.div
            animate={{ backgroundColor: t.colors.accent }}
            className="absolute top-20 right-10 w-64 h-64 rounded-full blur-[100px] opacity-20"
          />

          {/* This handles the smooth fading between images */}
          <AnimatePresence mode="wait">
            <motion.img
              key={theme} // This triggers the animation when theme changes
              // MAKE SURE YOU NAME YOUR FILES EXACTLY LIKE THIS IN PUBLIC FOLDER
              src="https://i.ibb.co/yn24JrmR/Black-and-White-Headshots-Nearme-karenvaisman-photographer-Ventura-losangeles-Burbank-Woodland-Hills.png"
              alt="Nezar Saab"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative z-10 w-[350px] md:w-[500px] h-full object-cover object-top"
              style={{
                // Gradient fade at bottom to blend into background
                maskImage: `linear-gradient(to bottom, black 80%, transparent 100%)`,
                WebkitMaskImage: `linear-gradient(to bottom, black 80%, transparent 100%)`,
              }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const BentoGrid = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  const stacks = [
    { icon: Layout, title: "Next.js 14", sub: "App Router" },
    { icon: Cpu, title: "React Core", sub: "Performance" },
    { icon: Terminal, title: "TypeScript", sub: "Strict Typing" },
    { icon: Database, title: "State Mgmt", sub: "Redux / Zustand" },
  ];

  return (
    <section className="py-32 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2
            style={{ color: t.colors.textMain }}
            className={`text-4xl md:text-6xl font-bold mb-6 ${t.font}`}
          >
            Built for <span style={{ color: t.colors.accent }}>Scale</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ThemeCard
            theme={theme}
            className="col-span-1 md:col-span-2 row-span-2 p-8 min-h-[400px] flex flex-col justify-between"
          >
            <div>
              <div
                style={{
                  backgroundColor: `${t.colors.accent}15`,
                  color: t.colors.accent,
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
              >
                <Globe size={24} />
              </div>
              <h3
                style={{ color: t.colors.textMain }}
                className={`text-3xl font-bold mb-4 ${t.font}`}
              >
                Frontend Lead
              </h3>
              <p
                style={{ color: t.colors.textSub }}
                className="leading-relaxed"
              >
                Delivering high-stakes projects at{" "}
                <strong style={{ color: t.colors.textMain }}>Ava Five</strong>.
                Specializing in complex architecture.
              </p>
            </div>
            <div className="mt-8 flex gap-3 flex-wrap">
              {["React", "Dubai", "Fintech"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: t.colors.bg,
                    color: t.colors.textSub,
                    borderColor: t.colors.border,
                  }}
                  className="px-3 py-1 border rounded-full text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ThemeCard>

          {stacks.map((s, i) => (
            <ThemeCard
              key={i}
              theme={theme}
              className="col-span-1 p-6 flex flex-col justify-center gap-4"
            >
              <s.icon style={{ color: t.colors.accent }} size={32} />
              <div>
                <h4
                  style={{ color: t.colors.textMain }}
                  className="font-bold text-lg"
                >
                  {s.title}
                </h4>
                <p style={{ color: t.colors.textSub }} className="text-sm">
                  {s.sub}
                </p>
              </div>
            </ThemeCard>
          ))}

          <div
            className={`col-span-1 md:col-span-4 p-8 flex items-center justify-between group cursor-pointer overflow-hidden relative ${t.radius}`}
            style={{ backgroundColor: t.colors.accent }}
          >
            <h3
              className={`font-black text-3xl md:text-5xl uppercase italic tracking-tighter ${
                t.colors.bg === "#ffffff" ? "text-white" : "text-black"
              }`}
            >
              View Full Resume
            </h3>
            <ArrowUpRight
              className={`${
                t.colors.bg === "#ffffff" ? "text-white" : "text-black"
              } transition-transform group-hover:rotate-45`}
              size={48}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceList = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];

  const jobs = [
    {
      company: "khales.ae",
      role: "Software Engineer (Next.js & React)",
      year: "Feb 2025 - Present",
      location: "Dubai, UAE · On-site",
      description: [
        "Architecting a large-scale, multilingual project management platform (Arabic/English) using Next.js 14 and SSR for maximum SEO performance.",
        "Managing complex global state and real-time data synchronization using Context API and TypeScript to ensure 99.9% data accuracy.",
        "Establishing the component library architecture with Tailwind CSS, reducing development time for new features by ~40%.",
      ],
      skills: [
        "Next.js 14",
        "TypeScript",
        "Performance Architecture",
        "SSR/SSG",
      ],
    },
    {
      company: "Avafive",
      role: "Frontend Developer",
      year: "Apr 2024 - Dec 2024",
      location: "Dubai, UAE · Hybrid",
      description: [
        "Delivered interactive Fintech dashboards translating complex financial data into intuitive React UI components.",
        "Optimized application core vitals by implementing lazy loading and code-splitting, resulting in sub-second load times.",
        "Collaborated directly with backend teams to integrate secure RESTful APIs and managed scaleable Redux state logic.",
      ],
      skills: ["React.js", "Redux Toolkit", "Fintech UX", "API Integration"],
    },
  ];

  return (
    <section
      style={{ borderColor: t.colors.border }}
      className="py-24 border-t transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h2
            style={{ color: t.colors.textMain }}
            className={`text-4xl font-bold mb-4 ${t.font}`}
          >
            Professional{" "}
            <span style={{ color: t.colors.accent }}>Experience</span>
          </h2>
        </div>

        {jobs.map((job, i) => (
          <div
            key={i}
            style={{ borderColor: t.colors.border }}
            className="border-l-2 pl-8 pb-16 last:pb-0 relative transition-colors duration-300"
          >
            {/* Timeline Dot */}
            <div
              style={{
                backgroundColor: t.colors.bg,
                borderColor: t.colors.accent,
              }}
              className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2"
            />

            <div className="mb-4">
              <h3
                style={{ color: t.colors.textMain }}
                className={`text-3xl font-bold mb-1 ${t.font}`}
              >
                {job.company}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <span
                  style={{ color: t.colors.accent }}
                  className="text-lg font-medium tracking-wide"
                >
                  {job.role}
                </span>
                <span
                  style={{ color: t.colors.textSub }}
                  className="text-sm font-mono bg-white/5 px-2 py-1 rounded"
                >
                  {job.year}
                </span>
              </div>
              <p
                style={{ color: t.colors.textSub }}
                className="text-xs font-mono uppercase tracking-widest opacity-70"
              >
                {job.location}
              </p>
            </div>

            <div className="mb-6">
              <ul style={{ color: t.colors.textSub }} className="space-y-4">
                {job.description.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-base leading-relaxed"
                  >
                    <span
                      style={{ color: t.colors.accent }}
                      className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-current opacity-70"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    color: t.colors.textMain,
                    borderColor: t.colors.border,
                  }}
                  className="text-xs font-bold px-3 py-1 rounded border opacity-60 hover:opacity-100 transition-opacity"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* DOWNLOAD RESUME BUTTON */}
        <div
          className="mt-16 pt-8 border-t border-dashed"
          style={{ borderColor: t.colors.border }}
        >
          <a
            href="/my-resume.pdf"
            download
            style={{ color: t.colors.textMain }}
            className="group flex items-center gap-3 text-sm font-bold hover:opacity-70 transition-opacity"
          >
            <div
              style={{ backgroundColor: t.colors.accent }}
              className="w-2 h-2 rounded-full animate-pulse"
            />
            Download Full Resume (PDF) for more details
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  return (
    <footer id="contact" className="pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2
          style={{ color: t.colors.textMain }}
          className={`text-5xl md:text-8xl font-black tracking-tighter mb-12 ${t.font}`}
        >
          LET'S WORK <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, ${t.colors.accent}, ${t.colors.accent}80)`,
            }}
          >
            TOGETHER
          </span>
        </h2>

        <a
          href="mailto:nwa200079@gmail.com"
          style={{ color: t.colors.textMain, borderColor: t.colors.border }}
          className="inline-flex items-center gap-3 text-2xl md:text-3xl border-b-2 pb-2 mb-20 hover:opacity-80 transition-opacity"
        >
          <Mail /> nwa200079@gmail.com
        </a>

        <div
          style={{ borderColor: t.colors.border, color: t.colors.textSub }}
          className="w-full flex justify-between items-end border-t pt-8 font-mono text-sm uppercase"
        >
          <p>Dubai, United Arab Emirates</p>
          <p>© 2025 Nezar Saab.</p>
        </div>
      </div>
    </footer>
  );
};

// --- NEW COMPONENT: SERVICES ---
const Services = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];

  const services = [
    {
      title: "Landing Pages",
      desc: "High-conversion single-page sites designed to capture leads. Optimized for speed, SEO, and persuasive storytelling.",
      icon: Rocket,
      tags: ["Framer Motion", "Conversion", "SEO"],
    },
    {
      title: "Custom Web Apps",
      desc: "Complex SaaS platforms and dashboards. I build the logic, state management, and API integrations for heavy-duty tools.",
      icon: Monitor,
      tags: ["React.js", "Next.js", "SaaS"],
    },
    {
      title: "Corporate Identity",
      desc: "Large-scale multi-page websites for established companies. CMS integration (Sanity/Strapi) for easy content updates.",
      icon: Briefcase,
      tags: ["CMS", "Brand Consistency", "Scale"],
    },
    {
      title: "Portfolio Websites",
      desc: "Personal branding sites (like this one) for executives and creatives. Interactive, memorable, and unique.",
      icon: Smartphone,
      tags: ["Personal Brand", "Interactive", "3D"],
    },
    {
      title: "E-Commerce / Commercial",
      desc: "Shopify Headless or Custom Next.js stores. Focused on user experience, cart logic, and payment gateway security.",
      icon: Store,
      tags: ["Stripe", "Shopify", "UI/UX"],
    },
  ];

  return (
    <section className="py-24 px-6 transition-colors duration-500 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            style={{ color: t.colors.textMain }}
            className={`text-4xl md:text-6xl font-black mb-6 ${t.font}`}
          >
            I Engineer <span style={{ color: t.colors.accent }}>Value</span>.
          </h2>
          <p style={{ color: t.colors.textSub }} className="text-xl max-w-2xl">
            From high-speed marketing pages to complex enterprise dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ThemeCard
              key={index}
              theme={theme}
              className={`p-8 flex flex-col justify-between min-h-[280px] hover:-translate-y-2 transition-transform duration-300 ${
                index === 0 || index === 3 ? "lg:col-span-2" : "col-span-1"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div
                    style={{
                      backgroundColor: `${t.colors.accent}15`,
                      color: t.colors.accent,
                    }}
                    className="p-3 rounded-lg"
                  >
                    <service.icon size={28} />
                  </div>
                  <ArrowUpRight
                    style={{ color: t.colors.textSub }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <h3
                  style={{ color: t.colors.textMain }}
                  className={`text-2xl font-bold mb-3 ${t.font}`}
                >
                  {service.title}
                </h3>

                <p
                  style={{ color: t.colors.textSub }}
                  className="leading-relaxed text-sm"
                >
                  {service.desc}
                </p>
              </div>

              <div
                className="flex gap-2 flex-wrap mt-8 pt-8 border-t border-neutral-800/50"
                style={{ borderColor: `${t.colors.border}` }}
              >
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      color: t.colors.textMain,
                      backgroundColor: `${t.colors.textMain}05`,
                    }}
                    className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ThemeCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- NEW COMPONENT: INTERACTIVE FLUID BACKGROUND ---
const InteractiveBackground = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  // Create smooth spring physics for the blobs so they lag behind the cursor slightly (liquid feel)
  const springConfig = { damping: 25, stiffness: 150 };
  const x1 = useSpring(mouseX, springConfig);
  const y1 = useSpring(mouseY, springConfig);

  // Inverse movement for the second blob
  const x2 = useTransform(mouseX, (value) =>
    typeof window !== "undefined" ? window.innerWidth - value : 0
  );
  const y2 = useTransform(mouseY, (value) =>
    typeof window !== "undefined" ? window.innerHeight - value : 0
  );
  const springX2 = useSpring(x2, springConfig);
  const springY2 = useSpring(y2, springConfig);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Smoothly update mouse values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Return empty shell during SSR
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{ backgroundColor: t.colors.bg }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Technical Grid Overlay (Subtle) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${t.colors.textSub} 1px, transparent 1px), linear-gradient(90deg, ${t.colors.textSub} 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* 2. Noise Texture (The "High-End" Film Grain Look) */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay z-10"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      {/* 3. Primary Interactive Blob (Follows Mouse) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        style={{
          x: x1,
          y: y1,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: t.colors.accent,
        }}
      />

      {/* 4. Secondary Counter-Blob (Moves Opposite) */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
        style={{
          x: springX2,
          y: springY2,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: t.colors.accent,
        }}
      />

      {/* 5. Ambient Center Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-5"
        style={{ backgroundColor: t.colors.textMain }}
      />
    </div>
  );
};

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("obsidian");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main
      className="min-h-screen transition-colors duration-700 ease-in-out relative overflow-hidden"
      style={{ backgroundColor: THEMES[currentTheme].colors.bg }}
    >
      {/* ⬇️ INTERACTIVE FLUID BACKGROUND ⬇️ */}
      <InteractiveBackground theme={currentTheme} />

      <Navbar
        currentTheme={currentTheme}
        setTheme={setCurrentTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* All content wrapped in z-10 so it sits ON TOP of background */}
      <div className="relative z-10">
        <Hero theme={currentTheme} />
        <Services theme={currentTheme} />
        <BentoGrid theme={currentTheme} />
        <ExperienceList theme={currentTheme} />
        <Footer theme={currentTheme} />
      </div>
    </main>
  );
}
