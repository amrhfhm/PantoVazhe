import { create } from 'zustand';
import { baseCards } from '../data/baseCards.js';
import { TEAM_COLORS } from '../data/teamColors.js';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const defaultSettings = {
  soundEnabled: true,
  vibrationEnabled: true,
  showRuleTooltips: true,
  timerDuration: 60,
  cardCount: 40,
  allowSkips: true,
  deckType: 'base',
};

const defaultActiveTurn = {
  startTime: null,
  cardsPlayed: [],
  pointsEarned: 0,
};

const useGameStore = create((set, get) => ({
  theme: 'violet',
  settings: { ...defaultSettings },
  teams: [
    { id: 't1', name: 'تیم یک', color: TEAM_COLORS[0].hex, score: 0 },
    { id: 't2', name: 'تیم دو', color: TEAM_COLORS[1].hex, score: 0 },
  ],
  deck: [],
  remainingDeck: [],
  currentRound: 1,
  currentTeamIndex: 0,
  gamePhase: 'IDLE',
  activeTurn: { ...defaultActiveTurn },

  actions: {
    setTheme: (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      set({ theme });
    },

    updateSettings: (partial) =>
      set((state) => ({ settings: { ...state.settings, ...partial } })),

    setTeams: (teams) => set({ teams }),

    addTeam: () =>
      set((state) => {
        if (state.teams.length >= 6) return state;
        const usedColors = state.teams.map((t) => t.color);
        const nextColor = TEAM_COLORS.find((c) => !usedColors.includes(c.hex)) || TEAM_COLORS[0];
        const id = `t${Date.now()}`;
        return {
          teams: [
            ...state.teams,
            { id, name: `تیم ${state.teams.length + 1}`, color: nextColor.hex, score: 0 },
          ],
        };
      }),

    removeTeam: (id) =>
      set((state) => ({
        teams: state.teams.filter((t) => t.id !== id),
      })),

    updateTeam: (id, partial) =>
      set((state) => ({
        teams: state.teams.map((t) => (t.id === id ? { ...t, ...partial } : t)),
      })),

    startGame: (deck) => {
      const { settings } = get();
      const sliced = deck.slice(0, settings.cardCount);
      const shuffled = shuffleArray(sliced);
      set({
        deck: shuffled,
        remainingDeck: shuffled,
        currentRound: 1,
        currentTeamIndex: 0,
        gamePhase: 'ROUND_INTRO',
        activeTurn: { ...defaultActiveTurn },
      });
      // Reset scores
      set((state) => ({
        teams: state.teams.map((t) => ({ ...t, score: 0 })),
      }));
    },

    startTurn: () => {
      set({
        gamePhase: 'ACTIVE_TURN',
        activeTurn: { startTime: Date.now(), cardsPlayed: [], pointsEarned: 0 },
      });
    },

    markCard: (card, result) => {
      set((state) => {
        const cardsPlayed = [...state.activeTurn.cardsPlayed, { card, result }];
        const pointsEarned = cardsPlayed
          .filter((c) => c.result === 'correct')
          .reduce((sum, c) => sum + (c.card.points || 1), 0);

        let remainingDeck = state.remainingDeck.filter((c) => c.id !== card.id);
        if (result === 'skipped') {
          remainingDeck = [...remainingDeck, card];
        }

        return {
          remainingDeck,
          activeTurn: { ...state.activeTurn, cardsPlayed, pointsEarned },
        };
      });
    },

    toggleCardResult: (cardId) => {
      set((state) => {
        const cardsPlayed = state.activeTurn.cardsPlayed.map((cp) => {
          if (cp.card.id !== cardId) return cp;
          const newResult = cp.result === 'correct' ? 'skipped' : 'correct';
          return { ...cp, result: newResult };
        });
        const pointsEarned = cardsPlayed
          .filter((c) => c.result === 'correct')
          .reduce((sum, c) => sum + (c.card.points || 1), 0);
        return { activeTurn: { ...state.activeTurn, cardsPlayed, pointsEarned } };
      });
    },

    commitTurn: () => {
      const { activeTurn, teams, currentTeamIndex } = get();
      const newTeams = teams.map((t, i) =>
        i === currentTeamIndex ? { ...t, score: t.score + activeTurn.pointsEarned } : t
      );
      set({ teams: newTeams, gamePhase: 'TURN_SUMMARY' });
    },

    nextTeam: () => {
      const { teams, currentTeamIndex, remainingDeck, currentRound } = get();
      const nextTeamIndex = (currentTeamIndex + 1) % teams.length;

      if (remainingDeck.length === 0) {
        if (currentRound < 3) {
          const { deck } = get();
          set({
            currentRound: currentRound + 1,
            currentTeamIndex: nextTeamIndex,
            remainingDeck: shuffleArray(deck),
            gamePhase: 'ROUND_SCOREBOARD',
            activeTurn: { ...defaultActiveTurn },
          });
        } else {
          set({ gamePhase: 'GAME_OVER', currentTeamIndex: nextTeamIndex });
        }
      } else {
        set({
          currentTeamIndex: nextTeamIndex,
          gamePhase: 'LOADING_TRANSITION',
          activeTurn: { ...defaultActiveTurn },
        });
      }
    },

    nextRound: () => {
      const { currentRound, deck } = get();
      if (currentRound < 3) {
        set({
          currentRound: currentRound + 1,
          remainingDeck: shuffleArray(deck),
          gamePhase: 'ROUND_INTRO',
          activeTurn: { ...defaultActiveTurn },
        });
      } else {
        set({ gamePhase: 'GAME_OVER' });
      }
    },

    pauseGame: () => set({ gamePhase: 'PAUSED' }),

    resumeGame: () => set({ gamePhase: 'ACTIVE_TURN' }),

    endGame: () => set({ gamePhase: 'GAME_OVER' }),

    resetGame: () =>
      set({
        deck: [],
        remainingDeck: [],
        currentRound: 1,
        currentTeamIndex: 0,
        gamePhase: 'IDLE',
        activeTurn: { ...defaultActiveTurn },
        teams: [
          { id: 't1', name: 'تیم یک', color: TEAM_COLORS[0].hex, score: 0 },
          { id: 't2', name: 'تیم دو', color: TEAM_COLORS[1].hex, score: 0 },
        ],
      }),

    setGamePhase: (phase) => set({ gamePhase: phase }),
  },
}));

export default useGameStore;
