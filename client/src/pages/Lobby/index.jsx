import './style.less'
import CircleButton from 'components/Circle/CircleButton'
import PlayerIcons from 'components/PlayerIcons'
import Layout from 'containers/Layout'
import { useEffect, useState } from 'react'
import { listenGameCreated, listenGameUpdated,sendCreateGame } from 'utils/socketHandler'
import yelp from 'assets/yelp-qr.svg'
import QRCode from 'qrcode.react'

function Lobby() {
  const [game, setGame] = useState();

  useEffect(() => {
    listenGameCreated((resp) => {
      console.log(resp);

      setGame(resp);
    });

    sendCreateGame();
  }, [])

  useEffect(() => {
    listenGameUpdated((game) => {
      setGame(game)
      console.log(game);
    })
  }, [])


  return (
    <Layout game={game}>
      <div className="lobby-container">
        {game && 
        (<>
            <div className="lobby-left">
              <h1>Scan the QR code to join!</h1>
              <div className="players">
                {game.players.map((player, index) => (
                  <PlayerIcons 
                  key={player.playerID} 
                  position={index} 
                  username={player.name} 
                  image={player.photo} 
                  />
                ))}
                {Array.apply(null, Array(6 - game.players.length)).map((_, index) => {
                  return <PlayerIcons position={game.players.length + index + 1} image={'question-icon.svg'}/>
                })}
              </div>
            </div>
            <div className="lobby-right">
              {/* <img className='qr' src={yelp} alt="" /> */}
              <QRCode className='qr' value={`http://localhost:3000/play/${game.gameID}`} />

              <h1>{game.gameID}</h1>
              <h2>Room Code</h2>
              <CircleButton text="Start" onclick={() => {}}/>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Lobby
