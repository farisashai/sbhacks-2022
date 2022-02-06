import './style.less';
import Questions from 'components/Questions';
import Leaderboard from 'components/Leaderboard';
import Layout from 'containers/Layout';
import { useEffect, useState } from 'react';
import { listenQuestionStarted, listenQuestionUpdated } from 'utils/socketHandler';

const Game = () => {
  // { question, answerA, answerB, answerC, answerD }
  const [questionState, setQuestionState] = useState({
    question: "What's a koala?",
    answerA: 'AA',
    answerB: 'BB',
    answerC: 'CC',
    answerD: 'DD',
  });
  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);

  useEffect(() => {
    listenQuestionStarted((resp) => {
      setQuestionState(resp);
      setQuestionCount(questionCount + 1);
    });
    listenQuestionUpdated((resp) => {
      setAnswerCount(resp.answerCount);
    });
  }, [listenQuestionStarted, setQuestionState, setQuestionCount, listenQuestionUpdated, setAnswerCount]);

  return (
    <Layout>
      {/* <Questions
        number={questionCount}
        question={questionState.question}
        answerA={questionState.answerA}
        answerB={questionState.answerB}
        answerC={questionState.answerC}
        answerD={questionState.answerD}
        answerCount={answerCount}
      /> */}
      <Leaderboard />
    </Layout>
  );
};

export default Game;
