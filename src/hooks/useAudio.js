import { useRef, useCallback } from 'react';
import useGameStore from '../store/gameStore.js';

export function useAudio() {
  const soundEnabled = useGameStore((s) => s.settings.soundEnabled);
  const soundsRef = useRef({});

  const play = useCallback(
    (name) => {
      if (!soundEnabled) return;
      // Audio files are placeholders; gracefully ignore errors
      try {
        if (!soundsRef.current[name]) {
          // Lazy-load with howler if available
          return;
        }
        soundsRef.current[name].play();
      } catch (e) {
        // ignore
      }
    },
    [soundEnabled]
  );

  const stop = useCallback((name) => {
    try {
      if (soundsRef.current[name]) soundsRef.current[name].stop();
    } catch (e) {
      // ignore
    }
  }, []);

  return { play, stop };
}
