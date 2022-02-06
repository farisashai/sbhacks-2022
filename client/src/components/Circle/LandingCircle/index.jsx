import CircleButton from 'components/Circle/CircleButton';
import './style.less';

function LandingCircle({ onclick }) {
  return (
    <div className="landing-circle">
      <h3>Upload, quiz, study</h3>
      <h1>Turn your notes into a game</h1>
      <CircleButton onclick={onclick} text="Create" />
    </div>
  );
}

export default LandingCircle;
