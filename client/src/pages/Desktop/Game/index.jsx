import './style.less';
import Questions from 'components/Questions';
// import Leaderboard from 'components/Leaderboard';
import Layout from 'containers/Layout';

const Game = () => {
  return (
    <Layout>
      <Questions />
      {/* <Leaderboard /> */}
    </Layout>
  );
};

export default Game;
