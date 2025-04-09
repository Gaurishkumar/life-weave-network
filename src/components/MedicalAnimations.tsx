
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MedicalAnimations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Medical symbols and elements to animate
  const medicalElements = [
    { type: "dna", count: 2 },
    { type: "heartbeat", count: 3 },
    { type: "cell", count: 8 },
    { type: "cross", count: 3 }
  ];

  // Create elements based on viewport size
  useEffect(() => {
    const updateElements = () => {
      if (!containerRef.current) return;
      // Any additional dynamic adjustments based on viewport can be added here
    };

    window.addEventListener("resize", updateElements);
    updateElements();

    return () => window.removeEventListener("resize", updateElements);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* DNA Helix Animation */}
      {Array.from({ length: medicalElements.find(e => e.type === "dna")?.count || 2 }).map((_, index) => (
        <div 
          key={`dna-${index}`} 
          className="absolute"
          style={{
            left: `${15 + index * 70}%`,
            top: '-5%',
            height: '110%'
          }}
        >
          <div className="relative h-full w-4 opacity-30">
            {Array.from({ length: 15 }).map((_, i) => (
              <React.Fragment key={`dna-strand-${index}-${i}`}>
                <motion.div
                  className="absolute w-8 h-2 bg-spectrum-blue rounded-full"
                  style={{ 
                    top: `${i * 7}%`, 
                    left: i % 2 === 0 ? '-100%' : '100%',
                    opacity: 0.6
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? [0, 180, 360] : [360, 180, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 2
                  }}
                />
                <motion.div
                  className="absolute w-8 h-2 bg-spectrum-purple rounded-full"
                  style={{ 
                    top: `${i * 7 + 3.5}%`, 
                    left: i % 2 === 0 ? '100%' : '-100%',
                    opacity: 0.6
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? [360, 180, 0] : [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 2
                  }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}

      {/* Heartbeat Animation */}
      {Array.from({ length: medicalElements.find(e => e.type === "heartbeat")?.count || 3 }).map((_, index) => (
        <motion.div
          key={`heartbeat-${index}`}
          className="absolute opacity-20"
          style={{
            top: `${20 + index * 30}%`,
            left: `${80 + index * 5}%`,
            width: '100px',
            height: '40px'
          }}
          initial={{ x: 100 }}
          animate={{ x: -window.innerWidth - 200 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: index * 3
          }}
        >
          <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,20 L20,20 L30,10 L40,30 L50,10 L60,30 L70,5 L80,35 L90,20 L120,20" 
              stroke="#F43F5E" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating Medical Cells */}
      {Array.from({ length: medicalElements.find(e => e.type === "cell")?.count || 8 }).map((_, index) => (
        <motion.div
          key={`cell-${index}`}
          className="absolute rounded-full opacity-20"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            background: index % 2 === 0 ? 
              'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.1) 100%)' : 
              'radial-gradient(circle, rgba(244,63,94,0.3) 0%, rgba(139,92,246,0.1) 100%)',
            width: `${Math.random() * 50 + 30}px`,
            height: `${Math.random() * 50 + 30}px`,
          }}
          initial={{ 
            x: Math.random() * 100 - 50, 
            y: Math.random() * 100 - 50,
            opacity: 0 
          }}
          animate={{ 
            x: Math.random() * 100 - 50, 
            y: Math.random() * 100 - 50,
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            x: {
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse"
            },
            y: {
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            },
            opacity: {
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      ))}

      {/* Medical Cross Symbols */}
      {Array.from({ length: medicalElements.find(e => e.type === "cross")?.count || 3 }).map((_, index) => (
        <motion.div
          key={`cross-${index}`}
          className="absolute opacity-10"
          style={{
            top: `${Math.random() * 70 + 15}%`,
            left: `${Math.random() * 70 + 15}%`,
            width: '40px',
            height: '40px'
          }}
          initial={{ rotate: 0, scale: 0.8 }}
          animate={{ 
            rotate: 360,
            scale: [0.8, 1.2, 0.8] 
          }}
          transition={{
            rotate: {
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M10,0 L14,0 L14,10 L24,10 L24,14 L14,14 L14,24 L10,24 L10,14 L0,14 L0,10 L10,10 Z" 
              fill={index % 2 === 0 ? "#8B5CF6" : "#3B82F6"} 
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default MedicalAnimations;
