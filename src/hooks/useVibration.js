import { useCallback } from 'react';
import useGameStore from '../store/gameStore.js';

export function useVibration() {
  const vibrationEnabled = useGameStore((s) => s.settings.vibrationEnabled);
  const supported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const vibrate = useCallback(
    (pattern = 50) => {
      if (!vibrationEnabled || !supported) return;
      navigator.vibrate(pattern);
    },
    [vibrationEnabled, supported]
  );

  return { vibrate, supported };
}
