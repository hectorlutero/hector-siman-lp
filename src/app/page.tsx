import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartnersMarquee from "@/components/PartnersMarquee";
import RealityCheck from "@/components/RealityCheck";
import Methodology from "@/components/Methodology";
import BeforeAfter from "@/components/BeforeAfter";
import EnterpriseMap from "@/components/EnterpriseMap";
import EnterpriseMapMobile from "@/components/EnterpriseMap/EnterpriseMapMobile";
import CaseStudy from "@/components/CaseStudy";
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import Sectors from "@/components/Sectors";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PartnersMarquee />
        <RealityCheck />
        <Methodology />
        <BeforeAfter />
        <EnterpriseMap />
        <EnterpriseMapMobile />
        <CaseStudy />
        <About />
        <Technologies />
        <Sectors />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
