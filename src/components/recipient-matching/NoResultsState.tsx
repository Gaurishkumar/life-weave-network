
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const NoResultsState: React.FC = () => {
  return (
    <motion.div
      key="no-results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <motion.div 
        className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <Search size={30} className="text-gray-500 dark:text-gray-400" />
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-semibold mb-3 text-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        No Matches Found
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 dark:text-gray-400 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        We couldn't find any matching donors for your criteria. Try adjusting your search parameters or check back soon as our donor database is updated daily.
      </motion.p>
    </motion.div>
  );
};

export default NoResultsState;
