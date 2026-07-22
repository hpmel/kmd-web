export type Language = 'fr' | 'en';

export type SiteCopy = {
  nav: { services: string; projects: string; about: string; contact: string };
  menu: { open: string; close: string; language: string };
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    proof: string[];
    interactionHint: string;
  };
  manifesto: { label: string; title: string; description: string };
  services: {
    label: string;
    title: string;
    intro: string;
    items: Array<{ eyebrow: string; title: string; description: string; outcomes: string[] }>;
  };
  metrics: Array<{ value: string; label: string }>;
  projects: {
    label: string;
    title: string;
    intro: string;
    items: Array<{ type: string; title: string; description: string }>;
  };
  process: {
    label: string;
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
  about: { label: string; title: string; paragraphs: string[]; signature: string };
  contact: {
    label: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: { tagline: string; rights: string };
};

export const translations: Record<Language, SiteCopy> = {
  fr: {
    nav: { services: 'Services', projects: 'Projets', about: 'À propos', contact: 'Contact' },
    menu: {
      open: 'Ouvrir le menu',
      close: 'Fermer le menu',
      language: 'Afficher le site en anglais',
    },
    hero: {
      eyebrow: 'Sites Web · Applications · Automatisation IA',
      titleStart: 'Des outils numériques qui',
      titleAccent: 'travaillent',
      titleEnd: 'pour votre entreprise.',
      description: "KMD Web conçoit des sites, des applications et des automatisations qui réduisent le travail manuel et transforment davantage de visiteurs en clients.",
      primaryCta: 'Parler de mon projet',
      secondaryCta: 'Découvrir les services',
      proof: ['8+ ans en développement', 'Solutions sur mesure', 'Basée au Québec'],
      interactionHint: 'Bougez la souris pour explorer',
    },
    manifesto: {
      label: 'La différence KMD',
      title: 'La technologie devrait vous faire gagner du temps, pas vous en faire perdre.',
      description: "Vous n’avez pas besoin d’un autre outil compliqué. Vous avez besoin d’un système clair qui attire les bons clients, automatise les tâches répétitives et reste simple à utiliser.",
    },
    services: {
      label: 'Ce que je construis',
      title: 'Du beau. Du solide. Du rentable.',
      intro: "Chaque mandat commence par votre résultat d’affaires. La technologie vient ensuite — uniquement là où elle apporte une vraie valeur.",
      items: [
        {
          eyebrow: '01 — Présence numérique',
          title: 'Sites Web qui convertissent',
          description: "Des sites rapides, distinctifs et faciles à gérer, conçus pour présenter votre valeur et générer des demandes qualifiées.",
          outcomes: ['Site vitrine ou boutique', 'Design UX/UI sur mesure', 'SEO et performance'],
        },
        {
          eyebrow: '02 — Produits numériques',
          title: 'Applications et SaaS',
          description: "Du prototype à la plateforme complète, je développe l’interface, le serveur, les données et les intégrations.",
          outcomes: ['Portails et CRM', 'Applications Web', 'API et intégrations'],
        },
        {
          eyebrow: '03 — Temps récupéré',
          title: 'Automatisation et agents IA',
          description: "Des assistants et des flux automatisés qui répondent, classent, relancent et préparent le travail pendant que vous avancez.",
          outcomes: ['Agents conversationnels', 'Automatisation des opérations', 'Connexion à vos outils'],
        },
      ],
    },
    metrics: [
      { value: '8+', label: "années d’expérience" },
      { value: 'Web + IA', label: 'une seule partenaire' },
      { value: 'Sur mesure', label: 'sans jargon inutile' },
    ],
    projects: {
      label: 'Travaux sélectionnés',
      title: 'Des projets qui répondent à un vrai besoin.',
      intro: "Conception, développement et automatisation réunis pour livrer des outils cohérents plutôt qu’un assemblage de solutions.",
      items: [
        { type: 'Site Web · Construction', title: 'Nexior Construction', description: 'Présence professionnelle claire, adaptée aux appareils mobiles et pensée pour soutenir la croissance.' },
        { type: 'Plateforme · CRM', title: 'Solutions opérationnelles', description: 'Outils sur mesure pour centraliser les données, accélérer les suivis et réduire les doubles saisies.' },
        { type: 'Site Web · Bien-être', title: 'Spirit Light', description: 'Une expérience numérique sensible qui met l’univers de la marque et ses services au premier plan.' },
      ],
    },
    process: {
      label: 'Une méthode simple',
      title: 'De votre idée à un outil qui fonctionne.',
      steps: [
        { title: 'Diagnostic', description: 'On clarifie le problème, le résultat attendu, les utilisateurs et les priorités.' },
        { title: 'Prototype', description: 'Vous voyez rapidement la direction visuelle et le fonctionnement proposé.' },
        { title: 'Construction', description: 'Je développe, intègre et teste la solution avec des validations régulières.' },
        { title: 'Lancement', description: 'Mise en ligne, transfert de connaissances et plan d’amélioration continue.' },
      ],
    },
    about: {
      label: 'Derrière KMD Web',
      title: 'Une développeuse full-stack qui parle aussi humain.',
      paragraphs: [
        'Je suis Mélanie Desrochers, fondatrice de KMD Web. Depuis plus de huit ans, je transforme des idées en sites, applications et systèmes numériques concrets.',
        'Mon rôle n’est pas de vous impressionner avec du jargon. C’est de comprendre votre réalité, choisir les bons outils et construire une solution que vous pourrez réellement utiliser.',
      ],
      signature: 'Mélanie — conception, code et stratégie',
    },
    contact: {
      label: 'Votre prochain projet',
      title: 'Et si la technologie travaillait enfin pour vous?',
      description: "Une première conversation suffit pour identifier le meilleur levier : un meilleur site, une application ou une automatisation ciblée.",
      primaryCta: 'Réserver un diagnostic',
      secondaryCta: 'Voir le site actuel',
    },
    footer: {
      tagline: 'Créations numériques avec une touche d’intelligence.',
      rights: '© 2026 KMD Web. Tous droits réservés.',
    },
  },
  en: {
    nav: { services: 'Services', projects: 'Work', about: 'About', contact: 'Contact' },
    menu: {
      open: 'Open menu',
      close: 'Close menu',
      language: 'Display the website in French',
    },
    hero: {
      eyebrow: 'Websites · Applications · AI Automation',
      titleStart: 'Digital tools that',
      titleAccent: 'work',
      titleEnd: 'for your business.',
      description: 'KMD Web designs websites, applications and automations that reduce manual work and turn more visitors into customers.',
      primaryCta: 'Discuss my project',
      secondaryCta: 'Explore services',
      proof: ['8+ years in development', 'Tailored solutions', 'Based in Québec'],
      interactionHint: 'Move your mouse to explore',
    },
    manifesto: {
      label: 'The KMD difference',
      title: 'Technology should save you time, not consume it.',
      description: 'You do not need another complicated tool. You need a clear system that attracts the right customers, automates repetitive work and stays easy to use.',
    },
    services: {
      label: 'What I build',
      title: 'Beautiful. Solid. Profitable.',
      intro: 'Every engagement starts with your business outcome. Technology comes second — only where it creates real value.',
      items: [
        { eyebrow: '01 — Digital presence', title: 'Websites that convert', description: 'Fast, distinctive and manageable websites designed to communicate your value and generate qualified inquiries.', outcomes: ['Business or commerce website', 'Tailored UX/UI design', 'SEO and performance'] },
        { eyebrow: '02 — Digital products', title: 'Applications and SaaS', description: 'From prototype to full platform, I develop the interface, server, data and integrations.', outcomes: ['Portals and CRM', 'Web applications', 'APIs and integrations'] },
        { eyebrow: '03 — Time recovered', title: 'Automation and AI agents', description: 'Assistants and automated workflows that answer, organize, follow up and prepare work while you move forward.', outcomes: ['Conversational agents', 'Operational automation', 'Connected business tools'] },
      ],
    },
    metrics: [
      { value: '8+', label: 'years of experience' },
      { value: 'Web + AI', label: 'one expert partner' },
      { value: 'Tailored', label: 'without useless jargon' },
    ],
    projects: {
      label: 'Selected work',
      title: 'Projects built around real needs.',
      intro: 'Design, development and automation combined to deliver coherent tools instead of a pile of disconnected solutions.',
      items: [
        { type: 'Website · Construction', title: 'Nexior Construction', description: 'A clear professional presence built for mobile and designed to support growth.' },
        { type: 'Platform · CRM', title: 'Operational solutions', description: 'Custom tools that centralize data, accelerate follow-ups and reduce duplicate work.' },
        { type: 'Website · Wellness', title: 'Spirit Light', description: 'A sensitive digital experience that puts the brand world and its services first.' },
      ],
    },
    process: {
      label: 'A simple method',
      title: 'From idea to a tool that works.',
      steps: [
        { title: 'Discovery', description: 'We clarify the problem, desired outcome, users and priorities.' },
        { title: 'Prototype', description: 'You quickly see the visual direction and proposed experience.' },
        { title: 'Build', description: 'I develop, integrate and test the solution with regular checkpoints.' },
        { title: 'Launch', description: 'Go-live, knowledge transfer and a practical improvement plan.' },
      ],
    },
    about: {
      label: 'Behind KMD Web',
      title: 'A full-stack developer who also speaks human.',
      paragraphs: [
        'I am Mélanie Desrochers, founder of KMD Web. For more than eight years, I have turned ideas into practical websites, applications and digital systems.',
        'My role is not to impress you with jargon. It is to understand your reality, choose the right tools and build a solution you can actually use.',
      ],
      signature: 'Mélanie — design, code and strategy',
    },
    contact: {
      label: 'Your next project',
      title: 'What if technology finally worked for you?',
      description: 'One conversation is enough to identify the best lever: a better website, an application or a focused automation.',
      primaryCta: 'Book a discovery call',
      secondaryCta: 'View the current website',
    },
    footer: {
      tagline: 'Digital creations with a touch of intelligence.',
      rights: '© 2026 KMD Web. All rights reserved.',
    },
  },
};
