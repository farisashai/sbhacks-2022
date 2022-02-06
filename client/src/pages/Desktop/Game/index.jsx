import { useEffect, useState } from 'react';

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
  const [mode, setMode] = useState(); // question or leaderboard

  const [questionState, setQuestionState] = useState({ questionNumber: 0, questionTotal: 0 });
  const [leaderboardState, setLeaderboardState] = useState();

  useEffect(() => {
    listenQuestionStarted((resp) => {
      setQuestionState({ ...resp, answerCount: 0 });
      setMode('question');
    });

    listenQuestionUpdated((resp) => {
      setQuestionState({ ...questionState, answerCount: resp.answerCount });
    });

    listenQuestionEnded((resp) => {
      setQuestionState(resp);
    });

    listenGameResults((resp) => {
      setLeaderboardState(resp);
      setMode('leaderboard');
    });

    sendStartGame(localStorage.getItem('gameID'));
  }, [listenQuestionStarted, setQuestionState, listenQuestionUpdated]);

  return (
    <Layout name={`Question ${questionState.questionNumber}/${questionState.questionTotal}`} playingGame>
      {mode === 'question' && <Questions questionState={questionState} playerCount={questionState.playerCount} />}
      {mode === 'leaderboard' && (
        <Leaderboard finished={leaderboardState.finished} players={leaderboardState.players} />
      )}
    </Layout>
  );
};

export default Game;

// Question {questinoState.number}/{questionState.totle}
