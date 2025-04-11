
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { UserCheck, Activity, Stethoscope, HeartPulse } from "lucide-react";

interface ProcessSectionProps {
  processInView: boolean;
  processRef: React.RefObject<HTMLDivElement>;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ processInView, processRef }) => {
  const processControls = useAnimation();
  
  React.useEffect(() => {
    if (processInView) {
      processControls.start("visible");
    }
  }, [processInView, processControls]);

  const steps = [
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
  ];

  return (
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
            {steps.map((step, index) => (
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
  );
};

export default ProcessSection;
