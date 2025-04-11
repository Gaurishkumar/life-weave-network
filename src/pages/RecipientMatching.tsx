
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, User, MapPin, Droplet, Heart, ArrowRight, 
  CheckCircle, AlertCircle, Sparkles, Zap, RefreshCcw
} from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
  compatibility: "high" | "medium" | "low";
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
  const [advancedFilters, setAdvancedFilters] = useState(false);
  const [showCompatibilityOnly, setShowCompatibilityOnly] = useState(false);

  const [searchAnimation, setSearchAnimation] = useState(false);

  // Trigger search animation
  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        setSearchAnimation(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchAnimation(false);
    }
  }, [isSearching]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchCriteria.organ || !searchCriteria.bloodGroup) {
      // Use toast notification instead of alert
      console.error("Please select at least an organ and blood group");
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
        const compatibility = ["high", "medium", "low"][Math.floor(Math.random() * 3)] as "high" | "medium" | "low";
        const matchPercentage = 
          compatibility === "high" ? Math.floor(Math.random() * 10) + 90 : 
          compatibility === "medium" ? Math.floor(Math.random() * 15) + 75 : 
          Math.floor(Math.random() * 15) + 60;

        mockResults.push({
          id: `donor-${Date.now()}-${i}`,
          name: `Donor ${i + 1}`,
          age: Math.floor(Math.random() * 40) + 20, // 20-60 years old
          bloodGroup: searchCriteria.bloodGroup,
          city: searchCriteria.city || cities[Math.floor(Math.random() * cities.length)],
          organ: searchCriteria.organ,
          matchPercentage,
          compatibility
        });
      }
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleRequestMatch = (donorId: string) => {
    setShowConsentModal(true);
  };

  // Filter results if compatibility filter is active
  const filteredResults = showCompatibilityOnly 
    ? searchResults.filter(match => match.compatibility === "high")
    : searchResults;

  // Determine color based on compatibility
  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case "high": return "from-emerald-400 to-emerald-500";
      case "medium": return "from-amber-400 to-amber-500";
      case "low": return "from-rose-400 to-rose-500";
      default: return "from-slate-400 to-slate-500";
    }
  };

  const getCompatibilityBadge = (compatibility: string) => {
    switch (compatibility) {
      case "high": return (
        <div className="flex items-center text-emerald-500 font-medium">
          <CheckCircle size={16} className="mr-1" />
          <span>High Compatibility</span>
        </div>
      );
      case "medium": return (
        <div className="flex items-center text-amber-500 font-medium">
          <AlertCircle size={16} className="mr-1" />
          <span>Medium Compatibility</span>
        </div>
      );
      case "low": return (
        <div className="flex items-center text-rose-500 font-medium">
          <AlertCircle size={16} className="mr-1" />
          <span>Low Compatibility</span>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-spectrum-blue/5 via-spectrum-purple/5 to-transparent pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-spectrum-pink/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-spectrum-blue/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse animation-delay-500"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 opacity-30 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full bg-white h-2 w-2"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1 
            className="section-title text-gradient flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <span>Find Your Perfect</span> 
            <motion.span 
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="absolute -top-8 -right-8 text-spectrum-blue/70" size={24} />
              <span className="relative">Donor Match</span>
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-spectrum-blue via-spectrum-purple to-spectrum-pink rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </motion.span>
          </motion.h1>
          <motion.p 
            className="section-subtitle max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our advanced algorithm searches through our secure donor database to find the most compatible matches based on your medical requirements.
          </motion.p>
        </motion.div>
        
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
        
        {/* Results Section */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            {isSearching && (
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
            )}
            
            {!isSearching && hasSearched && filteredResults.length === 0 && (
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
            )}
            
            {!isSearching && filteredResults.length > 0 && (
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
