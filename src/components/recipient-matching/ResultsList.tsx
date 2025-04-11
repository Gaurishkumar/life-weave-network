
import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import ResultCard from "./ResultCard";

interface MatchResult {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  city: string;
  organ: string;
  matchPercentage: number;
  compatibility: "high" | "medium" | "low";
}

interface ResultsListProps {
  filteredResults: MatchResult[];
  handleRequestMatch: (donorId: string) => void;
}

const ResultsList: React.FC<ResultsListProps> = ({ filteredResults, handleRequestMatch }) => {
  return (
    <motion.div
      key="results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="h-10 w-10 rounded-full bg-gradient-to-br from-spectrum-blue to-spectrum-purple flex items-center justify-center shadow-lg"
        >
          <Zap size={20} className="text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-semibold text-gradient">
          {filteredResults.length} Potential {filteredResults.length === 1 ? "Match" : "Matches"} Found
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((match, index) => (
          <ResultCard 
            key={match.id}
            match={match}
            index={index}
            handleRequestMatch={handleRequestMatch}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ResultsList;
