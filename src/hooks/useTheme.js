import { useCallback } from 'react';
import useGameStore from '../store/gameStore.js';

export function useTheme() {
  const theme = useGameStore((s) => s.theme);
  const setTheme = useGameStore((s) => s.actions.setTheme);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'violet' ? 'coral' : 'violet');
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
