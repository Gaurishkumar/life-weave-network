
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, CheckCircle2, AlertCircle, Database, Lock, Shield } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// UI Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ContextType = {
  setShowConsentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organsList = ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Cornea"];

// Simulated blockchain data structure
interface BlockchainRecord {
  id: string;
  timestamp: string;
  donorName: string;
  age: string;
  bloodGroup: string;
  organs: string[];
  city: string;
  walletAddress: string;
  transactionHash: string;
  status: "pending" | "validated" | "matched";
  matchedTo?: string;
}

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
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error" | "validating">("idle");
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>([]);
  const [showBlockchain, setShowBlockchain] = useState(false);

  // Load example blockchain records on component mount
  useEffect(() => {
    // This simulates loading data from a blockchain
    const exampleRecords: BlockchainRecord[] = [
      {
        id: "0x7a2c",
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        donorName: "John Doe",
        age: "34",
        bloodGroup: "O+",
        organs: ["Kidney"],
        city: "San Francisco",
        walletAddress: "0x8c3F...e4d2",
        transactionHash: "0xfde3c...b42a",
        status: "validated"
      },
      {
        id: "0x9e1b",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        donorName: "Sarah Chen",
        age: "29",
        bloodGroup: "A-",
        organs: ["Liver", "Cornea"],
        city: "Boston",
        walletAddress: "0x3f7a...9c21",
        transactionHash: "0xa71bc...3d9f",
        status: "matched",
        matchedTo: "Alex Rivera (Liver)"
      }
    ];
    
    setBlockchainRecords(exampleRecords);
  }, []);

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
      setSubmitState("validating");
      
      // In a real app, you would use window.ethereum.request
      setTimeout(() => {
        setWalletConnected(true);
        setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
        setSubmitState("idle");
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully.",
          variant: "default",
        });
      }, 1500);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setSubmitState("error");
    }
  };

  const validateSmartContract = () => {
    // Simulate smart contract validation
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Simulated 90% success rate
        const isValid = Math.random() < 0.9;
        resolve(isValid);
      }, 2000);
    });
  };

  const createBlockchainRecord = (): BlockchainRecord => {
    // Generate a unique ID and transaction hash
    const id = "0x" + Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
    const transactionHash = "0x" + Array.from(
      { length: 64 }, 
      () => Math.floor(Math.random() * 16).toString(16)
    ).join('');

    return {
      id,
      timestamp: new Date().toISOString(),
      donorName: formData.name,
      age: formData.age,
      bloodGroup: formData.bloodGroup,
      organs: formData.organs,
      city: formData.city,
      walletAddress: walletAddress.substring(0, 6) + "..." + walletAddress.substring(38),
      transactionHash: transactionHash.substring(0, 7) + "..." + transactionHash.substring(60),
      status: "pending"
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    // Form validation
    if (!formData.name || !formData.age || !formData.bloodGroup || formData.organs.length === 0 || !formData.city) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Start the validation process
    setSubmitState("validating");
    
    try {
      // Simulate blockchain interaction
      const isValid = await validateSmartContract();
      
      if (isValid) {
        // Create a new blockchain record
        const newRecord = createBlockchainRecord();
        
        // Add to blockchain (simulated)
        setBlockchainRecords(prev => [newRecord, ...prev]);
        
        setTimeout(() => {
          setSubmitState("success");
          
          // Update record status after 3 seconds
          setTimeout(() => {
            setBlockchainRecords(prev => 
              prev.map(record => 
                record.id === newRecord.id 
                  ? { ...record, status: "validated" } 
                  : record
              )
            );
            
            // After success, show the consent modal
            setShowConsentModal(true);
          }, 3000);
          
        }, 1500);
        
        // Show blockchain records after registration
        setShowBlockchain(true);
        
      } else {
        setSubmitState("error");
        toast({
          title: "Validation Failed",
          description: "The smart contract could not validate your information",
          variant: "destructive",
        });
      }
    } catch (error) {
      setSubmitState("error");
      console.error("Error submitting form:", error);
    }
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative py-20 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-spectrum-purple/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-spectrum-blue/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
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
            All registrations are securely stored on the blockchain.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card mt-10 p-8 shadow-xl backdrop-blur-xl bg-white/10 border border-white/20"
        >
          {submitState === "success" ? (
            <div className="text-center py-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 dark:from-green-600 dark:to-green-700 rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-gradient">
                Registration Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for registering as a donor. Your information has been saved securely on the blockchain.
              </p>
              <div className="flex items-center justify-center space-x-2 mb-6 text-sm text-gray-500 dark:text-gray-400">
                <Lock size={16} />
                <span>Blockchain Verification In Progress</span>
              </div>
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
                className="mx-auto w-20 h-20 bg-gradient-to-r from-red-400 to-red-500 dark:from-red-600 dark:to-red-700 rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <AlertCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-gradient">
                Registration Failed
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                There was an error processing your registration. The smart contract could not validate your information.
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
                  <div className="bg-gray-50/30 dark:bg-gray-800/30 p-6 rounded-lg mb-4 backdrop-blur-sm border border-white/20 shadow-md">
                    {walletConnected ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-r from-green-400 to-green-500 dark:from-green-600 dark:to-green-700 rounded-full flex items-center justify-center shadow-md">
                            <CheckCircle2 size={20} className="text-white" />
                          </div>
                          <span className="ml-3 text-gray-700 dark:text-gray-300 font-medium">Wallet Connected</span>
                        </div>
                        <div className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 py-2 px-3 rounded-md font-mono">
                          {`${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={connectWallet}
                        disabled={submitState === "validating"}
                        className={`w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-spectrum-blue to-spectrum-purple hover:from-spectrum-darkBlue hover:to-spectrum-darkPurple text-white font-medium py-3 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                          submitState === "validating" ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {submitState === "validating" ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span>Connecting...</span>
                          </>
                        ) : (
                          <>
                            <Wallet size={20} />
                            <span>Connect MetaMask</span>
                          </>
                        )}
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
                    className="input-field focus:ring-spectrum-purple focus:border-spectrum-purple"
                    placeholder="Enter your full name"
                    disabled={submitState === "validating"}
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
                    className="input-field focus:ring-spectrum-purple focus:border-spectrum-purple"
                    placeholder="Enter your age"
                    disabled={submitState === "validating"}
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
                    className="input-field focus:ring-spectrum-purple focus:border-spectrum-purple"
                    disabled={submitState === "validating"}
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {organsList.map(organ => (
                      <div 
                        key={organ} 
                        onClick={() => !submitState.includes("validating") && handleOrganToggle(organ)}
                        className={`
                          flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300
                          ${submitState === "validating" ? "opacity-70 cursor-not-allowed" : ""}
                          ${formData.organs.includes(organ) 
                            ? 'bg-gradient-to-r from-spectrum-purple/20 to-spectrum-blue/20 border border-white/30 shadow-md' 
                            : 'bg-gray-50/30 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30'}
                        `}
                      >
                        <input
                          type="checkbox"
                          id={organ}
                          checked={formData.organs.includes(organ)}
                          onChange={() => {}}
                          disabled={submitState === "validating"}
                          className="w-4 h-4 text-spectrum-purple bg-gray-100 border-gray-300 rounded focus:ring-spectrum-purple"
                        />
                        <label htmlFor={organ} className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer w-full">
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
                    className="input-field focus:ring-spectrum-purple focus:border-spectrum-purple"
                    placeholder="Enter your city"
                    disabled={submitState === "validating"}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={submitState === "validating"}
                    className={`w-full bg-gradient-to-r from-spectrum-purple to-spectrum-blue hover:from-spectrum-darkPurple hover:to-spectrum-darkBlue text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 ${
                      submitState === "validating" ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {submitState === "validating" ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Validating on Blockchain...</span>
                      </div>
                    ) : (
                      "Register as Donor"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
        
        {/* Blockchain Records Section */}
        {(blockchainRecords.length > 0 || showBlockchain) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card mt-10 p-6 shadow-xl backdrop-blur-xl bg-white/10 border border-white/20"
          >
            <div className="flex items-center mb-4">
              <Database className="text-spectrum-purple mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Blockchain Records</h2>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Recent donor registrations securely stored on the blockchain. Each record is immutable and cryptographically verified.
            </p>
            
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>Recent blockchain transactions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Blood</TableHead>
                    <TableHead>Organs</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockchainRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-xs">{record.id}</TableCell>
                      <TableCell>{formatDate(record.timestamp)}</TableCell>
                      <TableCell>{record.donorName}</TableCell>
                      <TableCell>{record.bloodGroup}</TableCell>
                      <TableCell>{record.organs.join(", ")}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {record.status === "pending" ? (
                            <div className="flex items-center text-yellow-600">
                              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                              <span>Pending</span>
                            </div>
                          ) : record.status === "validated" ? (
                            <div className="flex items-center text-green-600">
                              <Shield size={14} className="mr-1" />
                              <span>Validated</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-blue-600">
                              <CheckCircle2 size={14} className="mr-1" />
                              <span>Matched</span>
                            </div>
                          )}
                        </div>
                        {record.matchedTo && (
                          <div className="text-xs text-gray-500 mt-1">
                            → {record.matchedTo}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-md border border-gray-200/30 dark:border-gray-700/30">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Lock size={14} className="mr-2" />
                <span>All data is securely stored using military-grade encryption and smart contract validation</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DonorRegistration;
