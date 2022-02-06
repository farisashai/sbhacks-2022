import './style.less';
import PlayerIcons from 'components/PlayerIcons';
import CircleButton from 'components/Circle/CircleButton';
import trophies from '../../assets/trophies.svg';

const Leaderboard = ({ finished, players }) => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-left">
        {finished && <h1>Final Leaderboard</h1>}
        {!finished && <h1>Leaderboard</h1>}

        <div className="players">
          {players.map((player, index) => (
            <PlayerIcons
              key={player.playerID}
              position={index}
              username={player.name}
              image={player.photo}
              points={player.score}
              showPoints
            />
          ))}
        </div>
      </div>
      <div className="leaderboard-right">
        <img src={trophies} alt="trophies" />
        {finished && <CircleButton text="New Game" />}
      </div>
    </div>
  );
};

export default Leaderboard;
