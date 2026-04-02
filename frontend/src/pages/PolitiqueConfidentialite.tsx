import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { getSEOForPath } from "@/data/seo";


const PolitiqueConfidentialite = () => (
  <Layout>
      <SEOHead {...getSEOForPath("/politique-de-confidentialite")} canonical="/politique-de-confidentialite" />
    <section className="py-16 bg-background">
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Politique de Confidentialité</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p>Dernière mise à jour : 1er avril 2026</p>

          <h2 className="text-xl font-semibold text-foreground">1. Responsable du traitement</h2>
          <p>3D Services<br />24 Avenue Joannés Masset, Lyon 69009<br />Email : 3dservicefrance@gmail.com<br />Téléphone : 06 09 99 17 36</p>

          <h2 className="text-xl font-semibold text-foreground">2. Données collectées</h2>
          <p>Nous collectons les données suivantes lors de l'utilisation de notre site :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nom, prénom, adresse email et numéro de téléphone (formulaires de contact et devis)</li>
            <li>Adresse postale (pour les interventions)</li>
            <li>Données de navigation (cookies, adresse IP, pages consultées)</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">3. Finalités du traitement</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Répondre à vos demandes de contact et de devis</li>
            <li>Assurer la gestion de nos prestations</li>
            <li>Améliorer l'expérience utilisateur sur notre site</li>
            <li>Envoyer des communications commerciales (avec votre consentement)</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">4. Base légale</h2>
          <p>Le traitement de vos données repose sur votre consentement, l'exécution d'un contrat ou notre intérêt légitime à améliorer nos services.</p>

          <h2 className="text-xl font-semibold text-foreground">5. Durée de conservation</h2>
          <p>Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernier contact, sauf obligation légale contraire.</p>

          <h2 className="text-xl font-semibold text-foreground">6. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Droit d'accès, de rectification et de suppression</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition et de limitation du traitement</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à : 3dservicefrance@gmail.com</p>

          <h2 className="text-xl font-semibold text-foreground">7. Cookies</h2>
          <p>Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.</p>

          <h2 className="text-xl font-semibold text-foreground">8. Réclamation</h2>
          <p>Vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.cnil.fr</a></p>
        </div>
      </div>
    </section>
  </Layout>
);

export default PolitiqueConfidentialite;
