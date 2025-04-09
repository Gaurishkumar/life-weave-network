
import React from "react";
import { motion } from "framer-motion";
import { FileText, UserPlus, Link as LinkIcon, Hospital, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ icon, title, description, step }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
      className="flex relative"
    >
      {step < 5 && (
        <div className="absolute left-7 top-10 w-0.5 h-full bg-gradient-to-b from-spectrum-purple to-transparent"></div>
      )}
      
      <div className="z-10 flex-shrink-0">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-spectrum-purple to-spectrum-blue flex items-center justify-center border border-white/20 shadow-lg">
          {icon}
        </div>
      </div>
      
      <div className="ml-6 pb-16">
        <h3 className="text-xl font-semibold mb-2 text-gradient">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const timelineItems = [
    {
      icon: <UserPlus size={24} className="text-white" />,
      title: "Donor Registration",
      description: "Donors register their information, including personal details, blood type, and organs they're willing to donate. All data is securely encrypted and stored on a decentralized network."
    },
    {
      icon: <FileText size={24} className="text-white" />,
      title: "Smart Contract Creation",
      description: "A smart contract is created on the Polygon Mumbai blockchain, containing the donor's consent and donation preferences. This creates a transparent, immutable record."
    },
    {
      icon: <LinkIcon size={24} className="text-white" />,
      title: "Match Found",
      description: "Our algorithm finds potential matches based on medical compatibility, location, and timing constraints. Recipients can view and request matches with donors."
    },
    {
      icon: <Check size={24} className="text-white" />,
      title: "Consent Confirmation",
      description: "Both donor and recipient confirm the match via digital signatures on the blockchain, creating a binding agreement that ensures transparency and prevents fraud."
    },
    {
      icon: <Hospital size={24} className="text-white" />,
      title: "Hospital Notification",
      description: "Verified medical facilities are notified of the match and given secure access to relevant medical information. The transfer process begins with hospital oversight."
    }
  ];

  return (
    <div className="relative py-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-spectrum-blue/5 to-spectrum-purple/5 pointer-events-none"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="section-title text-gradient">
            How ChainMed Works
          </h1>
          <p className="section-subtitle">
            Our decentralized platform uses blockchain technology to create a secure, transparent
            process for organ donation matching.
          </p>
        </motion.div>
        
        <div className="mt-16 pl-4">
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              step={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-gradient">
            Why Blockchain for Organ Donation?
          </h2>
          
          <div className="glass-card p-8 mb-12 shadow-xl backdrop-blur-xl bg-white/10 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="flex"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-spectrum-blue to-spectrum-purple flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 text-gradient">Security & Privacy</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Patient data is encrypted and only accessible by authorized parties. 
                    The blockchain ensures no unauthorized access or tampering.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-spectrum-purple to-spectrum-pink flex items-center justify-center">
                  <Check size={24} className="text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 text-gradient">Transparency</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Every step of the process is recorded on the blockchain, creating a transparent
                    audit trail that prevents fraud and ensures accountability.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-spectrum-green to-spectrum-blue flex items-center justify-center">
                  <LinkIcon size={24} className="text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 text-gradient">Efficiency</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Smart contracts automate verification processes, reducing administrative overhead
                    and significantly speeding up the matching process.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-spectrum-pink to-spectrum-purple flex items-center justify-center">
                  <Hospital size={24} className="text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2 text-gradient">Global Access</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The platform enables cross-border matching, expanding the pool of potential
                    donors and recipients regardless of geographic location.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center my-16 glass-card p-10 shadow-lg backdrop-blur-xl bg-gradient-to-r from-spectrum-blue/10 to-spectrum-purple/10 border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-6 text-gradient">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join ChainMed today and become part of a revolutionary approach to organ donation
            that's saving lives through technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donor-registration" className="btn-primary">
              Register as Donor
            </Link>
            <Link to="/recipient-matching" className="btn-secondary">
              Find a Match
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
