import './style.less';
import CircleButton from 'components/Circle/CircleButton';
import PlayerIcons from 'components/PlayerIcons';
import Layout from 'containers/Layout';
import { useContext, useEffect, useState } from 'react';
import { listenGameCreated, listenGameUpdated, sendCreateGame } from 'utils/socketHandler';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'utils/AppContext';

const Lobby = () => {
  const { setGameID, questions } = useContext(AppContext);
  const [game, setGame] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    listenGameCreated((resp) => {
      setGame(resp);
      setGameID(resp.gameID);
    });

    listenGameUpdated((resp) => {
      setGame(resp);
    });

    sendCreateGame(questions);
  }, []);

  return (
    <Layout name={(game && game.players && `${game.players.length}/6 people`) || ''} joiningGame>
      <div className="lobby-container">
        {game && (
          <>
            <div className="lobby-left">
              <h1>Scan the QR code to join!</h1>
              <div className="players">
                {game.players.map((player, index) => (
                  <PlayerIcons key={player.playerID} position={index} username={player.name} image={player.photo} />
                ))}
                {[...Array(6 - game.players.length).keys()].map((val, index) => {
                  return <PlayerIcons key={val} position={game.players.length + index + 1} image="question-icon.svg" />;
                })}
              </div>
            </div>
            <div className="lobby-right">
              <QRCode size={300} className="qr" value={`${window.location.origin}/join?code=${game.gameID}`} />
              <h1>{game.gameID}</h1>
              <h2>Room Code</h2>
              <CircleButton text="Start" onclick={() => navigate('/play')} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Lobby;
