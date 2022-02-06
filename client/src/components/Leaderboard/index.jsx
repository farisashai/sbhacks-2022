import './style.less';
import PlayerIcons from 'components/PlayerIcons';
import trophies from '../../assets/trophies.svg';

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-left">
        <h1>Leaderboard</h1>

        <div className="players">
          <PlayerIcons position={1} username="Shirley" image="icon-1.svg" showPoints />
          <PlayerIcons position={2} username="Faris" image="icon-1.svg" showPoints />
          <PlayerIcons position={3} username="Chris" image="icon-1.svg" showPoints />
          <PlayerIcons position={4} username="Eric" image="icon-1.svg" showPoints />
          <PlayerIcons position={5} username="Stanley" image="icon-1.svg" showPoints />
          <PlayerIcons position={6} username="Steven" image="icon-1.svg" showPoints />
        </div>
      </div>
      <div className="leaderboard-right">
        <img src={trophies} alt="trophies" />
      </div>
    </div>
  );
};

export default Leaderboard;
