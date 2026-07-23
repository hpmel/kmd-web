import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ScrambleIn } from './components/ScrambleIn';
import { BookingPage } from './components/BookingPage';
import kmdLogo from './assets/Web-kmd-logo-noBG.png';
import { type Language, translations } from './utils/translations';

const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';
const atmosphereVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';
const landscapeVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4';
const footerVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="section-label">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [entranceComplete, setEntranceComplete] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const t = translations[lang];
  const isBookingPage = window.location.pathname.replace(/\\\/+$/, '') === '/diagnostic';
  const { scrollYProgress: manifestoProgress } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  });
  const smoothManifestoProgress = useSpring(manifestoProgress, { stiffness: 55, damping: 24, mass: 0.55 });
  const manifestoY = useTransform(smoothManifestoProgress, [0, 1], [70, -70]);
  const manifestoRotateX = useTransform(smoothManifestoProgress, [0, 0.5, 1], [10, 0, -7]);
  const manifestoOpacity = useTransform(smoothManifestoProgress, [0, 0.2, 0.82, 1], [0.25, 1, 1, 0.42]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setEntranceComplete(true), reduceMotion ? 0 : 420);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    if (!finePointer) {
      video.playbackRate = 0.7;
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
    let animationFrame = 0;
    let requestedTime = 0;

    const updateVideo = () => {
      animationFrame = 0;
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = Math.min(video.duration, Math.max(0, requestedTime));
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      requestedTime = (event.clientX / window.innerWidth) * video.duration;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateVideo);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  if (isBookingPage) {
    return <BookingPage lang={lang} setLang={setLang} />;
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Aller au contenu principal</a>
      <Navbar lang={lang} setLang={setLang} />

      <main id="main-content">
        <section id="top" className="hero-section" aria-labelledby="hero-title">
          <video
            ref={heroVideoRef}
            className="hero-video"
            src={heroVideo}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="dot-grid" aria-hidden="true" />
          <div className="hero-watermark" aria-hidden="true">
            <span>KMD</span><span>WEB</span>
          </div>

          <div className="hero-content">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="hero-copy"
            >
              <p className="hero-eyebrow"><Sparkles size={15} aria-hidden="true" /> {t.hero.eyebrow}</p>
              <h1 id="hero-title">
                <span className="hero-title-line">
                  <ScrambleIn text={t.hero.titleStart} delay={120} triggered={entranceComplete} />
                </span>
                <span className="hero-title-line hero-title-line-shifted">
                  <span className="hero-title-accent"><ScrambleIn text={t.hero.titleAccent} delay={380} triggered={entranceComplete} /></span>{' '}
                  <ScrambleIn text={t.hero.titleEnd} delay={560} triggered={entranceComplete} />
                </span>
              </h1>
              <p className="hero-description">{t.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  {t.hero.primaryCta}<ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a className="button button-secondary" href="#services">
                  {t.hero.secondaryCta}<ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            <motion.ul
              className="hero-proof"
              aria-label="Points clés"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.55 }}
            >
              {t.hero.proof.map((item) => <li key={item}>{item}</li>)}
            </motion.ul>
          </div>

          <p className="interaction-hint">
            <span aria-hidden="true" />
            {t.hero.interactionHint}
          </p>
        </section>

        <section ref={manifestoRef} className="manifesto-section wave-section">
          <video className="section-video" src={atmosphereVideo} autoPlay={!reduceMotion} muted loop playsInline preload="auto" aria-hidden="true" />
          <div className="section-overlay" aria-hidden="true" />
          <div className="wave-top-fade" aria-hidden="true" />
          <motion.div
            className="manifesto-content"
            style={reduceMotion ? undefined : { y: manifestoY, rotateX: manifestoRotateX, opacity: manifestoOpacity }}
          >
            <SectionLabel>{t.manifesto.label}</SectionLabel>
            <h2>{t.manifesto.title}</h2>
            <p>{t.manifesto.description}</p>
          </motion.div>
        </section>

        <section id="services" className="content-section services-section" aria-labelledby="services-title">
          <Reveal className="section-heading">
            <SectionLabel>{t.services.label}</SectionLabel>
            <h2 id="services-title">{t.services.title}</h2>
            <p>{t.services.intro}</p>
          </Reveal>

          <div className="services-grid">
            {t.services.items.map((service, index) => (
              <Reveal key={service.title} className="service-card" delay={index * 0.08}>
                <p className="card-eyebrow">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.outcomes.map((outcome) => (
                    <li key={outcome}><Check size={16} aria-hidden="true" />{outcome}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="metrics-section" aria-label="KMD Web en bref">
          <video className="section-video" src={landscapeVideo} autoPlay={!reduceMotion} muted loop playsInline preload="metadata" aria-hidden="true" />
          <div className="section-overlay metrics-overlay" aria-hidden="true" />
          <div className="metrics-grid">
            {t.metrics.map((metric, index) => (
              <Reveal key={metric.label} className="metric" delay={index * 0.08}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section projects-section" aria-labelledby="projects-title">
          <Reveal className="section-heading split-heading">
            <div>
              <SectionLabel>{t.projects.label}</SectionLabel>
              <h2 id="projects-title">{t.projects.title}</h2>
            </div>
            <p>{t.projects.intro}</p>
          </Reveal>

          <div className="projects-list">
            {t.projects.items.map((project, index) => (
              <Reveal key={project.title} className="project-card" delay={index * 0.06}>
                <span className="project-index">0{index + 1}</span>
                <div>
                  <p className="card-eyebrow">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <ArrowUpRight size={24} aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="content-section process-section" aria-labelledby="process-title">
          <Reveal className="section-heading">
            <SectionLabel>{t.process.label}</SectionLabel>
            <h2 id="process-title">{t.process.title}</h2>
          </Reveal>

          <ol className="process-list">
            {t.process.steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.06}>
                  <span>0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="about-visual" aria-hidden="true">
            <video src={footerVideo} autoPlay={!reduceMotion} muted loop playsInline preload="metadata" />
          </div>
          <Reveal className="about-copy">
            <SectionLabel>{t.about.label}</SectionLabel>
            <h2 id="about-title">{t.about.title}</h2>
            {t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="signature">{t.about.signature}</p>
          </Reveal>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <Reveal>
            <SectionLabel>{t.contact.label}</SectionLabel>
            <h2 id="contact-title">{t.contact.title}</h2>
            <p>{t.contact.description}</p>
            <div className="contact-actions">
              <a className="button button-primary" href="/diagnostic">
                {t.contact.primaryCta}<ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="/diagnostic#bonus">
                {t.contact.secondaryCta}
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" aria-label="Retour en haut">
          <img src={kmdLogo} alt="" />
        </a>
        <p>{t.footer.tagline}</p>
        <p>{t.footer.rights}</p>
      </footer>
    </div>
  );
}

export default App;
