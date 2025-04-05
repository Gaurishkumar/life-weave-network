
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDownCircle, Heart, Shield, Clock } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";

const Home = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
              Decentralized Organ Matching Platform
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Secure. Transparent. Life-saving.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/donor-registration" className="btn-primary">
                Register as Donor
              </Link>
              <Link to="/recipient-matching" className="btn-secondary">
                Find Recipient
              </Link>
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

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center text-gradient">
            Why Choose SPECTRUM?
          </h2>
          <p className="section-subtitle text-center">
            Our platform leverages blockchain technology to create a more efficient, 
            transparent, and secure organ donation process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 text-center"
            >
              <div className="h-16 w-16 bg-spectrum-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-spectrum-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your medical data is encrypted and only shared with verified medical professionals.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 text-center"
            >
              <div className="h-16 w-16 bg-spectrum-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-spectrum-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Life-Saving Match</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our algorithm finds optimal matches based on multiple factors, maximizing success rates.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8 text-center"
            >
              <div className="h-16 w-16 bg-spectrum-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-spectrum-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track the entire process from match to surgery with transparent blockchain records.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/about" className="btn-secondary inline-block">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-spectrum-blue/10 to-spectrum-purple/10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title text-gradient"
          >
            Ready to Make a Difference?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle"
          >
            Join thousands of donors and recipients who are changing lives through our platform.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/donor-registration" className="btn-primary">
              Become a Donor
            </Link>
            <Link to="/recipient-matching" className="btn-secondary">
              Find a Match
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
