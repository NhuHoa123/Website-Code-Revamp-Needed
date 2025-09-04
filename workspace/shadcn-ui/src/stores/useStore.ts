import { create } from 'zustand';

interface AppStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  currentTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppStore>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  currentTheme: 'light',
  setTheme: (theme) => set({ currentTheme: theme }),
}));