
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDownCircle, HeartPulse } from "lucide-react";
import ParticleBackground from "../ParticleBackground";
import MedicalAnimations from "../MedicalAnimations";
import SplineAnimation from "../SplineAnimation";

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <MedicalAnimations />
      
      {/* Spline 3D Animation - Medical Scene */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <SplineAnimation 
          splineUrl="https://prod.spline.design/6PCD7WsZv9IJH3gN/scene.splinecode" 
          className="w-full h-full"
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-8 mx-auto w-24 h-24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <HeartPulse className="w-full h-full text-spectrum-pink animate-pulse" strokeWidth={1.5} />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-gray-800 dark:text-white"
            >
              Save Lives With{" "}
            </motion.span>
            <motion.span 
              className="relative text-gradient"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="relative z-10">ChainMed</span>
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-spectrum rounded-full opacity-70"></span>
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            A decentralized platform connecting organ donors and recipients
            <br />
            <span className="text-gradient font-semibold">Secure. Transparent. Life-saving.</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/donor-registration" className="btn-primary group relative overflow-hidden">
                <span className="relative z-10">Register as Donor</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/recipient-matching" className="btn-secondary group relative overflow-hidden">
                <span className="relative z-10">Find a Match</span>
                <span className="absolute inset-0 bg-spectrum-purple opacity-0 group-hover:opacity-10 transition-opacity"></span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToFeatures}
            className="text-gray-600 dark:text-gray-400 hover:text-spectrum-purple dark:hover:text-spectrum-purple transition-colors focus:outline-none"
            aria-label="Scroll Down"
          >
            <ArrowDownCircle className="w-10 h-10 animate-scroll-hint" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
