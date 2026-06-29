import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Loading.module.css';
import LoadingTransition from '../../components/LoadingTransition/LoadingTransition.jsx';
import { S } from '../../strings.js';
import useGameStore from '../../store/gameStore.js';

export default function Loading() {
  const navigate = useNavigate();
  const teams = useGameStore((s) => s.teams);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
  const { setGamePhase } = useGameStore((s) => s.actions);

  const currentTeam = teams[currentTeamIndex];
  const prevTeamIndex = (currentTeamIndex - 1 + teams.length) % teams.length;
  const prevTeam = teams[prevTeamIndex];

  const handleAdvance = () => {
    setGamePhase('PRE_TURN');
    navigate('/pre-turn');
  };

  useEffect(() => {
    const t = setTimeout(handleAdvance, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.screen} onClick={handleAdvance}>
      <LoadingTransition
        topColor={prevTeam?.color || '#888'}
        bottomColor={currentTeam?.color || '#888'}
      />
      <div className={styles.teamName}>{currentTeam?.name}</div>
    </div>
  );
}
