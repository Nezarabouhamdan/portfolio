// --- NEW COMPONENT: TECH SCULPTURE (بديل الصورة) ---
// هذا المكون يرسم شبكة معالجة بيانات متحركة تعكس جو الـ System Architecture
const TechSculpture = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  // مصفوفة لإنشاء الشبكة
  const blocks = Array.from({ length: 16 }); // 4x4 Grid

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="grid grid-cols-4 gap-4 rotate-12 transform hover:rotate-0 transition-transform duration-700 ease-out">
        {blocks.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 0.9, 1],
              backgroundColor: [t.colors.card, t.colors.accent, t.colors.card],
            }}
            transition={{
              duration: Math.random() * 3 + 2, // توقيت عشوائي لكل مربع
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "8px",
              border: `1px solid ${t.colors.border}`,
            }}
            className="backdrop-blur-sm shadow-2xl"
          />
        ))}
      </div>
      {/* خلفية مشعة */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 blur-[80px] -z-10"
        style={{
          background: `radial-gradient(circle, ${t.colors.accent}40 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

// --- UPDATED HERO SECTION ---
const Hero = ({ theme }: { theme: ThemeKey }) => {
  const t = THEMES[theme];
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nwa200079@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: Text Content */}
        <motion.div className="order-2 md:order-1 relative z-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border bg-white/5 backdrop-blur-md" style={{ borderColor: t.colors.border }}>
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: t.colors.accent }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: t.colors.accent }}></span>
                </span>
                <span style={{ color: t.colors.textSub }} className="text-xs font-mono uppercase tracking-wider">
                  System Online
                </span>
            </div>
          </div>

          <h1
            style={{ color: t.colors.textMain }}
            className={`text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 transition-colors duration-500 ${t.font}`}
          >
            NEZAR <br />
            SAAB<span style={{ color: t.colors.accent }}>.</span>
          </h1>

          <p
            style={{ color: t.colors.textSub }}
            className="max-w-lg text-lg leading-relaxed mb-10 transition-colors duration-500"
          >
            Senior Software Engineer focused on <span style={{ color: t.colors.textMain }}>Scalable Architecture</span> and High-Performance Systems. Transforming business logic into robust code.
          </p>

          {/* بديل الكبسات: منطقة نسخ الإيميل بستايل Terminal */}
          <div className="flex flex-col gap-4">
            <div 
              onClick={handleCopyEmail}
              className="group cursor-pointer relative max-w-md w-full overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02]"
              style={{ 
                backgroundColor: t.colors.card,
                borderColor: t.colors.border 
              }}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Mail size={20} style={{ color: t.colors.accent }} />
                  <span className="font-mono text-sm md:text-base" style={{ color: t.colors.textMain }}>
                    nwa200079@gmail.com
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                   <span 
                     style={{ color: copied ? t.colors.accent : t.colors.textSub }} 
                     className="text-xs font-bold uppercase tracking-widest transition-colors"
                   >
                     {copied ? "COPIED" : "COPY"}
                   </span>
                   {/* أيقونة صغيرة تتغير عند النسخ */}
                   <div 
                     className={`w-2 h-2 rounded-full transition-colors duration-300 ${copied ? 'bg-[var(--accent)]' : 'bg-transparent border border-[var(--sub)]'}`}
                     style={{ 
                       '--accent': t.colors.accent, 
                       '--sub': t.colors.textSub 
                     } as any}
                   />
                </div>
              </div>
              
              {/* شريط تقدم وهمي أسفل الكرت يعطي منظر تقني */}
              <div 
                className="h-1 w-full opacity-20" 
                style={{ 
                  background: `repeating-linear-gradient(90deg, ${t.colors.accent}, ${t.colors.accent} 4px, transparent 4px, transparent 8px)` 
                }} 
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Tech Sculpture Animation (بديل الصورة) */}
        <div className="order-1 md:order-2 relative flex justify-center items-center h-[500px]">
           <TechSculpture theme={theme} />
        </div>

      </div>
    </section>
  );
};
