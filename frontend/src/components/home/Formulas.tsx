import { Leaf } from "lucide-react";
import SectionReveal from "../../components/SectionReveal";

const Formulas = () => (
  <section className="py-20 bg-card">
    <SectionReveal>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Video + text */}
          <div>
            <div className="rounded-xl overflow-hidden shadow-card">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
  src="https://www.youtube.com/embed/r9-DNqxWek4?start=2"
                  title="3D Services"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              Notre société de débarras à Lyon se veut être une société responsable. Les encombrants récupérés lors de nos débarras sont soit : donnés à des associations, revendus sur des marchés, revalorisés afin de permettre un{" "}
                débarras gratuit
              ou encore recyclés dans des déchetteries professionnelles.
            </p>
          </div>

          {/* Right — Description */}
          <div>
            <h2 className="font-display font-black text-3xl text-foreground mb-4 leading-tight">
              Débarras à Lyon et en région :<br />
              Pourquoi nous ?
            </h2>
            <p className="text-muted-foreground text-[15px] mb-8 leading-relaxed">
              Nos services de débarras et nettoyage s'adressent aux particuliers et professionnels. La qualité de nos services repose sur :
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Une équipe humaine d'experts</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Des équipes : humaines, qualifiées et expérimentées dans le débarras et le nettoyage. Elles sont sélectionnées avec soin.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Des services responsables</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Les objets débarrassés à Lyon et en région sont ensuite donnés, rachetés (débarras gratuit) ou encore recyclés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  </section>
);

export default Formulas;
