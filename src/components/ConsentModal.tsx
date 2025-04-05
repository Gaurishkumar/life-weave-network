
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader } from "lucide-react";

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onClose }) => {
  const [processingStage, setProcessingStage] = useState<
    "initial" | "processing" | "success" | "error"
  >("initial");

  const handleSubmit = async () => {
    setProcessingStage("processing");
    
    // Simulate blockchain interaction
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      if (Math.random() > 0.2) {
        setProcessingStage("success");
        setTimeout(() => {
          onClose();
          setProcessingStage("initial");
        }, 2000);
      } else {
        setProcessingStage("error");
      }
    }, 3000);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass-card w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-2xl font-semibold text-gradient">Smart Contract Consent</h3>
                <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You are about to interact with a smart contract on the Polygon Mumbai network that will:
                </p>
                
                <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Record your consent to the organ donation match</li>
                  <li>Create an immutable record on the blockchain</li>
                  <li>Enable secure communication with the hospital</li>
                </ul>
                
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  This action requires a small amount of MATIC for gas fees.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center">
                {processingStage === "initial" && (
                  <button
                    onClick={handleSubmit}
                    className="btn-primary w-full"
                  >
                    I Consent and Approve Transaction
                  </button>
                )}
                
                {processingStage === "processing" && (
                  <div className="flex flex-col items-center">
                    <div className="relative h-20 w-20">
                      <div className="absolute inset-0 rounded-full border-t-4 border-spectrum-purple animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader size={24} className="text-spectrum-purple animate-pulse" />
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">Waiting for confirmation...</p>
                  </div>
                )}
                
                {processingStage === "success" && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Check size={40} className="text-green-500" />
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">Transaction successful!</p>
                  </motion.div>
                )}
                
                {processingStage === "error" && (
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <X size={40} className="text-red-500" />
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">Transaction failed. Please try again.</p>
                    <button
                      onClick={() => setProcessingStage("initial")}
                      className="mt-4 text-spectrum-purple hover:text-spectrum-darkPurple transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsentModal;
