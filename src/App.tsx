import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ScrambleIn } from './components/ScrambleIn';
import kmdLogo from './assets/Web-kmd-logo-noBG.png';
import { type Language, translations } from './utils/translations';

function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [lang, setLang] = useState<Language>('fr');

  // Trigger entrance animation after 800ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setEntranceComplete(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const t = translations[lang];

  // Section 1: Hero Mouse-Scrubbing Logic
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.pause();

    const handleSeeked = () => {
      isSeekingRef.current = false;
      const v = heroVideoRef.current;
      if (!v) return;
      const diff = v.currentTime - targetTimeRef.current;
      if (Math.abs(diff) > 0.01) {
        isSeekingRef.current = true;
        v.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener('seeked', handleSeeked);

    let lastClientX: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const v = heroVideoRef.current;
      if (!v) return;

      const duration = v.duration;
      if (isNaN(duration) || duration <= 0) return;

      let movementX = e.movementX;
      if (movementX === undefined) {
        if (lastClientX !== null) {
          movementX = e.clientX - lastClientX;
        } else {
          movementX = 0;
        }
        lastClientX = e.clientX;
      }

      // Delta based scrubbing with sensitivity factor of 0.8
      const deltaTime = movementX * 0.008 * 0.8;
      let nextTime = targetTimeRef.current + deltaTime;
      
      // Clamp between 0 and duration
      if (nextTime < 0) nextTime = 0;
      if (nextTime > duration) nextTime = duration;

      targetTimeRef.current = nextTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        v.currentTime = nextTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Section 2: Cinematic Text scroll based transform
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollYProgressSec2 } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"]
  });

  const smoothProgressSec2 = useSpring(scrollYProgressSec2, {
    stiffness: 15,
    damping: 32,
    mass: 1.8
  });

  const yScaleValue = useTransform(smoothProgressSec2, [0, 1], [60, -120]);
  const opacityValue = useTransform(smoothProgressSec2, [0.3, 0.5], [0, 1]);
  const transformTemplate = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  // Section 3: Metrics staggered animation variants
  const metricsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const metricItemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  // Section 4: Technology bottom grid staggered animation variants
  const techGridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const techGridItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const
      }
    }
  };

  const metricsData = [
    { val: t.latencyVal, label: t.latencyLabel },
    { val: t.accuracyVal, label: t.accuracyLabel },
    { val: t.paramsVal, label: t.paramsLabel }
  ];

  const techItemsData = [
    { title: t.techItem1Title, desc: t.techItem1Desc },
    { title: t.techItem2Title, desc: t.techItem2Desc },
    { title: t.techItem3Title, desc: t.techItem3Desc },
    { title: t.techItem4Title, desc: t.techItem4Desc }
  ];

  const archLayers = [
    { label: t.layer1Label, name: t.layer1Name },
    { label: t.layer2Label, name: t.layer2Name },
    { label: t.layer3Label, name: t.layer3Name }
  ];

  return (
    <div className="w-full text-white bg-black min-h-screen selection:bg-white/20 selection:text-white" style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} lang={lang} setLang={setLang} />

      {/* SECTION 1: Hero */}
      <section className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 z-10">
        {/* Background Video */}
        <video
          ref={heroVideoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        />

        {/* Dot Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Left Watermark "KMD" */}
        <div 
          className="absolute left-[5%] md:left-[8%] top-[35%] -translate-y-1/2 pointer-events-none select-none z-10"
        >
          <span 
            className="uppercase text-[clamp(80px,18vw,380px)] font-bold tracking-[-4px] opacity-10 text-transparent bg-clip-text font-['Anton_SC']"
            style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            KMD
          </span>
        </div>

        {/* Right Watermark "WEB" */}
        <div 
          className="absolute right-[5%] md:right-[8%] top-[52%] -translate-y-1/2 pointer-events-none select-none z-10"
        >
          <span 
            className="uppercase text-[clamp(80px,18vw,380px)] font-bold tracking-[-4px] opacity-10 text-transparent bg-clip-text font-['Anton_SC']"
            style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            WEB
          </span>
        </div>

        {/* Empty space pusher */}
        <div className="flex-grow" />

        {/* Hero Content Fades in on entranceComplete */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={entranceComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0 }}
          className="relative z-20 w-full flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text={t.brain} delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text={t.andBody} delay={500} triggered={entranceComplete} />
            </h1>
            
            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{ 
                duration: 0.9, 
                delay: 0.2, 
                ease: [0.215, 0.610, 0.355, 1.000] 
              }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
            >
              {Array.isArray(t.heroDesc) ? (
                t.heroDesc.map((line, idx) => (
                  <div key={idx} className="block whitespace-nowrap">
                    {line}
                  </div>
                ))
              ) : (
                t.heroDesc
              )}
            </motion.p>
          </div>

          {/* Right Column */}
          <div className="text-left md:text-right">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text={t.one} delay={700} triggered={entranceComplete} />
              <br />
              <ScrambleIn text={t.network} delay={1000} triggered={entranceComplete} />
            </h1>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Cinematic Text */}
      <section ref={section2Ref} className="relative w-full h-screen h-[100dvh] flex items-center justify-center overflow-hidden z-10 bg-black">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        />

        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-[#010103] to-transparent z-10" />

        {/* Content Box */}
        <div className="relative z-20 max-w-5xl px-6 sm:px-12 text-center select-none" style={{ perspective: 400, transformStyle: 'preserve-3d' }}>
          <motion.p
            style={{
              transform: transformTemplate,
              opacity: opacityValue,
              transformStyle: 'preserve-3d'
            }}
            className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em]"
          >
            {t.cinematicText}
          </motion.p>
        </div>
      </section>

      {/* SECTION 3: Metrics */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-32 px-6 bg-black overflow-hidden z-10">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        />

        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        <div className="relative z-20 max-w-6xl w-full flex flex-col items-center">
          {/* Subtitle */}
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
          >
            {t.metricsSubtitle}
          </motion.h4>

          {/* Metrics Grid */}
          <motion.div
            variants={metricsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 w-full text-center"
          >
            {metricsData.map((metric, idx) => (
              <motion.div 
                key={idx} 
                variants={metricItemVariants}
                className="flex flex-col items-center"
              >
                <span className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                  {metric.val}
                </span>
                <span className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Technology / Adaptive Intelligence */}
      <section className="relative w-full h-screen h-[100dvh] flex flex-col justify-between px-8 sm:px-12 md:px-16 py-12 sm:py-16 bg-black overflow-hidden z-10">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35 z-0" />

        {/* Top Area */}
        <div className="relative z-20 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* Left Heading */}
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
            className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
          >
            {t.techTitleLine1} <br /> {t.techTitleLine2}
          </motion.h2>

          {/* Right Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
          >
            {t.techDesc}
          </motion.p>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Bottom Grid */}
        <motion.div
          variants={techGridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 w-full"
        >
          {techItemsData.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={techGridItemVariants}
              className="flex flex-col"
            >
              <h5 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                {item.title}
              </h5>
              <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 5: Architecture */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-black px-6 py-32 z-10">
        <div className="max-w-3xl w-full text-center flex flex-col items-center">
          {/* Heading Block */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.0 }}
            className="w-full"
          >
            <h4 className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              {t.archSubtitle}
            </h4>
            <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
              {t.archTitle}
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              {t.archDesc}
            </p>
          </motion.div>

          {/* Layer Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-20 flex flex-col gap-4 w-full"
          >
            {archLayers.map((card, i) => (
              <div 
                key={i} 
                className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 mx-auto bg-white/[0.02] hover:border-white/20 transition-all duration-300"
              >
                <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase font-sans">
                  {card.label}
                </span>
                <span className="text-white text-[16px] sm:text-[18px] font-light">
                  {card.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative w-full bg-black overflow-hidden flex flex-col md:flex-row min-h-[400px] border-t border-white/10 z-10">
        {/* Left Column (Video) */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Right Column (Text Content) */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16 bg-[#000]">
          <div className="flex flex-col gap-10">
            <div className="flex items-center select-none">
              <img src={kmdLogo} alt="KMD Logo" className="h-16 sm:h-20 w-auto object-contain opacity-80" />
            </div>
            <p className="text-white/40 text-[18px] sm:text-[22px] leading-relaxed max-w-lg">
              {t.footerDesc}
            </p>

            <ul className="flex flex-col gap-3 text-[14px] sm:text-[16px] font-sans tracking-wider text-white/50 select-none">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="hover:text-white cursor-pointer transition-colors focus:outline-none"
                >
                  - {t.footerLinkAbout}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })}
                  className="hover:text-white cursor-pointer transition-colors focus:outline-none"
                >
                  - {t.footerLinkServices}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
                  className="hover:text-white cursor-pointer transition-colors focus:outline-none"
                >
                  - {t.footerLinkProjects}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
                  className="hover:text-white cursor-pointer transition-colors focus:outline-none"
                >
                  - {t.footerLinkContact}
                </button>
              </li>
            </ul>
          </div>

          <div className="text-white/25 text-[12px] mt-12">
            {t.footerCopyright}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
