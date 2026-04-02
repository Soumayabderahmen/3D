import { Truck, Hammer, ShieldAlert, Sparkles } from "lucide-react";

export interface SubService {
  title: string;
  desc: string;
  slug: string;
  longDesc: string;
  prestations: string[];
  image?: string;
  sections?: { title: string; text: string }[];
}

export const SERVICES = [
  {
    slug: "debarras",
    title: "Débarras",
    icon: Truck,
    color: "primary-accent",
    colorHex: "#1B4FD8",
    badge: "Service principal",
    shortDesc: "Vidage complet appartement, maison, cave, grenier, box. Devis gratuit, intervention rapide Lyon & région.",
    longDesc: `Notre service de débarras à Lyon et dans toute la région (rayon de 200 km) prend en charge le vidage complet ou partiel de tous types de locaux. Appartements, maisons, caves, greniers, box, garages, locaux professionnels — nous intervenons partout avec rapidité et professionnalisme. Nos équipes trient, évacuent et recyclent vos encombrants de manière éco-responsable.

Que vous déménagiez, gériez une succession ou souhaitiez simplement libérer un espace encombré, nous proposons des solutions adaptées. Notre approche éco-responsable garantit que chaque objet est trié : don aux associations, revente des objets de valeur, recyclage des matériaux. Rien ne finit inutilement en décharge.

Nous proposons trois formules : débarras gratuit si la valeur des objets couvre l'intervention, débarras indemnisé si leur valeur dépasse les frais, et débarras facturé à tarif compétitif (20 à 50€/m³).`,
    prestations: [
      "Vidage complet ou partiel",
      "Tri sélectif et recyclage",
      "Débarras succession et décès",
      "Encombrants et gros électroménager",
      "Nettoyage après débarras (option)",
      "Débarras gratuit ou indemnisé possible",
    ],
    subServices: [
      { title: "Débarras Appartement", slug: "debarras-appartement", desc: "Vidage complet ou partiel de votre appartement, du studio au T5. Intervention rapide et devis gratuit.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&h=600&fit=crop", longDesc: "Notre service de débarras d'appartement à Lyon et sa région prend en charge le vidage complet ou partiel de tout type d'appartement. Du studio au T5, nos équipes interviennent avec rapidité et professionnalisme. Nous trions, évacuons et recyclons tous vos encombrants : meubles, électroménager, vêtements, bibelots. Chaque objet récupérable est orienté vers le don ou la revente.", prestations: ["Vidage complet studio à T5", "Tri et recyclage sur place", "Évacuation encombrants", "Nettoyage après débarras", "Devis gratuit sous 2h", "Équipe expérimentée"], sections: [{ title: "Un vidage adapté à votre logement", text: "Que vous habitiez un studio ou un grand appartement, nous adaptons notre intervention à la taille et à la configuration de votre logement. Nos équipes sont équipées pour gérer les accès difficiles : escaliers étroits, étages élevés sans ascenseur, parkings souterrains." }, { title: "Tri et valorisation", text: "Avant l'évacuation, tri minutieux. Les objets de valeur sont identifiés, les objets en bon état orientés vers le don ou la revente, les matériaux recyclables séparés." }, { title: "Remise en état", text: "Après le vidage, nettoyage complet possible. Particulièrement apprécié dans le cadre de ventes immobilières." }] },
      { title: "Débarras Rapide & Devis Gratuit", slug: "debarras-rapide", desc: "Besoin d'un débarras urgent ? Nous intervenons sous 24h avec un devis gratuit et sans engagement.", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&h=600&fit=crop", longDesc: "Vous avez besoin d'un débarras en urgence ? 3D Services intervient sous 24h à Lyon et dans un rayon de 200 km. Notre processus est simple : vous nous appelez, nous établissons un devis gratuit en 2h, et nous intervenons dès validation. Pas de surprise, pas de frais cachés.", prestations: ["Intervention sous 24h", "Devis gratuit en 2h", "Sans engagement", "7j/7 y compris week-end", "Tarif transparent", "Équipe expérimentée"], sections: [{ title: "Un processus simple et rapide", text: "Appelez-nous, décrivez votre besoin. En 2 heures, vous recevez un devis clair et détaillé. Dès validation, notre équipe intervient — souvent dès le lendemain." }, { title: "Transparence totale", text: "Nos tarifs sont affichés à l'avance. Aucun frais caché, aucune surprise à la fin du chantier. Le prix annoncé est le prix facturé." }] },
      { title: "Enlèvement Encombrants", slug: "enlevement-encombrants", desc: "Évacuation de vos encombrants : meubles, électroménager, matelas. Service éco-responsable avec recyclage.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop", longDesc: "Notre service d'enlèvement d'encombrants prend en charge tous vos objets volumineux : meubles, matelas, canapés, électroménager, appareils électroniques. Nous assurons le tri sélectif et le recyclage de chaque matériau. Les objets en bon état sont donnés à des associations partenaires.", prestations: ["Meubles et canapés", "Électroménager", "Matelas et literie", "Appareils électroniques", "Recyclage éco-responsable", "Devis gratuit"], sections: [{ title: "Tous types d'encombrants pris en charge", text: "Canapés, armoires, réfrigérateurs, machines à laver, matelas — nous prenons en charge tous les objets volumineux que vous ne pouvez pas évacuer seul." }, { title: "Une démarche éco-responsable", text: "Chaque objet est trié : don aux associations pour les objets en état, recyclage des matériaux, déchèterie agréée pour le reste. Rien ne finit inutilement en décharge." }] },
      { title: "Vide Maison", slug: "vide-maison", desc: "Service complet de vide-maison : tri, évacuation, nettoyage. Idéal pour succession, déménagement ou libération de bien.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=600&fit=crop", longDesc: "Le vide maison est un service complet qui consiste à vider entièrement une maison, du sous-sol au grenier. Que ce soit suite à une succession, une vente immobilière ou un déménagement, 3D Services prend en charge l'intégralité du processus.", prestations: ["Vidage complet cave au grenier", "Tri et valorisation des objets", "Nettoyage après vidage possible", "Idéal pour succession ou vente", "Devis gratuit sur place", "Équipe expérimentée"], sections: [{ title: "Un vidage complet de A à Z", text: "Nous vidons chaque pièce : chambres, salon, cuisine, salle de bain, cave, grenier, garage et dépendances. Mobilier, électroménager, vêtements, vaisselle, objets divers — tout est pris en charge." }, { title: "Tri et valorisation", text: "Avant l'évacuation, tri minutieux. Les objets de valeur sont identifiés, les objets en bon état orientés vers le don ou la revente, les matériaux recyclables séparés." }, { title: "Remise en état", text: "Après le vidage, nettoyage complet possible. Particulièrement apprécié dans le cadre de ventes immobilières." }] },
      { title: "Débarras Succession", slug: "debarras-succession", desc: "Prise en charge complète après un décès : tri respectueux des affaires, don aux associations, évacuation.", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&h=600&fit=crop", longDesc: "Le débarras succession demande tact et professionnalisme. Nos équipes interviennent avec respect et discrétion pour trier les affaires du défunt. Les objets de valeur sont inventoriés, les souvenirs mis de côté selon vos souhaits, et le reste est évacué proprement.", prestations: ["Tri respectueux", "Inventaire objets de valeur", "Don aux associations", "Évacuation complète", "Accompagnement personnalisé", "Discrétion assurée"], sections: [{ title: "Un accompagnement humain et discret", text: "Nous comprenons la difficulté émotionnelle d'un débarras après un décès. Nos équipes sont formées pour intervenir avec tact, respect et discrétion. Vos souhaits sont notre priorité." }, { title: "Inventaire et tri soigneux", text: "Les objets de valeur sont identifiés et inventoriés. Les souvenirs personnels sont mis de côté. Les objets en bon état sont orientés vers le don aux associations." }] },
      { title: "Débarras Cave", slug: "debarras-cave", desc: "Vidage de cave encombrée : meubles, cartons, archives. Accès difficile ? Nos équipes sont équipées.", image: "https://images.unsplash.com/photo-1584467735871-8e4e9d979e7d?w=900&h=600&fit=crop", longDesc: "Les caves sont souvent des espaces oubliés qui s'encombrent au fil des années. Nos équipes sont spécialement équipées pour intervenir dans les accès difficiles : escaliers étroits, sous-sols humides, caves profondes. Nous évacuons tout type d'objet stocké.", prestations: ["Accès difficile maîtrisé", "Meubles et cartons", "Archives et papiers", "Matériaux divers", "Nettoyage cave inclus", "Devis gratuit"] },
      { title: "Débarras Grenier", slug: "debarras-grenier", desc: "Nettoyage et vidage de grenier : objets anciens, archives, mobilier. Tri et recyclage inclus.", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&h=600&fit=crop", longDesc: "Le débarras de grenier nécessite une attention particulière aux objets anciens qui peuvent avoir de la valeur. Nos équipes trient soigneusement chaque objet, identifient les pièces de valeur et évacuent le reste de manière éco-responsable.", prestations: ["Tri objets anciens", "Identification pièces de valeur", "Évacuation sécurisée", "Recyclage inclus", "Accès combles et toitures", "Devis gratuit"] },
      { title: "Débarras Jardin", slug: "debarras-jardin", desc: "Évacuation des déchets verts, mobilier de jardin, gravats légers. Remise en état de votre extérieur.", image: "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=900&h=600&fit=crop", longDesc: "Notre service de débarras jardin prend en charge l'évacuation de tous vos déchets extérieurs : mobilier de jardin usagé, déchets verts, gravats légers, outils hors d'usage. Nous remettons votre espace extérieur en état.", prestations: ["Déchets verts", "Mobilier de jardin", "Gravats légers", "Outils et équipements", "Remise en état terrain", "Devis gratuit"] },
      { title: "Débarras Box & Garage", slug: "debarras-box-garage", desc: "Vidage complet de box de stockage, garage ou cave. Intervention rapide même en accès difficile.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop", longDesc: "Box de stockage saturé ? Garage encombré ? Nous intervenons rapidement pour vider complètement votre espace. Nos équipes sont habituées aux contraintes d'accès des parkings souterrains et des zones de stockage.", prestations: ["Box de stockage", "Garage et parking", "Accès souterrain", "Tri et recyclage", "Intervention rapide", "Devis gratuit"] },
      { title: "SOS Débarras", slug: "sos-debarras", desc: "Intervention d'urgence 7j/7 pour débarras immédiat. Expulsion, sinistre, insalubrité — nous répondons en 2h.", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&h=600&fit=crop", longDesc: "En cas d'urgence — expulsion locative, sinistre, insalubrité — notre service SOS Débarras intervient dans les plus brefs délais. Disponible 7j/7, nous garantissons une réponse sous 2h et une intervention sous 24h.", prestations: ["Urgence 7j/7", "Réponse sous 2h", "Expulsion locative", "Sinistre et dégâts", "Insalubrité", "Intervention immédiate"] },
      { title: "Débarras Archives Entreprises", slug: "debarras-archives", desc: "Enlèvement et destruction sécurisée d'archives professionnelles. Confidentialité garantie.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop", longDesc: "Nous proposons un service de débarras et destruction sécurisée d'archives pour les entreprises. Confidentialité totale garantie avec certificat de destruction. Nous intervenons dans vos locaux professionnels à Lyon et sa région.", prestations: ["Destruction sécurisée", "Certificat de destruction", "Confidentialité garantie", "Intervention en entreprise", "Conformité RGPD", "Devis gratuit"] },
      { title: "Entreprise de Débarras", slug: "entreprise-debarras", desc: "3D Services, votre partenaire de confiance pour tous vos besoins de débarras à Lyon et sa région.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=600&fit=crop", longDesc: "3D Services est votre entreprise de débarras de référence à Lyon et dans un rayon de 200 km. Forts de notre expérience, nous proposons des solutions sur mesure pour particuliers et professionnels. Devis gratuit, intervention rapide, tarifs compétitifs.", prestations: ["Particuliers et professionnels", "Devis gratuit sous 2h", "Intervention 7j/7", "Tarifs compétitifs", "Éco-responsable", "Équipe expérimentée"] },
    ] as SubService[],
    gallery: [
      { before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", legend: "Appartement Lyon 3e — Débarras complet" },
      { before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", legend: "Cave Villeurbanne — Vidage total" },
      { before: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=800&h=600&fit=crop", legend: "Maison Caluire — Succession" },
      { before: "https://images.unsplash.com/photo-1584467735871-8e4e9d979e7d?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", legend: "Grenier Tassin — Vidage" },
      { before: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", legend: "Box Bron — Débarras" },
      { before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=800&h=600&fit=crop", legend: "Studio Lyon 7e — Vidage complet" },
    ],
  },
  {
    slug: "demolition",
    title: "Démolition",
    icon: Hammer,
    color: "destructive",
    colorHex: "#DC2626",
    badge: "Nouveau",
    shortDesc: "Démolition intérieure, cloisons, faux-plafonds, carrelage. Évacuation gravats incluse. Devis gratuit.",
    longDesc: `Notre service de démolition intérieure à Lyon et dans toute la région intervient pour tous vos travaux de déconstruction. Cloisons, faux-plafonds, carrelage, parquet, cuisines, salles de bain — nos équipes démolissent et évacuent les gravats rapidement.

Nous travaillons en étroite collaboration avec les architectes et maîtres d'œuvre pour préparer vos chantiers de rénovation. Chaque intervention est planifiée avec soin pour minimiser les nuisances et respecter les délais convenus.

L'évacuation des gravats est systématiquement incluse dans nos devis. Nous utilisons des bennes adaptées et veillons au recyclage des matériaux lorsque cela est possible. Nos équipes sont formées aux normes de sécurité en vigueur.`,
    prestations: [
      "Démolition cloisons et murs non porteurs",
      "Dépose faux-plafonds",
      "Retrait carrelage et parquet",
      "Démolition cuisine et salle de bain",
      "Évacuation gravats en benne",
      "Nettoyage fin de chantier inclus",
    ],
    subServices: [
      { title: "Démolition Cloisons", slug: "demolition-cloisons", desc: "Abattage de cloisons et murs non porteurs pour ouvrir vos espaces. Évacuation gravats incluse.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop", longDesc: "Notre service de démolition de cloisons permet de repenser l'agencement de votre intérieur. Nous abattons les murs non porteurs en toute sécurité, avec évacuation immédiate des gravats. Nos équipes vérifient systématiquement la nature du mur avant intervention.", prestations: ["Cloisons en placo", "Cloisons en briques", "Vérification structure", "Évacuation gravats", "Nettoyage chantier", "Devis gratuit"] },
      { title: "Dépose Faux-Plafonds", slug: "depose-faux-plafonds", desc: "Retrait de faux-plafonds suspendus ou en plaques. Remise à nu pour rénovation.", image: "https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=900&h=600&fit=crop", longDesc: "La dépose de faux-plafonds est une étape clé de nombreux projets de rénovation. Nos équipes retirent tous types de faux-plafonds : suspendus, en dalles, en plaques de plâtre. L'évacuation des matériaux et le nettoyage sont systématiquement inclus.", prestations: ["Faux-plafonds suspendus", "Dalles et plaques", "Isolation associée", "Évacuation matériaux", "Remise à nu complète", "Devis gratuit"] },
      { title: "Retrait Carrelage & Parquet", slug: "retrait-carrelage-parquet", desc: "Dépose de revêtements de sol : carrelage, parquet, moquette. Préparation pour nouveau revêtement.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&fit=crop", longDesc: "Nous assurons la dépose complète de tous types de revêtements de sol : carrelage, faïence, parquet massif ou flottant, moquette, lino. Le support est nettoyé et préparé pour recevoir le nouveau revêtement.", prestations: ["Carrelage et faïence", "Parquet massif et flottant", "Moquette et lino", "Préparation support", "Évacuation déchets", "Devis gratuit"] },
      { title: "Démolition Cuisine", slug: "demolition-cuisine", desc: "Dépose complète de cuisine équipée : meubles, plan de travail, crédence, électroménager encastré.", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&h=600&fit=crop", longDesc: "La démolition de cuisine comprend le retrait complet de tous les éléments : meubles hauts et bas, plan de travail, crédence, électroménager encastré. Nous déconnectons les arrivées d'eau et d'électricité en toute sécurité.", prestations: ["Meubles hauts et bas", "Plan de travail", "Crédence et faïence", "Électroménager encastré", "Déconnexion eau/élec", "Devis gratuit"] },
      { title: "Démolition Salle de Bain", slug: "demolition-salle-de-bain", desc: "Dépose complète de salle de bain : baignoire, douche, lavabo, carrelage mural et sol.", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900&h=600&fit=crop", longDesc: "Nous réalisons la démolition complète de votre salle de bain pour préparer votre projet de rénovation. Baignoire, douche, lavabo, WC, carrelage mural et sol — tout est retiré proprement avec évacuation des gravats.", prestations: ["Baignoire et douche", "Lavabo et WC", "Carrelage mural", "Carrelage sol", "Plomberie sécurisée", "Devis gratuit"] },
      { title: "Évacuation Gravats", slug: "evacuation-gravats", desc: "Évacuation de tous types de gravats en benne. Tri et recyclage des matériaux de démolition.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop", longDesc: "L'évacuation des gravats est un service essentiel après toute démolition. Nous mettons à disposition des bennes adaptées et assurons le transport vers les centres de tri et recyclage agréés. Béton, plâtre, brique, bois — tout est pris en charge.", prestations: ["Benne sur place", "Béton et plâtre", "Brique et pierre", "Bois et métaux", "Centre de tri agréé", "Devis gratuit"] },
      { title: "Démolition Intérieure Complète", slug: "demolition-interieure-complete", desc: "Déconstruction totale de l'intérieur d'un local : idéal pour rénovation lourde ou changement d'usage.", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&h=600&fit=crop", longDesc: "Pour les projets de rénovation lourde, nous réalisons la démolition intérieure complète : toutes les cloisons, revêtements, faux-plafonds, installations sanitaires et électriques sont retirés. Le local est remis à nu, prêt pour la reconstruction.", prestations: ["Mise à nu complète", "Cloisons et doublages", "Installations sanitaires", "Installations électriques", "Local prêt à rénover", "Devis gratuit"] },
      { title: "Démolition Bureaux & Commerces", slug: "demolition-bureaux-commerces", desc: "Déconstruction de bureaux et locaux commerciaux. Intervention planifiée hors horaires d'activité.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=600&fit=crop", longDesc: "Nous intervenons dans les bureaux et locaux commerciaux pour tous vos besoins de démolition. Nos interventions sont planifiées hors horaires d'activité pour minimiser les perturbations. Nous respectons les normes de sécurité et les contraintes spécifiques des ERP.", prestations: ["Intervention hors horaires", "Cloisons de bureaux", "Faux-planchers", "Aménagements commerciaux", "Respect normes ERP", "Devis gratuit"] },
    ] as SubService[],
    gallery: [
      { before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop", legend: "Cloisons Lyon 6e — Démolition partielle" },
      { before: "https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=600&fit=crop", legend: "Cuisine Villeurbanne — Dépose complète" },
      { before: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop", legend: "Salle de bain Caluire — Rénovation" },
      { before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop", legend: "Bureau Lyon 3e — Déconstruction" },
      { before: "https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop", legend: "Appartement Bron — Rénovation" },
      { before: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=600&fit=crop", legend: "Local Vénissieux — Remise à neuf" },
    ],
  },
  {
    slug: "desamiantage",
    title: "Désamiantage",
    icon: ShieldAlert,
    color: "gold",
    colorHex: "#F5A623",
    badge: "Certifié",
    shortDesc: "Diagnostic, retrait et évacuation de l'amiante en toute sécurité. Entreprise certifiée. Devis gratuit.",
    longDesc: `Le désamiantage est une opération qui nécessite des compétences et certifications spécifiques. Notre équipe certifiée intervient à Lyon et dans un rayon de 200 km pour le diagnostic, le retrait et l'évacuation en toute sécurité de matériaux contenant de l'amiante.

Nous respectons strictement la réglementation française et européenne en vigueur pour protéger la santé des occupants et de nos équipes. Chaque chantier fait l'objet d'un plan de retrait validé par les autorités compétentes.

Nos techniciens sont formés et équipés pour intervenir sur tous types de matériaux amiantés : plaques de fibrociment, dalles de sol, flocages, calorifugeages. Un rapport de fin de travaux certifié vous est remis à l'issue de chaque intervention.`,
    prestations: [
      "Diagnostic amiante avant travaux",
      "Retrait plaques et dalles amiantées",
      "Confinement et sécurisation zone",
      "Évacuation en centre agréé",
      "Rapport de fin de travaux certifié",
      "Respect réglementation DTA/SS4",
    ],
    subServices: [
      { title: "Diagnostic Amiante", slug: "diagnostic-amiante", desc: "Diagnostic amiante avant travaux ou avant vente. Rapport certifié conforme à la réglementation.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&h=600&fit=crop", longDesc: "Le diagnostic amiante est obligatoire avant tous travaux dans les bâtiments construits avant 1997. Nos techniciens certifiés réalisent les prélèvements et analyses nécessaires. Un rapport détaillé vous est remis avec les préconisations adaptées.", prestations: ["Prélèvements certifiés", "Analyse en laboratoire", "Rapport réglementaire", "Avant travaux / avant vente", "Préconisations adaptées", "Devis gratuit"] },
      { title: "Retrait Plaques Fibrociment", slug: "retrait-plaques-fibrociment", desc: "Dépose sécurisée de plaques de fibrociment amiantées : toitures, bardages, conduits.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop", longDesc: "Les plaques de fibrociment contenant de l'amiante sont présentes dans de nombreux bâtiments. Nos équipes certifiées assurent leur retrait en toute sécurité, avec confinement de la zone et évacuation vers des centres agréés.", prestations: ["Toitures fibrociment", "Bardages amiantés", "Conduits et gaines", "Confinement zone", "Évacuation centre agréé", "Devis gratuit"] },
      { title: "Retrait Dalles Amiantées", slug: "retrait-dalles-amiantees", desc: "Dépose de dalles de sol contenant de l'amiante. Intervention sécurisée et traçabilité complète.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop", longDesc: "Les dalles de sol vinyle-amiante sont très courantes dans les bâtiments des années 60 à 80. Nous assurons leur retrait en suivant un protocole strict de sécurité, avec traçabilité complète des déchets.", prestations: ["Dalles vinyle-amiante", "Protocole sécurisé", "Traçabilité déchets", "Bordereau de suivi", "Remise en état sol", "Devis gratuit"] },
      { title: "Retrait Flocage Amiante", slug: "retrait-flocage-amiante", desc: "Déflocage de matériaux amiantés : plafonds, poutres, canalisations. Zone confinée et sécurisée.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&h=600&fit=crop", longDesc: "Le flocage amiante est la forme la plus dangereuse car les fibres se libèrent facilement. Nos équipes interviennent en zone confinée avec des équipements de protection respiratoire adaptés. Chaque chantier fait l'objet d'un plan de retrait validé.", prestations: ["Plafonds et poutres", "Canalisations", "Zone confinée hermétique", "Protection respiratoire", "Mesures d'empoussièrement", "Devis gratuit"] },
      { title: "Confinement & Sécurisation", slug: "confinement-securisation", desc: "Mise en place de zones de confinement pour chantiers de désamiantage. Respect des normes SS3/SS4.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop", longDesc: "La sécurisation d'un chantier de désamiantage passe par la mise en place d'un confinement hermétique. Nos équipes installent des sas d'entrée/sortie, des extracteurs d'air avec filtration HEPA, et réalisent les tests d'étanchéité réglementaires.", prestations: ["Confinement hermétique", "Sas personnel/matériel", "Filtration HEPA", "Tests d'étanchéité", "Normes SS3/SS4", "Devis gratuit"] },
      { title: "Évacuation Déchets Amiantés", slug: "evacuation-dechets-amiantes", desc: "Transport et élimination des déchets amiantés en centre agréé. Bordereau de suivi des déchets.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop", longDesc: "L'évacuation des déchets amiantés est strictement réglementée. Nous assurons le conditionnement, le transport et l'élimination en Installation de Stockage de Déchets Dangereux (ISDD). Un bordereau de suivi des déchets (BSD) vous est remis.", prestations: ["Conditionnement réglementaire", "Transport sécurisé", "Centre ISDD agréé", "Bordereau BSD", "Certificat d'élimination", "Devis gratuit"] },
    ] as SubService[],
    gallery: [
      { before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", legend: "Toiture Lyon 8e — Retrait plaques" },
      { before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", legend: "Cave Vénissieux — Dalle amiantée" },
      { before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop", legend: "Immeuble Villeurbanne — Chantier complet" },
      { before: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", legend: "Garage Caluire — Désamiantage" },
      { before: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", legend: "Bureau Lyon 2e — Retrait flocage" },
      { before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop", legend: "Sous-sol Saint-Priest — Chantier" },
    ],
  },
  {
    slug: "nettoyage",
    title: "Nettoyage",
    icon: Sparkles,
    color: "secondary",
    colorHex: "#10B981",
    badge: "Professionnel",
    shortDesc: "Nettoyage professionnel : fin de chantier, bureaux, appartements, locaux industriels. Devis gratuit à Lyon et région.",
    longDesc: `Notre service de nettoyage professionnel à Lyon et dans toute la région couvre l'ensemble de vos besoins : nettoyage de fin de chantier, entretien de bureaux, nettoyage d'appartements, locaux industriels et commerciaux.

Nos équipes sont formées aux techniques professionnelles et utilisent des produits et équipements adaptés à chaque type de surface. Du nettoyage haute pression au ponçage de carrelage, en passant par le lavage de vitres, nous garantissons un résultat impeccable.

Nous intervenons également dans les cas les plus complexes : syndrome de Diogène, dégâts des eaux, nettoyage après sinistre. Discrétion et efficacité sont nos maîtres mots.`,
    prestations: [
      "Nettoyage fin de chantier",
      "Nettoyage bureaux et locaux professionnels",
      "Nettoyage appartement et maison",
      "Nettoyage industriel",
      "Lavage et nettoyage de vitres",
      "Nettoyage haute pression",
      "Nettoyage syndrome de Diogène",
      "Nettoyage après dégâts des eaux",
    ],
    subServices: [
      { title: "Nettoyage Locaux après Débarras", slug: "nettoyage-apres-debarras", desc: "Remise en état complète de vos locaux après un débarras. Sol, murs, vitres — tout est nettoyé.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=600&fit=crop", longDesc: "Après un débarras, vos locaux nécessitent un nettoyage en profondeur. Nos équipes interviennent immédiatement pour remettre en état sols, murs, vitres et sanitaires. Résultat impeccable garanti.", prestations: ["Sols et murs", "Vitres et menuiseries", "Sanitaires", "Désodorisation", "Prêt à habiter", "Devis gratuit"] },
      { title: "Entreprise de Nettoyage", slug: "entreprise-nettoyage", desc: "3D Services, entreprise de nettoyage professionnel à Lyon. Particuliers et professionnels.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&h=600&fit=crop", longDesc: "3D Services est votre entreprise de nettoyage de confiance à Lyon et dans un rayon de 200 km. Nous proposons une gamme complète de services de nettoyage pour particuliers et professionnels.", prestations: ["Particuliers et pros", "Devis gratuit", "Intervention 7j/7", "Équipements pro", "Produits certifiés", "Équipe expérimentée"] },
      { title: "Nettoyage Bureaux", slug: "nettoyage-bureaux", desc: "Entretien régulier ou ponctuel de vos bureaux et espaces de travail. Résultat impeccable garanti.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=600&fit=crop", longDesc: "Un environnement de travail propre améliore la productivité. Nous proposons des contrats d'entretien régulier ou des interventions ponctuelles pour vos bureaux, salles de réunion, espaces communs et sanitaires.", prestations: ["Entretien régulier", "Intervention ponctuelle", "Sols et surfaces", "Sanitaires", "Espaces communs", "Devis gratuit"] },
      { title: "Nettoyage Appartement", slug: "nettoyage-appartement", desc: "Nettoyage complet de votre appartement : sols, vitres, cuisine, salle de bain. Produits professionnels.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&h=600&fit=crop", longDesc: "Notre service de nettoyage d'appartement couvre chaque pièce de votre logement. Cuisine, salle de bain, chambres, salon — nous utilisons des produits professionnels pour un résultat impeccable. Idéal pour un état des lieux ou un grand ménage.", prestations: ["Cuisine complète", "Salle de bain", "Sols et parquets", "Vitres intérieures", "État des lieux", "Devis gratuit"] },
      { title: "Nettoyage Fin de Chantier", slug: "nettoyage-fin-chantier", desc: "Remise en état après travaux : poussière, résidus de peinture, gravats légers. Prêt à emménager.", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900&h=600&fit=crop", longDesc: "Le nettoyage de fin de chantier est indispensable après des travaux de rénovation. Nos équipes éliminent poussière de plâtre, résidus de peinture, traces de colle et gravats légers. Votre espace est prêt à être aménagé.", prestations: ["Poussière de plâtre", "Résidus de peinture", "Traces de colle", "Gravats légers", "Aspirations et lavage", "Devis gratuit"] },
      { title: "Nettoyage Industriel", slug: "nettoyage-industriel", desc: "Nettoyage de sites industriels, entrepôts, usines. Équipements professionnels et personnel qualifié.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop", longDesc: "Nous intervenons sur les sites industriels avec des équipements adaptés : autolaveuses, aspirateurs industriels, nettoyeurs haute pression. Entrepôts, usines, ateliers — nos équipes sont formées aux contraintes spécifiques de chaque environnement.", prestations: ["Entrepôts et usines", "Autolaveuse", "Aspirateur industriel", "Haute pression", "Protocole sécurité", "Devis gratuit"] },
      { title: "Lavage & Nettoyage Vitres", slug: "nettoyage-vitres", desc: "Nettoyage de vitres intérieures et extérieures, en hauteur ou accès difficile. Résultat sans traces.", image: "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=900&h=600&fit=crop", longDesc: "Nos vitriers professionnels interviennent pour le nettoyage de toutes vos surfaces vitrées : vitrines, baies vitrées, vérandas, verrières. Nous travaillons en hauteur avec des équipements adaptés pour un résultat sans traces.", prestations: ["Vitrines commerciales", "Baies vitrées", "Vérandas", "Travail en hauteur", "Résultat sans traces", "Devis gratuit"] },
      { title: "Nettoyage Restaurant", slug: "nettoyage-restaurant", desc: "Nettoyage professionnel de restaurants et cuisines. Respect des normes d'hygiène HACCP.", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&h=600&fit=crop", longDesc: "Le nettoyage de restaurant exige le respect strict des normes d'hygiène HACCP. Nos équipes nettoient cuisines professionnelles, salles de restaurant, sanitaires et espaces de stockage avec des produits agréés alimentaire.", prestations: ["Cuisine professionnelle", "Salle de restaurant", "Normes HACCP", "Produits agréés", "Hotte et extraction", "Devis gratuit"] },
      { title: "Nettoyage Haute Pression", slug: "nettoyage-haute-pression", desc: "Décapage et nettoyage haute pression : façades, terrasses, parkings, sols industriels.", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&h=600&fit=crop", longDesc: "Notre service de nettoyage haute pression élimine les salissures les plus tenaces : mousses, graffitis, taches d'huile, traces noires. Nous intervenons sur façades, terrasses, parkings, allées et sols industriels.", prestations: ["Façades", "Terrasses et dalles", "Parkings", "Graffitis", "Sols industriels", "Devis gratuit"] },
      { title: "Nettoyage Base de Vie Chantier", slug: "nettoyage-base-vie", desc: "Entretien et nettoyage des bases de vie de chantier : bungalows, sanitaires, réfectoires.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop", longDesc: "L'entretien des bases de vie de chantier est essentiel pour le bien-être des équipes. Nous nettoyons bungalows, sanitaires chimiques, réfectoires et espaces communs selon un planning régulier ou à la demande.", prestations: ["Bungalows", "Sanitaires", "Réfectoires", "Espaces communs", "Planning régulier", "Devis gratuit"] },
      { title: "Nettoyage après Dégâts des Eaux", slug: "nettoyage-degats-eaux", desc: "Intervention rapide après sinistre : assèchement, désinfection, remise en état de votre local.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&h=600&fit=crop", longDesc: "Après un dégât des eaux, une intervention rapide est cruciale. Nos équipes assurent le pompage, l'assèchement, la désinfection et la remise en état de vos locaux. Nous travaillons avec les assurances pour faciliter vos démarches.", prestations: ["Pompage et aspiration", "Assèchement", "Désinfection", "Remise en état", "Dossier assurance", "Devis gratuit"] },
      { title: "Nettoyage Syndrome de Diogène", slug: "nettoyage-diogene", desc: "Prise en charge des cas extrêmes avec discrétion et professionnalisme. Désinfection complète.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop", longDesc: "Le syndrome de Diogène nécessite une intervention spécialisée. Nos équipes interviennent avec discrétion et professionnalisme : débarras, nettoyage en profondeur, désinfection, traitement anti-nuisibles. Nous accompagnons les familles et les services sociaux.", prestations: ["Débarras complet", "Nettoyage profondeur", "Désinfection totale", "Anti-nuisibles", "Accompagnement familles", "Devis gratuit"] },
    ] as SubService[],
    gallery: [
      { before: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", legend: "Appartement Lyon 6e — Nettoyage complet" },
      { before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", legend: "Bureau Villeurbanne — Fin de chantier" },
      { before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=800&h=600&fit=crop", legend: "Local Bron — Nettoyage industriel" },
      { before: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", legend: "Restaurant Lyon 2e — Remise en état" },
      { before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", legend: "Vitres Caluire — Nettoyage pro" },
      { before: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop", after: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=600&fit=crop", legend: "Chantier Saint-Étienne — Fin de travaux" },
    ],
  },
];

export type ServiceSlug = (typeof SERVICES)[number]["slug"];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

// Lyon arrondissements (1er au 9ème)
export const ARRONDISSEMENTS_LYON = [
  { num: 1, nom: "Presqu'île / Terreaux", quartiers: ["Les Terreaux", "Place des Jacobins", "Hôtel de Ville"], voisins: [2, 4, 5] },
  { num: 2, nom: "Confluent / Bellecour", quartiers: ["Bellecour", "Ainay", "Confluence", "Perrache"], voisins: [1, 5] },
  { num: 3, nom: "Part-Dieu / Préfecture", quartiers: ["Part-Dieu", "Préfecture", "Saxe-Gambetta", "Montchat"], voisins: [1, 6, 7, 8] },
  { num: 4, nom: "Croix-Rousse", quartiers: ["Croix-Rousse", "Plateau", "Pentes"], voisins: [1, 6] },
  { num: 5, nom: "Vieux Lyon / Point du Jour", quartiers: ["Vieux Lyon", "Saint-Jean", "Fourvière", "Point du Jour"], voisins: [1, 2, 9] },
  { num: 6, nom: "Brotteaux / Tête d'Or", quartiers: ["Les Brotteaux", "Parc de la Tête d'Or", "Foch"], voisins: [1, 3, 4] },
  { num: 7, nom: "Guillotière / Jean Macé", quartiers: ["Guillotière", "Jean Macé", "Gerland"], voisins: [2, 3, 8] },
  { num: 8, nom: "États-Unis / Mermoz", quartiers: ["États-Unis", "Mermoz", "Monplaisir", "Le Bachut"], voisins: [3, 7] },
  { num: 9, nom: "Vaise / Duchère", quartiers: ["Vaise", "La Duchère", "Saint-Rambert", "Gorge de Loup"], voisins: [4, 5] },
];

export const getArrondissementLyon = (num: number) => ARRONDISSEMENTS_LYON.find((a) => a.num === num);

export const VILLES_LYON = [
  { slug: "lyon", nom: "Lyon", dep: "69", dist: 0, quartiers: ["Presqu'île", "Vieux Lyon", "Part-Dieu"] },
  { slug: "villeurbanne", nom: "Villeurbanne", dep: "69", dist: 5, quartiers: ["Gratte-Ciel", "Tonkin"] },
  { slug: "venissieux", nom: "Vénissieux", dep: "69", dist: 10, quartiers: ["Centre", "Minguettes"] },
  { slug: "bron", nom: "Bron", dep: "69", dist: 8, quartiers: ["Centre", "Parilly"] },
  { slug: "caluire", nom: "Caluire-et-Cuire", dep: "69", dist: 8, quartiers: ["Centre", "Bissardon"] },
  { slug: "saint-priest", nom: "Saint-Priest", dep: "69", dist: 15, quartiers: ["Centre", "Manissieux"] },
  { slug: "meyzieu", nom: "Meyzieu", dep: "69", dist: 18, quartiers: ["Centre", "Les Plantées"] },
  { slug: "decines", nom: "Décines-Charpieu", dep: "69", dist: 15, quartiers: ["Centre", "Charpieu"] },
  { slug: "tassin", nom: "Tassin-la-Demi-Lune", dep: "69", dist: 8, quartiers: ["Centre", "Alaï"] },
  { slug: "grenoble", nom: "Grenoble", dep: "38", dist: 104, quartiers: ["Centre-ville", "Bastille", "Europole"] },
  { slug: "saint-etienne", nom: "Saint-Étienne", dep: "42", dist: 60, quartiers: ["Centre-ville", "Châteaucreux"] },
  { slug: "valence", nom: "Valence", dep: "26", dist: 100, quartiers: ["Centre-ville", "Victor Hugo"] },
  { slug: "chambery", nom: "Chambéry", dep: "73", dist: 100, quartiers: ["Centre-ville", "Le Biollay"] },
  { slug: "annecy", nom: "Annecy", dep: "74", dist: 140, quartiers: ["Vieille Ville", "Les Marquisats"] },
  { slug: "bourg-en-bresse", nom: "Bourg-en-Bresse", dep: "01", dist: 65, quartiers: ["Centre", "Brou"] },
  { slug: "macon", nom: "Mâcon", dep: "71", dist: 70, quartiers: ["Centre-ville", "Flacé"] },
  { slug: "roanne", nom: "Roanne", dep: "42", dist: 90, quartiers: ["Centre", "Le Coteau"] },
  { slug: "vienne", nom: "Vienne", dep: "38", dist: 32, quartiers: ["Centre-ville", "Estressin"] },
  { slug: "bourgoin-jallieu", nom: "Bourgoin-Jallieu", dep: "38", dist: 45, quartiers: ["Centre", "Jallieu"] },
  { slug: "romans", nom: "Romans-sur-Isère", dep: "26", dist: 80, quartiers: ["Centre-ville", "Quartier historique"] },
  { slug: "clermont-ferrand", nom: "Clermont-Ferrand", dep: "63", dist: 165, quartiers: ["Centre-ville", "Jaude"] },
  { slug: "dijon", nom: "Dijon", dep: "21", dist: 190, quartiers: ["Centre-ville", "Toison d'Or"] },
  { slug: "montlucon", nom: "Montluçon", dep: "03", dist: 195, quartiers: ["Centre-ville", "Ville Gozet"] },
  { slug: "aubenas", nom: "Aubenas", dep: "07", dist: 140, quartiers: ["Centre-ville", "Quartier du Château"] },
  { slug: "montelimar", nom: "Montélimar", dep: "26", dist: 145, quartiers: ["Centre-ville", "Les Alexis"] },
];

export const getVilleLyon = (slug: string) => VILLES_LYON.find((v) => v.slug === slug);
