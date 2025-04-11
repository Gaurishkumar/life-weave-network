
import React from "react";
import { motion } from "framer-motion";

const SearchingState: React.FC = () => {
  return (
    <motion.div
      key="searching"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative w-24 h-24">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full rounded-full"
          style={{ 
            background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #F43F5E, #3B82F6)" 
          }}
          animate={{
            backgroundPosition: ["0% center", "200% center"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          <div className="absolute inset-1 bg-black/80 rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="absolute top-0 left-0 w-full h-full border-4 border-t-spectrum-blue border-r-spectrum-purple border-b-spectrum-pink border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        
        <motion.div 
          className="absolute top-3 left-3 w-3/4 h-3/4 border-4 border-t-spectrum-purple border-r-spectrum-pink border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
      
      <motion.p 
        className="mt-6 text-gradient font-medium px-4 py-2 rounded-full glass-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Searching for compatible donors...
      </motion.p>
      
      <motion.div
        className="mt-4 max-w-md text-center text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Our algorithm is analyzing blood type, tissue compatibility, location, 
        and other critical factors to find your perfect match.
      </motion.div>
    </motion.div>
  );
};

export default SearchingState;
