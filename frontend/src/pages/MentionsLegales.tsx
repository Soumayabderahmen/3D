import Layout from "../components/layout/Layout";
import SEOHead from "../components/SEOHead";
import { getSEOForPath } from "../data/seo";


const MentionsLegales = () => (
  <Layout>
      <SEOHead {...getSEOForPath("/mentions-legales")} canonical="/mentions-legales" url="/mentions-legales" />
    <section className="py-16 bg-background">
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Mentions Légales</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <h2 className="text-xl font-semibold text-foreground">1. Éditeur du site</h2>
          <p>
            3D Services<br />
            Siège social : 24 Avenue Joannés Masset, Lyon 69009<br />
            Téléphone : 06 09 99 17 36<br />
            Email : 3dservicefrance@gmail.com<br />
            Forme juridique : SARL<br />
            SIRET : [À compléter]<br />
            Directeur de la publication : Omar Oueslati
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Hébergeur</h2>
          <p>
            Le site est hébergé par :<br />
            OVH Cloud <br />
            Site web : <a href="https://debarras3d.fr" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://debarras3d.fr</a>
          </p>

          <h2 className="text-xl font-semibold text-foreground">3. Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de 3D Services, sauf mention contraire. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, est strictement interdite sans autorisation préalable écrite.</p>

          <h2 className="text-xl font-semibold text-foreground">4. Responsabilité</h2>
          <p>3D Services s'efforce de fournir des informations aussi précises que possible. Toutefois, la société ne pourra être tenue responsable des omissions, des inexactitudes ou des carences dans la mise à jour des informations.</p>

          <h2 className="text-xl font-semibold text-foreground">5. Liens hypertextes</h2>
          <p>Le site peut contenir des liens vers d'autres sites. 3D Services n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>

          <h2 className="text-xl font-semibold text-foreground">6. Données personnelles</h2>
          <p>Pour en savoir plus sur la gestion de vos données personnelles, consultez notre <a href="/politique-de-confidentialite" className="text-primary underline">Politique de Confidentialité</a>.</p>

          <h2 className="text-xl font-semibold text-foreground">7. Droit applicable</h2>
          <p>Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default MentionsLegales;