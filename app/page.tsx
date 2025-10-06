import BackgroundAnimation from "@/components/background-animation";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import WorksSection from "@/components/sections/works";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <BackgroundAnimation />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
