import './style.less';
import Header from 'components/Header';
import CircleButton from 'components/Circle/CircleButton';
import PlayerIcons from 'components/PlayerIcons';

function Lobby() {
  return (
    <div className="StartingPage">
      <Header title="4/6 Players" onClick={() => {console.log('fish');}}/>
      <h1>Scan the QR code to join!</h1>
      {/* 6 icons */}
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
    </div>
  );
}

export default Lobby;
