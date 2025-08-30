import { createContext, useContext, useEffect } from 'react';

type Theme = 'dark'; // Only allow 'dark'

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void; // Keep signature for compatibility
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always apply 'dark' class to the document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
  }, []);

  const value = {
    theme: 'dark' as const, // Theme is always 'dark'
    setTheme: () => {}, // setTheme does nothing
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}