import './style.less';
import PlayerIcons from 'components/PlayerIcons';
import CircleButton from 'components/Circle/CircleButton';
import trophies from '../../assets/trophies.svg';

const Leaderboard = ({ finished, answerCount, players }) => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-left">
        {finished && <h1>Final Leaderboard</h1>}
        {!finished && <h1>Leaderboard</h1>}

        <div className="players">
          {/* <PlayerIcons position={1} username="Shirley" image="icon-1.svg" showPoints points={12000} />
          <PlayerIcons position={2} username="aohsdashdoasdho" image="icon-1.svg" showPoints points={6000} />
          <PlayerIcons position={3} username="a" image="icon-1.svg" showPoints points={5000} />
          <PlayerIcons position={4} username="Eric" image="icon-1.svg" showPoints points={200} />
          <PlayerIcons position={5} username="Stanley" image="icon-1.svg" showPoints points={5} />
          <PlayerIcons position={6} /> */}
          {players.map((player, index) => (
            <PlayerIcons
              key={player.playerID}
              position={index}
              username={player.name}
              image={player.photo}
              points={player.points}
              showPoints
            />
          ))}
          {[...Array(6 - players.length)].map((_, index) => {
            return <PlayerIcons position={players.length + index + 1} image="question-icon.svg" />;
          })}
        </div>
      </div>
      <div className="leaderboard-right">
        <img src={trophies} alt="trophies" />
        {!finished && <CircleButton text="New Game" />}
      </div>
    </div>
  );
};

export default Leaderboard;
