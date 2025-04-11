
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, HeartPulse, Activity } from "lucide-react";

interface FeaturesSectionProps {
  featuresRef: React.RefObject<HTMLDivElement>;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ featuresRef }) => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-spectrum-purple" />,
      title: "Secure & Private",
      description: "Your medical data is encrypted and only shared with verified medical professionals."
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-spectrum-blue" />,
      title: "Life-Saving Match",
      description: "Our algorithm finds optimal matches based on multiple factors, maximizing success rates."
    },
    {
      icon: <Activity className="h-8 w-8 text-spectrum-pink" />,
      title: "Real-Time Updates",
      description: "Track the entire process from match to surgery with transparent blockchain records."
    }
  ];

  return (
    <section 
      ref={featuresRef}
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center text-gradient">
          Why Choose ChainMed?
        </h2>
        <p className="section-subtitle text-center">
          Our platform leverages blockchain technology to create a more efficient, 
          transparent, and secure organ donation process.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-8 text-center group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className={`h-16 w-16 ${index === 0 ? 'bg-spectrum-purple/10' : index === 1 ? 'bg-spectrum-blue/10' : 'bg-spectrum-pink/10'} rounded-full flex items-center justify-center mx-auto mb-6 ${index === 0 ? 'group-hover:bg-spectrum-purple/20' : index === 1 ? 'group-hover:bg-spectrum-blue/20' : 'group-hover:bg-spectrum-pink/20'} transition-colors`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/about" className="btn-secondary inline-block">
              Learn How It Works
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
