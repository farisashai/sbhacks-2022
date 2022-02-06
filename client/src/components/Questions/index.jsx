import { useEffect, useState } from 'react';
import './style.less';
import Layout from '../../containers/Layout';
import Question from '../Question';
import Answer from '../Answer';
import { listenQuestionUpdated } from '../../utils/socketHandler';

const Questions = ({ number, question, answerList }) => {
  const [numAnswered, setNumAnswered] = useState();

  useEffect(() => {
    listenQuestionUpdated(() => {
      setNumAnswered(numAnswered + 1);
    });
  }, [setNumAnswered, listenQuestionUpdated]);

  return (
    <Layout>
      <div className="questions-container">
        {
          <>
            <Question number={number} question={question} />
            <div className="time-answer-div">
              {/* timer */}
              <h1>32 seconds</h1>
              {/* number answered */}
              <h3>{numAnswered} answers</h3>
            </div>
            <div className="answers">
              <Answer letter="A" answer={answerList[0]} fileName="boxA.svg" />
              <Answer letter="B" answer={answerList[1]} fileName="boxB.svg" />
              <Answer letter="C" answer={answerList[2]} fileName="boxC.svg" />
              <Answer letter="D" answer={answerList[3]} fileName="boxD.svg" />
            </div>
          </>
        }
      </div>
    </Layout>
  );
};

export default Questions;
