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

  const [questionState, setQuestionState] = useState();
  const [leaderboardState, setLeaderboardState] = useState();

  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);

  useEffect(() => {
    listenQuestionStarted((resp) => {
      setQuestionState(resp);
      setQuestionCount(questionCount + 1);
      setMode('question');
    });

    listenQuestionUpdated((resp) => {
      setAnswerCount(resp.answerCount);
    });

    listenQuestionEnded((resp) => {
      console.log('question ended', resp);
      setQuestionState(resp);
    });

    listenGameResults((resp) => {
      setLeaderboardState(resp);
      setMode('leaderboard');
    });

    sendStartGame(localStorage.getItem('gameID'));
  }, [listenQuestionStarted, setQuestionState, setQuestionCount, listenQuestionUpdated, setAnswerCount]);

  return (
    <Layout>
      {mode === 'question' && (
        <Questions
          number={questionCount}
          question={questionState.question}
          answerA={questionState.answerA}
          answerB={questionState.answerB}
          answerC={questionState.answerC}
          answerD={questionState.answerD}
          answerCount={answerCount}
          correct={questionState.correct}
        />
      )}
      {mode === 'leaderboard' && (
        <Leaderboard
          finished={leaderboardState.finish}
          answerCount={leaderboardState.answerCount}
          players={leaderboardState.players}
        />
      )}
    </Layout>
  );
};

export default Game;
