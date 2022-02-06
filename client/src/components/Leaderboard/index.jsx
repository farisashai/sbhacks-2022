import './style.less';
import PlayerIcons from 'components/PlayerIcons';
import trophies from '../../assets/trophies.svg';

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-left">
        <h1>Leaderboard</h1>
        <div className="players">
          <PlayerIcons position={1} username="Shriley" image="icon-1.svg" showPoints />
          <PlayerIcons position={2} username="Faris" image="icon-1.svg" showPoints />
          <PlayerIcons position={3} username="Chris" image="icon-1.svg" showPoints />
          <PlayerIcons position={4} username="Eric" image="icon-1.svg" showPoints />
          <PlayerIcons position={5} username="Stanley" image="icon-1.svg" showPoints />
          <PlayerIcons position={6} username="Steven" image="icon-1.svg" showPoints />
          {/* {game.players.map((player, index) => (
                  <PlayerIcons key={player.playerID} position={index} username={player.name} image={player.photo} showPoints points={player.points}/>
                ))}
                {Array.apply(null, Array(6 - game.players.length)).map((_, index) => {
                  return <PlayerIcons position={game.players.length + index + 1} image="question-icon.svg" />;
                })} */}
        </div>
      </div>
      <div className="leaderboard-right">
        <img src={trophies} alt="trophies" />
      </div>
    </div>
  );
};

export default Leaderboard;
