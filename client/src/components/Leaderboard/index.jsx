import './style.less';
import CircleButton from 'components/Circle/CircleButton';
import PlayerIcons from 'components/PlayerIcons';
import Layout from 'containers/Layout';
import { useEffect, useState } from 'react';
import { listenGameCreated, listenGameUpdated, sendCreateGame } from 'utils/socketHandler';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import trophies from '../../assets/trophies.svg';

function Leaderboard() {
  const [game, setGame] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    listenGameCreated((resp) => {
      console.log(resp);

      setGame(resp);
    });

    sendCreateGame();
  }, []);

  useEffect(() => {
    listenGameUpdated((game) => {
      setGame(game);
      console.log(game);
    });
  }, []);

  return (
      <div className="lobby-container">
          <>
            <div className="leaderboard-left">
              <h1>Leaderboard</h1>
              <div className="players">
                {game.players.map((player, index) => (
                  <PlayerIcons key={player.playerID} position={index} username={player.name} image={player.photo} showPoints points={player.points}/>
                ))}
                {Array.apply(null, Array(6 - game.players.length)).map((_, index) => {
                  return <PlayerIcons position={game.players.length + index + 1} image="question-icon.svg" />;
                })}
              </div>
            </div>
            <div className="lobby-right">
              <img src={trophies} alt="trophies">
            </div>
          </>
        </div>
}

export default Leaderboard;
