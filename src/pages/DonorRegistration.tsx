
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  setShowConsentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organsList = ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Cornea"];

const DonorRegistration = () => {
  const { setShowConsentModal } = useOutletContext<ContextType>();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    organs: [] as string[],
    city: ""
  });

  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrganToggle = (organ: string) => {
    setFormData(prev => {
      const updatedOrgans = prev.organs.includes(organ)
        ? prev.organs.filter(o => o !== organ)
        : [...prev.organs, organ];
      
      return { ...prev, organs: updatedOrgans };
    });
  };

  const connectWallet = async () => {
    // Simulating MetaMask connection
    try {
      // In a real app, you would use window.ethereum.request
      setTimeout(() => {
        setWalletConnected(true);
        setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
      }, 1000);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletConnected) {
      alert("Please connect your wallet first");
      return;
    }
    
    // Form validation
    if (!formData.name || !formData.age || !formData.bloodGroup || formData.organs.length === 0 || !formData.city) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Simulated form submission
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        setSubmitState("success");
        // After success, show the consent modal
        setTimeout(() => {
          setShowConsentModal(true);
        }, 2000);
      }, 1500);
    } catch (error) {
      setSubmitState("error");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center text-gradient">
            Donor Registration
          </h1>
          <p className="section-subtitle text-center">
            Your generous decision to register as a donor could save multiple lives.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card mt-10 p-8"
        >
          {submitState === "success" ? (
            <div className="text-center py-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Registration Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for registering as a donor. Your information has been saved securely.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The smart contract consent window will appear shortly.
              </p>
            </div>
          ) : submitState === "error" ? (
            <div className="text-center py-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6"
              >
                <AlertCircle className="w-10 h-10 text-red-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Registration Failed
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                There was an error processing your registration. Please try again.
              </p>
              <button
                onClick={() => setSubmitState("idle")}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Connect Wallet Button */}
                <div className="mb-8">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
                    {walletConnected ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={16} className="text-green-500" />
                          </div>
                          <span className="ml-2 text-gray-700 dark:text-gray-300">Wallet Connected</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {`${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={connectWallet}
                        className="w-full flex items-center justify-center space-x-2 bg-spectrum-blue hover:bg-spectrum-darkBlue text-white font-medium py-3 px-4 rounded-md transition-all duration-200"
                      >
                        <Wallet size={18} />
                        <span>Connect MetaMask</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    max="80"
                    className="input-field"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Blood Group */}
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                {/* Organs Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organs for Donation
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {organsList.map(organ => (
                      <div key={organ} className="flex items-center">
                        <input
                          type="checkbox"
                          id={organ}
                          checked={formData.organs.includes(organ)}
                          onChange={() => handleOrganToggle(organ)}
                          className="w-4 h-4 text-spectrum-purple bg-gray-100 border-gray-300 rounded focus:ring-spectrum-purple"
                        />
                        <label htmlFor={organ} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {organ}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your city"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-primary w-full"
                  >
                    Register as Donor
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DonorRegistration;
