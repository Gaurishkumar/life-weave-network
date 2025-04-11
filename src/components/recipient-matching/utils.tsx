
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { MatchResult } from "./types";

// Helper function to get compatibility color based on match level
export const getCompatibilityColor = (compatibility: string) => {
  switch (compatibility) {
    case "high": return "from-emerald-400 to-emerald-500";
    case "medium": return "from-amber-400 to-amber-500";
    case "low": return "from-rose-400 to-rose-500";
    default: return "from-slate-400 to-slate-500";
  }
};

// Helper function to get compatibility badge component
export const getCompatibilityBadge = (compatibility: string) => {
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

// Generate mock donor matches for testing
export const generateMockResults = (
  searchCriteria: { organ: string, bloodGroup: string, city: string },
  cities: string[]
): MatchResult[] => {
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
  
  return mockResults;
};
