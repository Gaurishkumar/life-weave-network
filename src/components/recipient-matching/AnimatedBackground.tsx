
import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* Animated background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-spectrum-blue/5 via-spectrum-purple/5 to-transparent pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-spectrum-pink/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-spectrum-blue/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse animation-delay-500"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 opacity-30 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full bg-white h-2 w-2"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AnimatedBackground;
