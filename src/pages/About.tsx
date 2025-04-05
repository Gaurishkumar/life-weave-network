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
        <div className="h-14 w-14 rounded-full bg-spectrum-purple/10 flex items-center justify-center border border-spectrum-purple/20">
          {icon}
        </div>
      </div>
      
      <div className="ml-6 pb-16">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const timelineItems = [
    {
      icon: <UserPlus size={24} className="text-spectrum-purple" />,
      title: "Donor Registration",
      description: "Donors register their information, including personal details, blood type, and organs they're willing to donate. All data is securely encrypted and stored on a decentralized network."
    },
    {
      icon: <FileText size={24} className="text-spectrum-purple" />,
      title: "Smart Contract Creation",
      description: "A smart contract is created on the Polygon Mumbai blockchain, containing the donor's consent and donation preferences. This creates a transparent, immutable record."
    },
    {
      icon: <LinkIcon size={24} className="text-spectrum-purple" />,
      title: "Match Found",
      description: "Our algorithm finds potential matches based on medical compatibility, location, and timing constraints. Recipients can view and request matches with donors."
    },
    {
      icon: <Check size={24} className="text-spectrum-purple" />,
      title: "Consent Confirmation",
      description: "Both donor and recipient confirm the match via digital signatures on the blockchain, creating a binding agreement that ensures transparency and prevents fraud."
    },
    {
      icon: <Hospital size={24} className="text-spectrum-purple" />,
      title: "Hospital Notification",
      description: "Verified medical facilities are notified of the match and given secure access to relevant medical information. The transfer process begins with hospital oversight."
    }
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center text-gradient">
            How SPECTRUM Works
          </h1>
          <p className="section-subtitle text-center">
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
          
          <div className="glass-card p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-spectrum-blue/10 flex items-center justify-center">
                  <Shield size={24} className="text-spectrum-blue" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Patient data is encrypted and only accessible by authorized parties. 
                    The blockchain ensures no unauthorized access or tampering.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-spectrum-purple/10 flex items-center justify-center">
                  <Check size={24} className="text-spectrum-purple" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Every step of the process is recorded on the blockchain, creating a transparent
                    audit trail that prevents fraud and ensures accountability.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-spectrum-green/10 flex items-center justify-center">
                  <LinkIcon size={24} className="text-spectrum-green" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Smart contracts automate verification processes, reducing administrative overhead
                    and significantly speeding up the matching process.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-spectrum-pink/10 flex items-center justify-center">
                  <Hospital size={24} className="text-spectrum-pink" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Global Access</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The platform enables cross-border matching, expanding the pool of potential
                    donors and recipients regardless of geographic location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center my-16"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join SPECTRUM today and become part of a revolutionary approach to organ donation
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
