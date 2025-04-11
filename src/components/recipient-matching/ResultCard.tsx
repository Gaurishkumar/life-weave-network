
import React from "react";
import { motion } from "framer-motion";
import { User, Droplet, Heart, MapPin, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { MatchResult } from "./types";
import { getCompatibilityColor, getCompatibilityBadge } from "./utils";

interface ResultCardProps {
  match: MatchResult;
  index: number;
  handleRequestMatch: (donorId: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ match, index, handleRequestMatch }) => {
  return (
    <motion.div
      key={match.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden h-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500">
        <div className="relative">
          {/* Match Percentage Indicator */}
          <div 
            className={`absolute top-0 left-0 h-1.5 bg-gradient-to-r ${getCompatibilityColor(match.compatibility)}`}
            style={{ width: `${match.matchPercentage}%` }}
          ></div>
          
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <motion.div 
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-spectrum-purple to-spectrum-blue flex items-center justify-center mr-3 shadow-md"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <User size={22} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-lg">{match.name}</h3>
                  <p className="text-sm text-gray-500">Age: {match.age}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold bg-gradient-to-r ${getCompatibilityColor(match.compatibility)} text-white px-3 py-1 rounded-full shadow-sm`}>
                  {match.matchPercentage}% Match
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            {getCompatibilityBadge(match.compatibility)}
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center p-2 bg-spectrum-blue/10 rounded-lg backdrop-blur-sm">
                <Droplet size={18} className="text-spectrum-blue mr-2" />
                <span className="text-sm">{match.bloodGroup}</span>
              </div>
              <div className="flex items-center p-2 bg-spectrum-pink/10 rounded-lg backdrop-blur-sm">
                <Heart size={18} className="text-spectrum-pink mr-2" />
                <span className="text-sm">{match.organ}</span>
              </div>
              <div className="flex items-center p-2 bg-spectrum-purple/10 rounded-lg backdrop-blur-sm col-span-2">
                <MapPin size={18} className="text-spectrum-purple mr-2" />
                <span className="text-sm">{match.city}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <motion.button
              onClick={() => handleRequestMatch(match.id)}
              className="w-full py-3 bg-white/50 hover:bg-gradient-to-r hover:from-spectrum-purple hover:to-spectrum-blue hover:text-white rounded-md flex items-center justify-center space-x-2 transition-all duration-500 shadow-sm border border-white/20 group-hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Request Match</span>
              <motion.div
                className="inline-block"
                initial={{ x: 0, opacity: 0 }}
                whileHover={{ x: 4, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
