
export interface MatchResult {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  city: string;
  organ: string;
  matchPercentage: number;
  compatibility: "high" | "medium" | "low";
}

export interface SearchCriteria {
  organ: string;
  bloodGroup: string;
  city: string;
}
