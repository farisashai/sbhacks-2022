import './style.less'
import pen from 'assets/pen.svg'
import scribble from 'assets/scribble.svg'

const Header = ({title, onClick}) => {
  return <div className="header">
    <div onClick className="header-left">
      <img src={pen} alt="pencil" />
      <h1>Quizlash</h1>
    </div>
    <div className="header-right">
      <button className="join-game" onClick={onClick}>
        { title }
      </button>
      <img src={scribble} alt="" />
    </div>
  </div>
};

export default Header;
