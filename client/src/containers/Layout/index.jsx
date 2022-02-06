import Header from 'components/Header';
import './style.less';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, name, playingGame = false, joiningGame = false }) => {
  const navigate = useNavigate();
  return (
    <div className="background">
      {(playingGame || joiningGame) && <Header title={name} />}
      {!playingGame && !joiningGame && <Header title="Join Game" onClick={() => navigate('/join')} />}
      {children}
    </div>
  );
};

export default Layout;
