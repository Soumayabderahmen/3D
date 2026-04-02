// SEO data store with localStorage override from admin
export interface PageSEO {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  noindex?: boolean;
  ogImage?: string;
  canonical?: string;
  redirect?: string;
  score?: number;
}

const DEFAULT_SEO: Record<string, PageSEO> = {
  "/": {
    path: "/",
    title: "3D Services — Débarras, Démolition, Nettoyage à Lyon",
    description: "3D Services : débarras, démolition, désamiantage et nettoyage professionnel à Lyon et région (200km). Devis gratuit en 2h, intervention 7j/7.",
    keywords: ["débarras lyon", "nettoyage lyon", "démolition lyon", "désamiantage", "vide maison lyon"],
  },
  "/services": {
    path: "/services",
    title: "Nos Services — Débarras, Démolition, Nettoyage",
    description: "Découvrez tous nos services : débarras appartement et maison, démolition intérieure, désamiantage, nettoyage professionnel. Intervention Lyon et 200km.",
    keywords: ["services débarras", "démolition intérieure", "nettoyage professionnel lyon"],
  },
  "/tarifs": {
    path: "/tarifs",
    title: "Tarifs Débarras & Nettoyage Lyon — Prix Transparents",
    description: "Tarifs transparents pour débarras et nettoyage à Lyon : 20 à 50€/m³. Débarras gratuit possible si valeur objets. Devis gratuit en 2h.",
    keywords: ["tarif débarras lyon", "prix nettoyage", "devis gratuit"],
  },
  "/devis": {
    path: "/devis",
    title: "Devis Gratuit Débarras & Nettoyage Lyon — Réponse en 2h",
    description: "Demandez votre devis gratuit en ligne pour débarras, démolition ou nettoyage à Lyon. Réponse sous 2h, intervention rapide 7j/7.",
    keywords: ["devis débarras gratuit", "devis nettoyage lyon", "estimation débarras"],
  },
  "/qui-sommes-nous": {
    path: "/qui-sommes-nous",
    title: "Qui Sommes-Nous — 3D Services Lyon",
    description: "3D Services, entreprise de débarras et nettoyage à Lyon depuis 2015. Équipe expérimentée, éco-responsable, intervention rapide dans un rayon de 200km.",
    keywords: ["entreprise débarras lyon", "3d services", "qui sommes nous"],
  },
  "/contact": {
    path: "/contact",
    title: "Contact — 3D Services Lyon | 06 09 99 17 36",
    description: "Contactez 3D Services pour vos besoins de débarras et nettoyage à Lyon. Tél: 06 09 99 17 36. Devis gratuit, intervention rapide 7j/7.",
    keywords: ["contact débarras lyon", "téléphone nettoyage lyon"],
  },
  "/avis": {
    path: "/avis",
    title: "Avis Clients — 3D Services Lyon | 99% Satisfaits",
    description: "Découvrez les avis de nos clients sur nos services de débarras et nettoyage à Lyon. Plus de 200 interventions réalisées, 99% de clients satisfaits.",
    keywords: ["avis débarras lyon", "témoignages nettoyage"],
  },
  "/actualites": {
    path: "/actualites",
    title: "Nos Missions & Réalisations — 3D Services Lyon",
    description: "Découvrez nos dernières missions de débarras, démolition et nettoyage à Lyon et région. Photos avant/après, comptes-rendus détaillés.",
    keywords: ["missions débarras lyon", "réalisations nettoyage", "avant après"],
  },
  "/zones-intervention": {
    path: "/zones-intervention",
    title: "Zones d'Intervention — Lyon et 200km | 3D Services",
    description: "3D Services intervient à Lyon et dans un rayon de 200km : Grenoble, Saint-Étienne, Valence, Annecy, Chambéry. Tous les arrondissements lyonnais couverts.",
    keywords: ["zone intervention lyon", "débarras grenoble", "nettoyage saint-étienne"],
  },
  "/mentions-legales": {
    path: "/mentions-legales",
    title: "Mentions Légales — 3D Services",
    description: "Mentions légales du site 3D Services. Informations sur l'éditeur, l'hébergeur, la propriété intellectuelle.",
    keywords: [],
    noindex: true,
  },
  "/politique-de-confidentialite": {
    path: "/politique-de-confidentialite",
    title: "Politique de Confidentialité — 3D Services",
    description: "Politique de confidentialité et de protection des données personnelles de 3D Services. Conformité RGPD.",
    keywords: [],
    noindex: true,
  },
};

const STORAGE_KEY = "seo_overrides";
const REDIRECTS_KEY = "seo_redirects";

export const getSEOForPath = (path: string): PageSEO => {
  try {
    const overrides = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (overrides[path]) return { ...DEFAULT_SEO[path], ...overrides[path] };
  } catch {}
  return DEFAULT_SEO[path] || { path, title: "3D Services", description: "Débarras, démolition, désamiantage et nettoyage à Lyon.", keywords: [] };
};

export const getAllSEOPages = (): PageSEO[] => {
  const overrides = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const allPaths = new Set([...Object.keys(DEFAULT_SEO), ...Object.keys(overrides)]);
  return Array.from(allPaths).map(p => getSEOForPath(p));
};

export const saveSEOForPath = (path: string, data: Partial<PageSEO>) => {
  const overrides = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  overrides[path] = { ...overrides[path], ...data, path };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
};

export const getRedirects = (): { from: string; to: string }[] => {
  return JSON.parse(localStorage.getItem(REDIRECTS_KEY) || "[]");
};

export const saveRedirects = (redirects: { from: string; to: string }[]) => {
  localStorage.setItem(REDIRECTS_KEY, JSON.stringify(redirects));
};

export const calculateSEOScore = (seo: PageSEO): { score: number; issues: string[] } => {
  const issues: string[] = [];
  let score = 100;

  if (!seo.title || seo.title.length < 10) { issues.push("Titre trop court (< 10 car.)"); score -= 15; }
  if (seo.title && seo.title.length > 60) { issues.push("Titre trop long (> 60 car.)"); score -= 10; }
  if (!seo.description || seo.description.length < 50) { issues.push("Description trop courte (< 50 car.)"); score -= 15; }
  if (seo.description && seo.description.length > 160) { issues.push("Description trop longue (> 160 car.)"); score -= 10; }
  if (!seo.keywords || seo.keywords.length === 0) { issues.push("Aucun mot-clé défini"); score -= 10; }
  if (!seo.canonical) { issues.push("URL canonique non définie"); score -= 5; }
  if (!seo.ogImage) { issues.push("Image OG non définie"); score -= 5; }

  return { score: Math.max(0, score), issues };
};

// JSON-LD generators
export const getLocalBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "3D Services",
  image: "https://debarras3dservices.lovable.app/logo-3d-services.png",
  telephone: "+33609991736",
  email: "3dservicefrance@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "24 Avenue Joannés Masset",
    addressLocality: "Lyon",
    postalCode: "69009",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 45.7716, longitude: 4.8005 },
  url: "https://debarras3dservices.lovable.app",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:30",
    closes: "20:00",
  },
  areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 45.7578, longitude: 4.8320 }, geoRadius: "200000" },
  priceRange: "€€",
});

export const getServiceJsonLd = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: { "@type": "LocalBusiness", name: "3D Services" },
  areaServed: { "@type": "City", name: "Lyon" },
  url: `https://debarras3dservices.lovable.app${url}`,
});

export const getBreadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `https://debarras3dservices.lovable.app${item.url}`,
  })),
});

export const getFAQJsonLd = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});
