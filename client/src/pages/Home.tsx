import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveMapSection from "@/components/LiveMapSection";
import RollingNewsSection from "@/components/RollingNewsSection";
import EmergencyResourcesSection from "@/components/EmergencyResourcesSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LiveMapSection />
        <RollingNewsSection />
        <EmergencyResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
