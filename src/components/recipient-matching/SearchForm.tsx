
import React from "react";
import { motion } from "framer-motion";
import { 
  Search, Heart, Droplet, MapPin, RefreshCcw
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchCriteria {
  organ: string;
  bloodGroup: string;
  city: string;
}

interface SearchFormProps {
  searchCriteria: SearchCriteria;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
  bloodGroups: string[];
  organsList: string[];
  cities: string[];
  advancedFilters: boolean;
  setAdvancedFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showCompatibilityOnly: boolean;
  setShowCompatibilityOnly: React.Dispatch<React.SetStateAction<boolean>>;
  searchAnimation: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchCriteria,
  handleChange,
  handleSearch,
  isSearching,
  bloodGroups,
  organsList,
  cities,
  advancedFilters,
  setAdvancedFilters,
  showCompatibilityOnly,
  setShowCompatibilityOnly,
  searchAnimation
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="mt-10 backdrop-blur-xl"
    >
      <Card className="border border-white/20 bg-white/10 shadow-xl overflow-hidden">
        <CardHeader className="pb-0">
          <motion.h2 
            className="text-xl font-semibold text-center text-gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Search Criteria
          </motion.h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Organ Needed */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="organ" className="block text-sm font-medium mb-1 text-gradient">
                  Organ Needed
                </label>
                <div className="relative">
                  <select
                    id="organ"
                    name="organ"
                    value={searchCriteria.organ}
                    onChange={handleChange}
                    className="input-field w-full focus:ring-spectrum-purple focus:border-spectrum-purple pr-10"
                  >
                    <option value="">Select organ</option>
                    {organsList.map(organ => (
                      <option key={organ} value={organ}>{organ}</option>
                    ))}
                  </select>
                  <Heart size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spectrum-pink/70" />
                </div>
              </motion.div>

              {/* Blood Group */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label htmlFor="bloodGroup" className="block text-sm font-medium mb-1 text-gradient">
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={searchCriteria.bloodGroup}
                    onChange={handleChange}
                    className="input-field w-full focus:ring-spectrum-purple focus:border-spectrum-purple pr-10"
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  <Droplet size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spectrum-blue/70" />
                </div>
              </motion.div>

              {/* City */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <label htmlFor="city" className="block text-sm font-medium mb-1 text-gradient">
                  City (Optional)
                </label>
                <div className="relative">
                  <select
                    id="city"
                    name="city"
                    value={searchCriteria.city}
                    onChange={handleChange}
                    className="input-field w-full focus:ring-spectrum-purple focus:border-spectrum-purple pr-10"
                  >
                    <option value="">Any location</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <MapPin size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spectrum-purple/70" />
                </div>
              </motion.div>
            </div>

            {/* Advanced Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Collapsible
                open={advancedFilters}
                onOpenChange={setAdvancedFilters}
                className="w-full"
              >
                <CollapsibleTrigger className="flex items-center text-sm text-spectrum-blue hover:text-spectrum-purple transition-colors duration-200">
                  <span>{advancedFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}</span>
                  <motion.span
                    animate={{ rotate: advancedFilters ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.span>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="showCompatibilityOnly" 
                      checked={showCompatibilityOnly} 
                      onCheckedChange={(checked) => {
                        setShowCompatibilityOnly(checked as boolean);
                      }}
                    />
                    <label 
                      htmlFor="showCompatibilityOnly" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show only high compatibility matches
                    </label>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>

            {/* Search Button */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                className="relative overflow-hidden group bg-gradient-to-r from-spectrum-blue via-spectrum-purple to-spectrum-pink text-white font-medium py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 flex items-center space-x-3"
                disabled={isSearching}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-spectrum-blue/50 via-spectrum-purple/50 to-spectrum-pink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={searchAnimation ? { 
                    background: [
                      "linear-gradient(90deg, rgba(59, 130, 246, 0.5) 0%, rgba(139, 92, 246, 0.5) 50%, rgba(244, 63, 94, 0.5) 100%)",
                      "linear-gradient(90deg, rgba(244, 63, 94, 0.5) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(139, 92, 246, 0.5) 100%)",
                      "linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, rgba(244, 63, 94, 0.5) 50%, rgba(59, 130, 246, 0.5) 100%)"
                    ]
                  } : {}}
                  transition={searchAnimation ? { 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  } : {}}
                ></motion.span>
                {isSearching ? (
                  <>
                    <RefreshCcw size={18} className="animate-spin" />
                    <span>Searching Donors...</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Find Matching Donors</span>
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SearchForm;
