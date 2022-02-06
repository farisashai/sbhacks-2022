import { useEffect, useState } from 'react';

import Layout from '../../containers/Layout';
import Question from '../Question';
import Answer from '../Answer';

import './style.less';

const Questions = ({ number, question, answerA, answerB, answerC, answerD, answerCount, correct }) => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    const intID = setInterval(() => {
      setTime(time - 1);

      if (time === 0) {
        window.clearInterval(intID);
      }
    }, 1000);
  }, [question]);

  return (
    <div className="question-container">
      <div className="question-div">
        <h1>Question {number}</h1>
        <h3>{question}</h3>
      </div>
      <div className="time-answer-div">
        <span className="timer">{time} sec</span>
        <span className="num-answers">{answerCount}/4 answers</span>
      </div>
      <div className="question-options">
        <Answer letter="A" answer={answerA} toggle={correct === 'A'} />
        <Answer letter="B" answer={answerB} toggle={correct === 'B'} />
        <Answer letter="C" answer={answerC} toggle={correct === 'C'} />
        <Answer letter="D" answer={answerD} toggle={correct === 'D'} />
      </div>
    </div>
  );
};

export default Questions;
