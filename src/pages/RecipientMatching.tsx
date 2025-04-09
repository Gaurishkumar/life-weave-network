
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, MapPin, Droplet, Heart, ArrowRight } from "lucide-react";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  setShowConsentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

interface MatchResult {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  city: string;
  organ: string;
  matchPercentage: number;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organsList = ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Cornea"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];

const RecipientMatching = () => {
  const { setShowConsentModal } = useOutletContext<ContextType>();

  const [searchCriteria, setSearchCriteria] = useState({
    organ: "",
    bloodGroup: "",
    city: ""
  });

  const [searchResults, setSearchResults] = useState<MatchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchCriteria.organ || !searchCriteria.bloodGroup) {
      alert("Please select at least an organ and blood group");
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Mock API call for donor matching
    setTimeout(() => {
      // Generate fake results
      const mockResults: MatchResult[] = [];
      const resultCount = Math.floor(Math.random() * 5) + 1; // 1-5 results
      
      for (let i = 0; i < resultCount; i++) {
        mockResults.push({
          id: `donor-${Date.now()}-${i}`,
          name: `Donor ${i + 1}`,
          age: Math.floor(Math.random() * 40) + 20, // 20-60 years old
          bloodGroup: searchCriteria.bloodGroup,
          city: searchCriteria.city || cities[Math.floor(Math.random() * cities.length)],
          organ: searchCriteria.organ,
          matchPercentage: Math.floor(Math.random() * 30) + 70 // 70-100% match
        });
      }
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleRequestMatch = (donorId: string) => {
    setShowConsentModal(true);
  };

  return (
    <div className="relative py-20 px-6 overflow-hidden min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-spectrum-blue/5 to-spectrum-purple/5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-spectrum-pink/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center text-gradient">
            Find a Matching Donor
          </h1>
          <p className="section-subtitle text-center">
            Search our secure database to find compatible donors based on your medical needs.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card mt-10 p-8 shadow-xl backdrop-blur-xl bg-white/10 border border-white/20"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Organ Needed */}
              <div>
                <label htmlFor="organ" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Organ Needed
                </label>
                <select
                  id="organ"
                  name="organ"
                  value={searchCriteria.organ}
                  onChange={handleChange}
                  className="input-field focus:ring-spectrum-purple focus:border-spectrum-purple"
                >
                  <option value="">Select organ</option>
                  {organsList.map(organ => (
                    <option key={organ} value={organ}>{organ}</option>
                  ))}
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={searchCriteria.bloodGroup}
                  onChange={handleChange}
                  className="input-field focus:ring-spectrum-purple focus:border-spectrum-purple"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City (Optional)
                </label>
                <select
                  id="city"
                  name="city"
                  value={searchCriteria.city}
                  onChange={handleChange}
                  className="input-field focus:ring-spectrum-purple focus:border-spectrum-purple"
                >
                  <option value="">Any location</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-spectrum-blue to-spectrum-purple hover:from-spectrum-darkBlue hover:to-spectrum-darkPurple text-white font-medium py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 flex items-center space-x-3"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Find Match</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
        
        {/* Results Section */}
        <div className="mt-16">
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="relative w-20 h-20">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-spectrum-purple/30 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-t-4 border-spectrum-purple rounded-full animate-spin"></div>
                  <div className="absolute top-3 left-3 w-14 h-14 border-t-4 border-r-4 border-spectrum-blue rounded-full animate-spin animation-delay-200"></div>
                </div>
                <p className="mt-6 text-gray-600 dark:text-gray-300 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">Searching for compatible donors...</p>
              </motion.div>
            )}
            
            {!isSearching && hasSearched && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Search size={30} className="text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">No Matches Found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  We couldn't find any matching donors for your criteria. Try adjusting your search parameters.
                </p>
              </motion.div>
            )}
            
            {!isSearching && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-8 text-center text-gradient">
                  We Found {searchResults.length} Potential {searchResults.length === 1 ? "Match" : "Matches"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-xl bg-white/10 border border-white/20"
                    >
                      <div className="relative">
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-spectrum-purple to-spectrum-blue flex items-center justify-center mr-3 shadow-md">
                                <User size={22} className="text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{match.name}</h3>
                                <p className="text-sm text-gray-500">Age: {match.age}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full shadow-sm">
                                {match.matchPercentage}% Match
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center p-2 bg-spectrum-blue/10 rounded-lg">
                              <Droplet size={18} className="text-spectrum-blue mr-2" />
                              <span className="text-sm">{match.bloodGroup}</span>
                            </div>
                            <div className="flex items-center p-2 bg-spectrum-pink/10 rounded-lg">
                              <Heart size={18} className="text-spectrum-pink mr-2" />
                              <span className="text-sm">{match.organ}</span>
                            </div>
                            <div className="flex items-center p-2 bg-spectrum-purple/10 rounded-lg col-span-2">
                              <MapPin size={18} className="text-spectrum-purple mr-2" />
                              <span className="text-sm">{match.city}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRequestMatch(match.id)}
                            className="w-full py-3 bg-white/50 hover:bg-gradient-to-r hover:from-spectrum-purple hover:to-spectrum-blue hover:text-white rounded-md flex items-center justify-center space-x-2 transition-all duration-500 shadow-sm border border-white/20 group-hover:shadow-md"
                          >
                            <span>Request Match</span>
                            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-1" />
                          </button>
                        </div>
                        
                        {/* Match Percentage Indicator */}
                        <div 
                          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-green-400 to-green-500"
                          style={{ width: `${match.matchPercentage}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RecipientMatching;
