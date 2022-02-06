import './style.less';
import PlayerIcons from 'components/PlayerIcons';
import CircleButton from 'components/Circle/CircleButton';
import trophies from 'assets/trophies.svg';
import { useNavigate } from 'react-router-dom';

const Leaderboard = ({ finished, players }) => {
  const navigate = useNavigate();
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-left">
        {finished && <h1>Final Leaderboard</h1>}
        {!finished && <h1>Leaderboard</h1>}

        <div className="players">
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <PlayerIcons
                key={player.playerID}
                position={index}
                username={player.name}
                image={player.photo}
                points={player.score}
                showPoints
                winner={index === 0}
              />
            ))}
        </div>
      </div>
      <div className="leaderboard-right">
        <img className="trophies" src={trophies} alt="trophies" />
        {finished && <CircleButton text="New Game" onclick={() => navigate('/')} />}
      </div>
    </div>
  );
};

export default Leaderboard;
