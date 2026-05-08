// ============================================================
//  data/seo.ts  — SEO data layer pour 3D Services
// ============================================================

export const SITE_URL = "https://debarras3dservices.fr"; // ← mets ton vrai domaine ici

/* =============================================================
   TYPES
============================================================= */

export interface PageSEO {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  noindex?: boolean;
  ogImage?: string;
  canonical?: string;
}

export interface SEOScore {
  score: number;   // 0-100
  issues: string[];
}

/* =============================================================
   STORAGE KEYS
============================================================= */

const STORAGE_KEY    = "seo_overrides";
const REDIRECTS_KEY  = "seo_redirects";

/* =============================================================
   DEFAULT SEO PAR PAGE
============================================================= */

const DEFAULT_SEO: Record<string, PageSEO> = {
  "/": {
    path: "/",
    title: "3D Services — Débarras, Nettoyage, Démolition & Désamiantage à Lyon",
    description:
      "Entreprise spécialisée en débarras, nettoyage, démolition et désamiantage à Lyon et dans un rayon de 200 km. Devis gratuit sous 24 h.",
    keywords: ["débarras lyon", "nettoyage lyon", "démolition lyon", "désamiantage lyon", "3d services"],
    ogImage: "/og/home.jpg",
    canonical: "/",
  },

  "/qui-sommes-nous": {
    path: "/qui-sommes-nous",
    title: "Qui sommes-nous — 3D Services Lyon",
    description:
      "Découvrez 3D Services, entreprise lyonnaise spécialisée en débarras, nettoyage et démolition depuis plus de 10 ans.",
    keywords: ["3d services", "débarras lyon", "entreprise débarras lyon"],
    ogImage: "/og/about.jpg",
    canonical: "/qui-sommes-nous",
  },

  "/services": {
    path: "/services",
    title: "Nos services — Débarras, Nettoyage & Démolition Lyon | 3D Services",
    description:
      "Découvrez tous nos services : débarras d'appartement, nettoyage industriel, démolition intérieure et désamiantage à Lyon et alentours.",
    keywords: ["services débarras lyon", "nettoyage professionnel lyon", "démolition lyon"],
    canonical: "/services",
  },

  "/contact": {
    path: "/contact",
    title: "Contact — Demandez un devis gratuit | 3D Services Lyon",
    description:
      "Contactez 3D Services pour un devis gratuit sous 24 h. Débarras, nettoyage, démolition à Lyon.",
    keywords: ["contact débarras lyon", "devis gratuit débarras"],
    canonical: "/contact",
  },

  "/devis": {
    path: "/devis",
    title: "Devis gratuit — Débarras & Nettoyage Lyon | 3D Services",
    description:
      "Obtenez un devis gratuit et sans engagement pour votre débarras, nettoyage ou démolition à Lyon. Réponse rapide sous 24 h.",
    keywords: ["devis débarras lyon", "devis nettoyage lyon", "devis démolition lyon"],
    canonical: "/devis",
  },
};

/* =============================================================
   LECTURE / ÉCRITURE SEO
============================================================= */

const getOverrides = (): Record<string, Partial<PageSEO>> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

/** Récupère le SEO d'une page (override admin + defaults fusionnés) */
export const getSEOForPath = (path: string): PageSEO => {
  const overrides = getOverrides();
  const base: PageSEO = DEFAULT_SEO[path] || {
    path,
    title: "3D Services — Débarras Lyon",
    description: "Débarras et nettoyage professionnel à Lyon",
    keywords: [],
    canonical: path,
  };
  return overrides[path] ? { ...base, ...overrides[path] } : base;
};

/** Retourne toutes les pages connues (defaults + overrides) */
export const getAllSEOPages = (): PageSEO[] => {
  const overrides = getOverrides();
  const paths = new Set([...Object.keys(DEFAULT_SEO), ...Object.keys(overrides)]);
  return Array.from(paths).map(getSEOForPath);
};

/** Sauvegarde un override admin pour une page */
export const saveSEOForPath = (path: string, data: Partial<PageSEO>): void => {
  const overrides = getOverrides();
  overrides[path] = { ...overrides[path], ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
};

/* =============================================================
   CALCUL DU SCORE SEO
============================================================= */

export const calculateSEOScore = (page: PageSEO): SEOScore => {
  const issues: string[] = [];
  let score = 100;

  // Title
  if (!page.title || page.title.trim() === "") {
    issues.push("Titre manquant");
    score -= 30;
  } else if (page.title.length < 30) {
    issues.push("Titre trop court (< 30 caractères)");
    score -= 10;
  } else if (page.title.length > 60) {
    issues.push("Titre trop long (> 60 caractères) — sera tronqué dans Google");
    score -= 10;
  }

  // Description
  if (!page.description || page.description.trim() === "") {
    issues.push("Description manquante");
    score -= 25;
  } else if (page.description.length < 80) {
    issues.push("Description trop courte (< 80 caractères)");
    score -= 10;
  } else if (page.description.length > 160) {
    issues.push("Description trop longue (> 160 caractères) — sera tronquée");
    score -= 5;
  }

  // Keywords
  if (!page.keywords || page.keywords.length === 0) {
    issues.push("Aucun mot-clé défini");
    score -= 10;
  } else if (page.keywords.length < 3) {
    issues.push("Peu de mots-clés (recommandé : 3+)");
    score -= 5;
  }

  // OG Image
  if (!page.ogImage) {
    issues.push("Pas d'image Open Graph définie");
    score -= 10;
  }

  // Canonical
  if (!page.canonical) {
    issues.push("URL canonique non définie");
    score -= 10;
  }

  // Noindex warning (pas une erreur, juste info)
  if (page.noindex) {
    issues.push("Page exclue de l'indexation (noindex activé)");
    score -= 5;
  }

  return { score: Math.max(0, score), issues };
};

/* =============================================================
   REDIRECTIONS 301
============================================================= */

export const getRedirects = (): { from: string; to: string }[] => {
  try {
    return JSON.parse(localStorage.getItem(REDIRECTS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveRedirects = (redirects: { from: string; to: string }[]): void => {
  localStorage.setItem(REDIRECTS_KEY, JSON.stringify(redirects));
};

/* =============================================================
   JSON-LD SCHEMAS
============================================================= */

/** LocalBusiness — à injecter sur toutes les pages */
export const getLocalBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "3D Services",
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: "+33609991736",
  email: "3dservicefrance@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "24 Avenue Joannés Masset",
    addressLocality: "Lyon",
    postalCode: "69009",
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 45.764043,
      longitude: 4.835659,
    },
    geoRadius: "200000",
  },
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
});

/** Service — pour chaque page de sous-service */
export const getServiceJsonLd = (
  name: string,
  description: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "3D Services",
    url: SITE_URL,
  },
  areaServed: "Lyon",
  url: `${SITE_URL}${url}`,
});

/** BreadcrumbList — navigation structurée */
export const getBreadcrumbJsonLd = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});

/** FAQPage — pour les pages avec FAQ */
export const getFAQJsonLd = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
});

/** WebSite avec SearchAction — pour la home */
export const getWebSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "3D Services",
  url: SITE_URL,
});