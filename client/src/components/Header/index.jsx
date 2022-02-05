import './style.less'
import pen from '../../assets/pen.svg'
import scribble from '../../assets/scribble.svg'

const Header = () => {
  return <div className="header">
    <div className="header-left">
      <img src={pen} alt="pencil" />
      <h1>Quizlash</h1>
    </div>
    <div className="header-right">
      <button className="join-game">
        4/6 Players
      </button>
      <img src={scribble} alt="" />
    </div>
  </div>
};

export default Header;
