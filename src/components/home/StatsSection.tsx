
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { UserCheck, Heart, Stethoscope, Shield } from "lucide-react";

interface StatsSectionProps {
  statsInView: boolean;
  statsRef: React.RefObject<HTMLDivElement>;
}

const StatsSection: React.FC<StatsSectionProps> = ({ statsInView, statsRef }) => {
  const statsControls = useAnimation();
  
  React.useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    }
  }, [statsInView, statsControls]);

  const stats = [
    { value: "10K+", label: "Registered Donors", icon: <UserCheck className="h-10 w-10 mb-4 mx-auto text-spectrum-blue" /> },
    { value: "5K+", label: "Successful Matches", icon: <Heart className="h-10 w-10 mb-4 mx-auto text-spectrum-pink" /> },
    { value: "24/7", label: "Support Available", icon: <Stethoscope className="h-10 w-10 mb-4 mx-auto text-spectrum-purple" /> },
    { value: "99%", label: "Secure Blockchain Records", icon: <Shield className="h-10 w-10 mb-4 mx-auto text-spectrum-green" /> }
  ];

  return (
    <section
      ref={statsRef}
      className="py-16 px-6 bg-gradient-to-b from-white/0 to-spectrum-purple/5 dark:from-gray-900/0 dark:to-spectrum-purple/10"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center text-gradient mb-12">
          Making a Real Difference
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card px-4 py-8 rounded-2xl"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={statsControls}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {stat.icon}
              <motion.div
                className="text-4xl font-bold text-gradient mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
