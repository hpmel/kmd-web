import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SquashHamburger } from './SquashHamburger';
import { ScrambleText } from './ScrambleText';
import kmdLogo from '../assets/Web-kmd-logo-noBG.png';
import { type Language, translations } from '../utils/translations';

interface NavbarProps {
  entranceComplete: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
}

// Interactive floating bubbles component (scaled up for larger buttons)
const BubblesEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
      {[...Array(6)].map((_, i) => {
        const size = Math.random() * 6 + 5; // 5px to 11px
        const leftOffset = Math.random() * 60 + 20; // 20% to 80%
        const duration = Math.random() * 2 + 2.5; // 2.5s to 4.5s
        const delay = Math.random() * 2;
        
        return (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full bg-pink-500/25 border border-white/25 select-none pointer-events-none"
            style={{
              width: size,
              height: size,
              left: `${leftOffset}%`,
            }}
            animate={{
              y: [0, -70],
              x: [0, Math.random() * 20 - 10],
              scale: [0.6, 1.3, 0.4],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeOut"
            }}
          />
        );
      })}
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ entranceComplete, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Hover states for four links
  const [isHoveredAbout, setIsHoveredAbout] = useState(false);
  const [isHoveredServices, setIsHoveredServices] = useState(false);
  const [isHoveredProjects, setIsHoveredProjects] = useState(false);
  const [isHoveredContact, setIsHoveredContact] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const springTransition = { type: "spring" as const, stiffness: 350, damping: 28 };

  const handleScrollTo = (multiplier: number) => {
    window.scrollTo({
      top: window.innerHeight * multiplier,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  const t = translations[lang];

  // Significantly larger dimensions to balance KMD logo size
  const menuWidth = isMenuOpen 
    ? (isMobile ? 'calc(100vw - 32px - 72px)' : 580) 
    : (isMobile ? 56 : 80);

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full px-4 sm:px-8 flex items-start justify-between z-50 pointer-events-none pt-4 sm:pt-6"
      initial={{ opacity: 0 }}
      animate={entranceComplete ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left side: Larger Logo (collapses on mobile when menu opens) */}
      <motion.div 
        className="pointer-events-auto flex items-start overflow-hidden flex-shrink-0"
        animate={{
          width: isMobile && isMenuOpen ? 0 : 'auto',
          opacity: isMobile && isMenuOpen ? 0 : 1,
        }}
        transition={springTransition}
      >
        <motion.img 
          src={kmdLogo} 
          alt="KMD Logo" 
          className="h-25 sm:h-42 w-auto object-contain select-none cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </motion.div>

      {/* Right side: Language Switcher + Expanding Menu capsule */}
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 justify-end ml-auto">
        {/* Language Switcher Button (Large Pill with Glow & Bubbles) */}
        <motion.button
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          className="relative flex items-center justify-center bg-white/10 backdrop-blur-md text-white select-none font-sans font-black uppercase flex-shrink-0
            h-14 px-5 rounded-full text-[13px]
            sm:h-20 sm:px-8 sm:text-[18px]
            border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]
            hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:border-pink-500/40 hover:bg-white/15
            transition-colors duration-300 cursor-pointer focus:outline-none overflow-visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
        >
          <span className="relative z-10">{lang === 'fr' ? 'EN' : 'FR'}</span>
          <BubblesEffect />
        </motion.button>

        {/* Menu capsule (Large Pill with Glow & Bubbles) */}
        <motion.div
          className="relative flex items-center bg-white/10 backdrop-blur-md text-white rounded-full h-14 sm:h-20 border border-white/20
            shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:border-pink-500/35
            transition-shadow duration-300 overflow-visible"
          animate={{ width: menuWidth }}
          transition={springTransition}
        >
          <div className="flex items-center w-full h-full relative z-10">
            {/* Hamburger wrapper */}
            <div className={`flex items-center justify-center flex-shrink-0
              ${isMenuOpen 
                ? 'w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 ml-2 sm:ml-3' 
                : 'w-14 h-14 sm:w-20 sm:h-20'}`}
            >
              <SquashHamburger 
                isOpen={isMenuOpen} 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
              />
            </div>

            {/* Links */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  className="flex items-center gap-4 sm:gap-8 ml-3 sm:ml-8 pr-5 sm:pr-10"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    onClick={() => handleScrollTo(1)}
                    onMouseEnter={() => setIsHoveredAbout(true)}
                    onMouseLeave={() => setIsHoveredAbout(false)}
                    className="text-[13px] sm:text-[18px] font-extrabold text-white/85 hover:text-white cursor-pointer focus:outline-none whitespace-nowrap"
                  >
                    <ScrambleText text={t.about} isHovered={isHoveredAbout} />
                  </button>
                  <button 
                    onClick={() => handleScrollTo(3)}
                    onMouseEnter={() => setIsHoveredServices(true)}
                    onMouseLeave={() => setIsHoveredServices(false)}
                    className="text-[13px] sm:text-[18px] font-extrabold text-white/85 hover:text-white cursor-pointer focus:outline-none whitespace-nowrap"
                  >
                    <ScrambleText text={t.services} isHovered={isHoveredServices} />
                  </button>
                  <button 
                    onClick={() => handleScrollTo(2)}
                    onMouseEnter={() => setIsHoveredProjects(true)}
                    onMouseLeave={() => setIsHoveredProjects(false)}
                    className="text-[13px] sm:text-[18px] font-extrabold text-white/85 hover:text-white cursor-pointer focus:outline-none whitespace-nowrap"
                  >
                    <ScrambleText text={t.projects} isHovered={isHoveredProjects} />
                  </button>
                  <button 
                    onClick={() => {
                      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                    onMouseEnter={() => setIsHoveredContact(true)}
                    onMouseLeave={() => setIsHoveredContact(false)}
                    className="text-[13px] sm:text-[18px] font-extrabold text-white/85 hover:text-white cursor-pointer focus:outline-none whitespace-nowrap"
                  >
                    <ScrambleText text={t.contact} isHovered={isHoveredContact} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Bubbles on the Menu capsule (only when closed) */}
          {!isMenuOpen && <BubblesEffect />}
        </motion.div>
      </div>
    </motion.nav>
  );
};
