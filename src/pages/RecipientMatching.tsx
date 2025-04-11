
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";

// Types
import { MatchResult, SearchCriteria } from "@/components/recipient-matching/types";

// Components
import AnimatedBackground from "@/components/recipient-matching/AnimatedBackground";
import PageHeader from "@/components/recipient-matching/PageHeader";
import SearchForm from "@/components/recipient-matching/SearchForm";
import SearchingState from "@/components/recipient-matching/SearchingState";
import NoResultsState from "@/components/recipient-matching/NoResultsState";
import ResultsList from "@/components/recipient-matching/ResultsList";

// Utils
import { generateMockResults } from "@/components/recipient-matching/utils";

type ContextType = {
  setShowConsentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const organsList = ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Cornea"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];

const RecipientMatching = () => {
  const { setShowConsentModal } = useOutletContext<ContextType>();

  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
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
      // Generate fake results using our utility function
      const mockResults = generateMockResults(searchCriteria, cities);
      
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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <div className="max-w-6xl mx-auto relative z-10 py-20 px-6">
        <PageHeader />
        
        <SearchForm 
          searchCriteria={searchCriteria}
          handleChange={handleChange}
          handleSearch={handleSearch}
          isSearching={isSearching}
          bloodGroups={bloodGroups}
          organsList={organsList}
          cities={cities}
          advancedFilters={advancedFilters}
          setAdvancedFilters={setAdvancedFilters}
          showCompatibilityOnly={showCompatibilityOnly}
          setShowCompatibilityOnly={setShowCompatibilityOnly}
          searchAnimation={searchAnimation}
        />
        
        {/* Results Section */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            {isSearching && <SearchingState />}
            
            {!isSearching && hasSearched && filteredResults.length === 0 && <NoResultsState />}
            
            {!isSearching && filteredResults.length > 0 && (
              <ResultsList 
                filteredResults={filteredResults}
                handleRequestMatch={handleRequestMatch}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RecipientMatching;
