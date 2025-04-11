
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PageHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <motion.h1 
        className="section-title text-gradient flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <span>Find Your Perfect</span> 
        <motion.span 
          className="relative inline-block"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="absolute -top-8 -right-8 text-spectrum-blue/70" size={24} />
          <span className="relative">Donor Match</span>
          <motion.div 
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-spectrum-blue via-spectrum-purple to-spectrum-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          ></motion.div>
        </motion.span>
      </motion.h1>
      <motion.p 
        className="section-subtitle max-w-2xl mx-auto text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Our advanced algorithm searches through our secure donor database to find the most compatible matches based on your medical requirements.
      </motion.p>
    </motion.div>
  );
};

export default PageHeader;
