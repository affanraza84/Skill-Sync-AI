import { create } from "zustand";

interface CareerProfile {
  skills: string[];
  interests: string[];
  education: string;
  goals: string;
}

interface CareerState {
  profile: CareerProfile | null;
  analysisResult: any | null;
  isLoading: boolean;
  setProfile: (profile: CareerProfile) => void;
  setAnalysisResult: (result: any) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useCareerStore = create<CareerState>((set) => ({
  profile: null,
  analysisResult: null,
  isLoading: false,
  setProfile: (profile) => set({ profile }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
