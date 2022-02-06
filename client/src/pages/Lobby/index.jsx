import './style.less'
import CircleButton from 'components/Circle/CircleButton'
import PlayerIcons from 'components/PlayerIcons'
import Layout from 'containers/Layout'
import { useEffect, useState } from 'react'
import { listenGameCreated, listenGameUpdated,sendCreateGame } from 'utils/socketHandler'
import yelp from 'assets/yelp-qr.svg'
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
                {(() => {
                    return Array.apply(null, Array(6 - game.players.length)).map((_, index) => {
                      console.log("hi");
                    return <PlayerIcons position={game.players.length + index + 1} image={'question-icon.svg'}/>
                    })
                  })()
                }
                {/* <PlayerIcons username="Nishant" position={1} image="icon-1.svg" /> */}
                {/* <PlayerIcons index={1} name="Faris" />
                <PlayerIcons index={2} name="Faris" />
                <PlayerIcons index={3} name="Faris" />
                <PlayerIcons index={4} name="Faris" />
                <PlayerIcons index={5} /> */}
              </div>
            </div>
            <div className="lobby-right">
              <img src={yelp} alt="" />
              <h1>{game.gameID}</h1>
              <h2>Room Code</h2>
              <CircleButton text="Start" onclick={() => {}}/>
            </div>
          </>
        )}
      </div>
      {/* <div className="StartingPage">
        <h1>Scan the QR code to join!</h1>
        <div className="players">
          <PlayerIcons name="open" />
          <PlayerIcons name="open" />
          <PlayerIcons name="open" />
          <PlayerIcons name="open" />
          <PlayerIcons name="open" />
          <PlayerIcons name="open" />
        </div>
        <div className="qr-div">
          <img alt="qr code" />
          <h1>ABCD</h1>
          <h3>Room Code</h3>
          <CircleButton text="Start" />
        </div>
      </div> */}
    </Layout>
  )
}

export default Lobby
