
import React, { useRef } from "react";
import { useInView } from "framer-motion";

// Import components
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import ProcessSection from "../components/home/ProcessSection";
import CtaSection from "../components/home/CtaSection";

const Home = () => {
  // Refs for scrolling and animations
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  
  // Animation triggers based on viewport
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const processInView = useInView(processRef, { once: true, amount: 0.3 });

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Spline 3D Animations */}
      <HeroSection scrollToFeatures={scrollToFeatures} />

      {/* Stats Section */}
      <StatsSection statsInView={statsInView} statsRef={statsRef} />

      {/* Features Section */}
      <FeaturesSection featuresRef={featuresRef} />
      
      {/* Process Section */}
      <ProcessSection processInView={processInView} processRef={processRef} />
      
      {/* CTA Section with Spline 3D Animations */}
      <CtaSection />
    </div>
  );
};

export default Home;
