import './style.less'
import Header from 'components/Header'
import CircleButton from 'components/Circle/CircleButton'
import PlayerIcons from 'components/PlayerIcons'
import Layout from 'containers/Layout'
import { useEffect, useState } from 'react'
import { listenGameCreated, sendCreateGame } from 'utils/socketHandler'
import yelp from 'assets/yelp-qr.svg'
function Lobby() {
  const [code, setCode] = useState('');

  useEffect(() => {
    listenGameCreated((resp) => {
      console.log(resp);

      setCode(resp.code);
    });

    sendCreateGame();
  })

  return (
    <Layout>
      <div className="lobby-container">
        <div className="lobby-left"></div>
        <div className="lobby-right">
          <img src={yelp} alt="" />
          <h1>M30A</h1>
          <h2>Room Code</h2>
          <CircleButton />
        </div>
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
