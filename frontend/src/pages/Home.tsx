import Layout from "../components/layout/Layout";
import HeroSlider from "../components/home/HeroSlider";
import KeyFigures from "../components/home/KeyFigures";

import Formulas from "../components/home/Formulas";
import ServicesGrid from "../components/home/ServicesGrid";
import BeforeAfterSection from "../components/BeforeAfterSlider";
import ZoneChecker from "../components/ZoneChecker";
import WhyUs from "../components/home/WhyUs";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import FinalCTA from "../components/home/FinalCTA";
import SEOHead from "../components/SEOHead";
import { getSEOForPath, getLocalBusinessJsonLd } from "../data/seo";

const Home = () => {
  const seo = getSEOForPath("/");
  return (
    <Layout>
      <SEOHead title={seo.title} description={seo.description} canonical="/" jsonLd={getLocalBusinessJsonLd()} />
      <HeroSlider />
    <KeyFigures />
    
    <Formulas />
    <ServicesGrid />
    <BeforeAfterSection />
    <ZoneChecker />
    <WhyUs />
    <Testimonials />
    <FAQ />
    <FinalCTA />
    </Layout>
  );
};

export default Home;
