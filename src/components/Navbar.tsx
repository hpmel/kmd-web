import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import kmdLogo from '../assets/Web-kmd-logo-noBG.png';
import { ScrambleIn } from './ScrambleIn';
import { ScrambleText } from './ScrambleText';
import { SquashHamburger } from './SquashHamburger';
import { type Language, translations } from '../utils/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isSubpage?: boolean;
}

const sectionLinks = ['services', 'projects', 'about', 'contact'] as const;
const bubbleSpecs = [
  { left: '19%', size: 6, duration: 3.4, delay: 0.2 },
  { left: '32%', size: 9, duration: 4.1, delay: 1.1 },
  { left: '47%', size: 5, duration: 3.1, delay: 0.6 },
  { left: '61%', size: 8, duration: 4.5, delay: 1.7 },
  { left: '74%', size: 6, duration: 3.7, delay: 0.9 },
];

function BubbleField() {
  return (
    <span className="nav-bubbles" aria-hidden="true">
      {bubbleSpecs.map((bubble) => (
        <span
          key={bubble.left}
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: bubble.duration + 's',
            animationDelay: bubble.delay + 's',
          }}
        />
      ))}
    </span>
  );
}

export function Navbar({ lang, setLang, isSubpage = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<(typeof sectionLinks)[number] | null>(null);
  const reduceMotion = useReducedMotion();
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, lang]);

  const closeMenu = () => setIsMenuOpen(false);
  const sectionHref = (section: string) => (isSubpage ? '/#' : '#') + section;

  return (
    <header className="site-header">
      <a className="brand-link" href={sectionHref('top')} aria-label="KMD Web — Accueil" onClick={closeMenu}>
        <img src={kmdLogo} alt="" className="brand-logo" />
      </a>

      <div className="header-actions">
        <button
          className="language-button nav-orb"
          type="button"
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          aria-label={t.menu.language}
        >
          <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
          <BubbleField />
        </button>

        <div className={isMenuOpen ? 'menu-capsule is-open' : 'menu-capsule'}>
          <div className="menu-toggle-shell">
            <SquashHamburger
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              ariaLabel={isMenuOpen ? t.menu.close : t.menu.open}
              ariaExpanded={isMenuOpen}
              ariaControls="site-navigation"
            />
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id="site-navigation"
                className="desktop-capsule-nav"
                aria-label="Navigation principale"
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
                transition={{ duration: reduceMotion ? 0 : 0.24 }}
              >
                {sectionLinks.map((link) => (
                  <a
                    key={link}
                    href={sectionHref(link)}
                    onClick={closeMenu}
                    onMouseEnter={() => setHoveredLink(link)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <ScrambleText text={t.nav[link]} isHovered={hoveredLink === link} />
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
          {!isMenuOpen && <BubbleField />}
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Navigation mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
          >
            {sectionLinks.map((link, index) => (
              <motion.a
                key={link}
                href={sectionHref(link)}
                onClick={closeMenu}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.07 }}
              >
                <span>0{index + 1}</span>
                <ScrambleIn text={t.nav[link]} delay={index * 90} triggered={isMenuOpen} />
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
