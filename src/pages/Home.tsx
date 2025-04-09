
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowDownCircle, Heart, Shield, Clock, Activity, HeartPulse, Stethoscope, UserCheck } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";
import MedicalAnimations from "../components/MedicalAnimations";

const Home = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const processInView = useInView(processRef, { once: true, amount: 0.3 });
  
  const statsControls = useAnimation();
  const processControls = useAnimation();

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    }
    if (processInView) {
      processControls.start("visible");
    }
  }, [statsInView, processInView, statsControls, processControls]);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Enhanced Animated Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <MedicalAnimations />
        
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
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Save Lives With 
              </motion.span>{" "}
              <motion.span 
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-16 px-6 bg-gradient-to-b from-white/0 to-spectrum-purple/5 dark:from-gray-900/0 dark:to-spectrum-purple/10"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center text-gradient mb-12">
            Making a Real Difference
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "10K+", label: "Registered Donors", icon: <UserCheck className="h-10 w-10 mb-4 mx-auto text-spectrum-blue" /> },
              { value: "5K+", label: "Successful Matches", icon: <Heart className="h-10 w-10 mb-4 mx-auto text-spectrum-pink" /> },
              { value: "24/7", label: "Support Available", icon: <Stethoscope className="h-10 w-10 mb-4 mx-auto text-spectrum-purple" /> },
              { value: "99%", label: "Secure Blockchain Records", icon: <Shield className="h-10 w-10 mb-4 mx-auto text-spectrum-green" /> }
            ].map((stat, index) => (
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

      {/* Features Section */}
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
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 text-center group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="h-16 w-16 bg-spectrum-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-spectrum-purple/20 transition-colors">
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
              className="glass-card p-8 text-center group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="h-16 w-16 bg-spectrum-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-spectrum-blue/20 transition-colors">
                <HeartPulse className="h-8 w-8 text-spectrum-blue" />
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
              className="glass-card p-8 text-center group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="h-16 w-16 bg-spectrum-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-spectrum-pink/20 transition-colors">
                <Activity className="h-8 w-8 text-spectrum-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track the entire process from match to surgery with transparent blockchain records.
              </p>
            </motion.div>
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
      
      {/* Process Section */}
      <section 
        ref={processRef}
        className="py-20 px-6 bg-gradient-to-br from-spectrum-blue/5 to-spectrum-purple/10"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center text-gradient mb-12">
            Our Life-Saving Process
          </h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute left-1/2 top-0 w-1 h-full bg-gradient-spectrum rounded-full transform -translate-x-1/2 opacity-50"></div>
            
            {/* Steps */}
            <div className="space-y-24 md:space-y-0 relative">
              {[
                { 
                  title: "Register as a Donor", 
                  description: "Complete our secure registration form and provide your medical information.",
                  icon: <UserCheck className="h-8 w-8 text-white" />,
                  color: "bg-spectrum-blue"
                },
                { 
                  title: "Smart Algorithm Matching", 
                  description: "Our blockchain-powered algorithm finds potential matches based on medical compatibility.",
                  icon: <Activity className="h-8 w-8 text-white" />,
                  color: "bg-spectrum-purple"
                },
                { 
                  title: "Medical Verification", 
                  description: "Healthcare professionals verify the match and contact both parties.",
                  icon: <Stethoscope className="h-8 w-8 text-white" />,
                  color: "bg-spectrum-pink"
                },
                { 
                  title: "Life-Changing Results", 
                  description: "Follow the transparent process through our platform as lives are changed forever.",
                  icon: <HeartPulse className="h-8 w-8 text-white" />,
                  color: "bg-spectrum-green"
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative`}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  initial="hidden"
                  animate={processControls}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {/* Timeline Node */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <div className={`${step.color} rounded-full h-12 w-12 flex items-center justify-center shadow-lg z-10`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="glass-card p-6 md:p-8">
                      <div className={`${step.color} rounded-full h-12 w-12 flex items-center justify-center shadow-lg mb-4 md:hidden mx-auto`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-spectrum-blue/10 to-spectrum-purple/10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="relative inline-block mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="h-16 w-16 text-spectrum-pink mx-auto" />
            <span className="absolute inset-0 rounded-full bg-spectrum-pink/20 animate-ping"></span>
          </motion.div>
          
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/donor-registration" className="btn-primary">
                Become a Donor
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/recipient-matching" className="btn-secondary">
                Find a Match
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
