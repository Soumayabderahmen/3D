// ============================================================
//  data/schema.ts
//
//  ⚠️  Ce fichier ne fait que ré-exporter depuis seo.ts
//  pour éviter la duplication de code.
//  Tous les schemas JSON-LD sont définis dans seo.ts.
// ============================================================

export {
  getLocalBusinessJsonLd,
  getServiceJsonLd,
  getBreadcrumbJsonLd,
  getFAQJsonLd,
  getWebSiteJsonLd,
} from "./seo";

// Aliases pour la compatibilité avec l'ancien schema.ts
export {
  getLocalBusinessJsonLd as getLocalBusinessSchema,
  getServiceJsonLd       as getServiceSchema,
  getBreadcrumbJsonLd    as getBreadcrumbSchema,
  getFAQJsonLd           as getFAQSchema,
} from "./seo";