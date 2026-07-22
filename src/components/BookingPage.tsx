import { useEffect, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock3, Gift, Mail, Sparkles, Video } from 'lucide-react';
import { Navbar } from './Navbar';
import kmdLogo from '../assets/Web-kmd-logo-noBG.png';
import type { Language } from '../utils/translations';

const bookingUrl = import.meta.env.VITE_BOOKING_URL?.trim();
const displayEmailAddress = 'kmd@kmdweb.ca';
const deliveryEmailAddress = 'desrochersmelanie@gmail.com';
const emailRequestUrl = 'mailto:' + deliveryEmailAddress + '?subject=' + encodeURIComponent('Consultation gratuite KMD Web') + '&body=' + encodeURIComponent(
  'Bonjour Mélanie,\n\nJe souhaite réserver une consultation gratuite.\n\nMon entreprise :\nMon principal défi numérique :\nMes disponibilités :\n\nMerci!',
);

const copy = {
  fr: {
    back: 'Retour au site',
    offer: 'Consultation gratuite · Offre limitée',
    titleStart: '30 minutes pour voir ce que le numérique peut',
    titleAccent: 'enlever',
    titleEnd: 'de votre liste.',
    intro: 'Un échange simple et concret pour repérer le meilleur levier : améliorer votre site, créer un outil sur mesure ou automatiser une tâche qui vous ralentit.',
    book: 'Choisir mon moment',
    emailBook: 'Demander mes disponibilités',
    reassurance: 'Sans engagement · En visioconférence · En français ou en anglais',
    agendaLabel: 'Votre diagnostic de 30 minutes',
    agendaTitle: 'On va droit à ce qui peut faire une différence.',
    agenda: [
      ['00–10', 'Votre réalité', 'Votre objectif, vos irritants et les tâches qui prennent trop de temps.'],
      ['10–20', 'Les occasions', 'Les améliorations Web, applicatives ou IA les plus pertinentes.'],
      ['20–30', 'La prochaine étape', 'Une recommandation claire, réaliste et adaptée à vos priorités.'],
    ],
    bonusLabel: 'Bonus pour une durée limitée',
    bonusTitle: 'Une mini-formation IA gratuite de 30 minutes.',
    bonusIntro: 'Après le diagnostic, vous pourrez aussi réserver une séance pratique pour découvrir des outils IA accessibles, même sans expérience technique.',
    bonusItems: ['Trouver de l’information plus vite', 'Rédiger et structurer vos idées', 'Créer des visuels et du contenu', 'Repérer les premières tâches à automatiser'],
    bonusNote: 'Séance distincte de 30 minutes · Disponible pour une durée limitée',
    panelLabel: 'Réserver maintenant',
    panelTitle: 'Votre première conversation commence ici.',
    panelText: 'Choisissez une plage de 30 minutes. Vous recevrez ensuite les détails de la visioconférence par courriel.',
    panelConfigured: 'Le calendrier sécurisé s’ouvrira dans un nouvel onglet.',
    panelFallback: 'Le calendrier automatique sera activé dès que votre agenda sera connecté. Pour l’instant, envoyez votre demande et je vous proposerai des disponibilités.',
    included: ['Consultation individuelle', 'Recommandations adaptées', 'Aucune préparation requise'],
    contact: 'Une question avant de réserver?',
    email: 'Écrire à Mélanie',
    privacy: 'Vos informations servent uniquement à organiser votre rendez-vous.',
    footer: 'Créations numériques avec une touche d’intelligence.',
  },
  en: {
    back: 'Back to the website',
    offer: 'Free consultation · Limited-time offer',
    titleStart: '30 minutes to see what digital tools can',
    titleAccent: 'remove',
    titleEnd: 'from your list.',
    intro: 'A straightforward conversation to identify the best lever: improve your website, build a tailored tool or automate work that slows you down.',
    book: 'Choose a time',
    emailBook: 'Request available times',
    reassurance: 'No commitment · Video call · French or English',
    agendaLabel: 'Your 30-minute discovery call',
    agendaTitle: 'We focus on what can make a real difference.',
    agenda: [
      ['00–10', 'Your reality', 'Your goal, friction points and the tasks taking too much time.'],
      ['10–20', 'The opportunities', 'The most relevant Web, application or AI improvements.'],
      ['20–30', 'The next step', 'A clear, realistic recommendation aligned with your priorities.'],
    ],
    bonusLabel: 'Limited-time bonus',
    bonusTitle: 'A free 30-minute AI mini-training.',
    bonusIntro: 'After the discovery call, you can also book a practical session to explore accessible AI tools — no technical experience required.',
    bonusItems: ['Find information faster', 'Write and organize ideas', 'Create visuals and content', 'Identify first tasks to automate'],
    bonusNote: 'Separate 30-minute session · Available for a limited time',
    panelLabel: 'Book now',
    panelTitle: 'Your first conversation starts here.',
    panelText: 'Choose a 30-minute time slot. You will receive the video-call details by email.',
    panelConfigured: 'The secure calendar will open in a new tab.',
    panelFallback: 'Automatic scheduling will be enabled once your calendar is connected. For now, send your request and I will suggest available times.',
    included: ['One-on-one consultation', 'Tailored recommendations', 'No preparation required'],
    contact: 'A question before booking?',
    email: 'Email Mélanie',
    privacy: 'Your information is used only to organize your appointment.',
    footer: 'Digital creations with a touch of intelligence.',
  },
};

function BookingReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function BookingPage({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  const t = copy[lang];
  const reduceMotion = useReducedMotion();
  const reservationUrl = bookingUrl || emailRequestUrl;

  useEffect(() => {
    document.title = lang === 'fr' ? 'Consultation gratuite | KMD Web' : 'Free consultation | KMD Web';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      lang === 'fr'
        ? 'Réservez une consultation numérique gratuite avec KMD Web et profitez, pour une durée limitée, d’une mini-formation IA de 30 minutes.'
        : 'Book a free digital consultation with KMD Web and, for a limited time, receive a free 30-minute AI mini-training.',
    );
  }, [lang]);

  return (
    <div className="site-shell booking-shell">
      <a className="skip-link" href="#booking-main">Aller au contenu principal</a>
      <Navbar lang={lang} setLang={setLang} isSubpage />

      <main id="booking-main">
        <section id="top" className="booking-hero" aria-labelledby="booking-title">
          <div className="booking-orbit" aria-hidden="true">
            <motion.span animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} />
          </div>
          <div className="dot-grid" aria-hidden="true" />

          <div className="booking-hero-copy">
            <a className="booking-back" href="/"><ArrowLeft size={16} aria-hidden="true" />{t.back}</a>
            <motion.p className="booking-offer" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.55 }}>
              <Sparkles size={15} aria-hidden="true" />{t.offer}
            </motion.p>
            <motion.h1 id="booking-title" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.08 }}>
              {t.titleStart} <span>{t.titleAccent}</span> {t.titleEnd}
            </motion.h1>
            <motion.p className="booking-intro" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.16 }}>
              {t.intro}
            </motion.p>
            <motion.div className="booking-hero-actions" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.28 }}>
              <a className="button button-primary" href="#reserve">{bookingUrl ? t.book : t.emailBook}<ArrowUpRight size={18} aria-hidden="true" /></a>
              <p><Video size={16} aria-hidden="true" />{t.reassurance}</p>
            </motion.div>
          </div>

          <div className="booking-time-seal" aria-hidden="true"><Clock3 size={28} /><strong>30</strong><span>MIN</span></div>
        </section>

        <section className="booking-agenda" aria-labelledby="agenda-title">
          <BookingReveal className="booking-section-heading">
            <p className="section-label"><span aria-hidden="true" />{t.agendaLabel}</p>
            <h2 id="agenda-title">{t.agendaTitle}</h2>
          </BookingReveal>
          <ol className="booking-timeline">
            {t.agenda.map(([time, title, description], index) => (
              <li key={time}>
                <BookingReveal delay={index * 0.08}>
                  <time>{time}</time>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </BookingReveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="booking-bonus" aria-labelledby="bonus-title">
          <BookingReveal className="bonus-card">
            <div className="bonus-mark" aria-hidden="true"><Gift size={28} /></div>
            <div className="bonus-copy">
              <p className="section-label"><span aria-hidden="true" />{t.bonusLabel}</p>
              <h2 id="bonus-title">{t.bonusTitle}</h2>
              <p>{t.bonusIntro}</p>
              <ul>{t.bonusItems.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
              <p className="bonus-note">{t.bonusNote}</p>
            </div>
          </BookingReveal>
        </section>

        <section id="reserve" className="booking-reserve" aria-labelledby="reserve-title">
          <BookingReveal className="reservation-panel">
            <div>
              <p className="section-label"><span aria-hidden="true" />{t.panelLabel}</p>
              <h2 id="reserve-title">{t.panelTitle}</h2>
              <p>{t.panelText}</p>
              <ul>{t.included.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
            </div>
            <div className="reservation-action">
              <CalendarDays size={34} aria-hidden="true" />
              <a className="button button-primary" href={reservationUrl} target={bookingUrl ? '_blank' : undefined} rel={bookingUrl ? 'noreferrer' : undefined}>
                {bookingUrl ? t.book : t.emailBook}<ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <p>{bookingUrl ? t.panelConfigured : t.panelFallback}</p>
            </div>
          </BookingReveal>

          <BookingReveal className="booking-contact" delay={0.1}>
            <div><Mail size={20} aria-hidden="true" /><span>{t.contact}</span></div>
            <a href={'mailto:' + deliveryEmailAddress}>{t.email} — {displayEmailAddress}</a>
            <small>{t.privacy}</small>
          </BookingReveal>
        </section>
      </main>

      <footer className="site-footer booking-footer">
        <a href="/" aria-label="KMD Web — Accueil"><img src={kmdLogo} alt="" /></a>
        <p>{t.footer}</p>
        <p>© 2026 KMD Web</p>
      </footer>
    </div>
  );
}
