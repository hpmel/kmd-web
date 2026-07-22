import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import kmdLogo from '../assets/Web-kmd-logo-noBG.png';
import { type Language, translations } from '../utils/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isSubpage?: boolean;
}

const sectionLinks = ['services', 'projects', 'about', 'contact'] as const;

export function Navbar({ lang, setLang, isSubpage = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;

    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, lang]);

  const closeMenu = () => setIsMenuOpen(false);
  const sectionHref = (section: string) => (isSubpage ? '/#' : '#') + section;

  return (
    <header className="site-header">
      <a className="brand-link" href={sectionHref('top')} aria-label="KMD Web — Accueil" onClick={closeMenu}>
        <img src={kmdLogo} alt="" className="brand-logo" />
      </a>

      <nav className="desktop-nav" aria-label="Navigation principale">
        {sectionLinks.map((link) => (
          <a key={link} href={sectionHref(link)}>{t.nav[link]}</a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="language-button"
          type="button"
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          aria-label={t.menu.language}
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>

        <button
          className="menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? t.menu.close : t.menu.open}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className={isMenuOpen ? 'menu-icon is-open' : 'menu-icon'}>
            <span />
            <span />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navigation mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {sectionLinks.map((link, index) => (
              <motion.a
                key={link}
                href={`#${link}`}
                onClick={closeMenu}
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.05 }}
              >
                <span>0{index + 1}</span>
                {t.nav[link]}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
