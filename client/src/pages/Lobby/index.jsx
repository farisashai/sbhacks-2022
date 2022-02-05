import './style.less'
import Header from 'components/Header'
import CircleButton from 'components/Circle/CircleButton'
import PlayerIcons from 'components/PlayerIcons'
import Layout from 'containers/Layout'

function Lobby() {
  return (
    <Layout>
      <div className="lobby-container">
        <div className="lobby-left"></div>
        <div className="lobby-right"></div>
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
