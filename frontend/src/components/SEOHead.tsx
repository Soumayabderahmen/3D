// ============================================================
//  components/SEOHead.tsx
// ============================================================
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../data/seo";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  ogImage?: string;
  url: string;
  noindex?: boolean;

  /**
   * Un ou plusieurs schemas JSON-LD.
   * Chaque objet est injecté dans son propre <script> tag.
   */
  jsonLd?: object | object[];
}

const SEOHead = ({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = `${SITE_URL}/og/default.jpg`,
  url,
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const fullUrl      = `${SITE_URL}${url}`;
  const canonicalUrl = `${SITE_URL}${canonical}`;

  // Normalise jsonLd en tableau pour itérer facilement
  const schemas: object[] = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      {/* ── TITLE ─────────────────────────────────────────── */}
      <title>{title}</title>

      {/* ── META STANDARDS ────────────────────────────────── */}
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* ── CANONICAL ─────────────────────────────────────── */}
      <link rel="canonical" href={canonicalUrl} />

      {/* ── OPEN GRAPH ────────────────────────────────────── */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content="3D Services" />
      <meta property="og:locale"      content="fr_FR" />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:url"         content={fullUrl} />

      {/* ── TWITTER CARDS ─────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* ── JSON-LD SCHEMAS ───────────────────────────────── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;