import { useColorScheme } from 'react-native';
import { create } from 'zustand';
import Colors from '../constants/Colors';

interface ThemeState {
  isDark: boolean | null;
  setIsDark: (isDark: boolean) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  isDark: null,
  setIsDark: (isDark) => set({ isDark }),
}));

export function useTheme() {
  const systemColorScheme = useColorScheme();
  const { isDark, setIsDark } = useThemeStore();
  
  // Use system theme if user hasn't set a preference
  const effectiveIsDark = isDark === null ? systemColorScheme === 'dark' : isDark;
  const theme = effectiveIsDark ? Colors.dark : Colors.light;
  
  return {
    theme,
    isDark: effectiveIsDark,
    setTheme: setIsDark,
  };
}