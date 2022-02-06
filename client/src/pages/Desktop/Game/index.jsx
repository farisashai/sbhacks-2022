import { useContext, useEffect, useState } from 'react';

import { AppContext } from 'utils/AppContext';
import {
  listenGameResults,
  listenQuestionEnded,
  listenQuestionStarted,
  listenQuestionUpdated,
  sendStartGame,
} from 'utils/socketHandler';

import Questions from 'components/Questions';
import Leaderboard from 'components/Leaderboard';
import Layout from 'containers/Layout';

import './style.less';

const Game = () => {
  const { gameID } = useContext(AppContext);
  const [mode, setMode] = useState(); // question or leaderboard

  const [questionState, setQuestionState] = useState({ questionNumber: 0, questionTotal: 0 });
  const [leaderboardState, setLeaderboardState] = useState();

  useEffect(() => {
    listenQuestionStarted((resp) => {
      setQuestionState({ ...resp, answerCount: 0 });
      setMode('question');
    });

    listenQuestionUpdated((resp) => {
      setQuestionState((prevState) => ({ ...prevState, answerCount: resp.answerCount }));
    });

    listenQuestionEnded((resp) => {
      setQuestionState((prevState) => ({ answerCount: prevState.answerCount, ...resp }));
    });

    listenGameResults((resp) => {
      setLeaderboardState(resp);
      setMode('leaderboard');
    });

    sendStartGame(gameID);
  }, [listenQuestionStarted, setQuestionState, listenQuestionUpdated]);

  return (
    <Layout name={`Question ${questionState.questionNumber}/${questionState.questionTotal}`} playingGame>
      {mode === 'question' && <Questions questionState={questionState} />}
      {mode === 'leaderboard' && (
        <Leaderboard finished={leaderboardState.finished} players={leaderboardState.players} />
      )}
    </Layout>
  );
};

export default Game;
