import { useEffect, useState } from 'react';

// import Question from '../Question';
import scribble from 'assets/scribble3.svg';
// import circle from ' assets/circle2.svg';
import Answer from '../Answer';
import './style.less';

const Questions = ({
  questionState: { number, question, answerA, answerB, answerC, answerD, answerCount, correct },
}) => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    console.log('sheck');
    const intID = setInterval(() => {
      console.log('hi');
      setTime(time - 1);

      if (time === 0) {
        console.log('clearing');
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
        <div className="ans-count">
          <span className="num-answers">{answerCount}/4 answers</span>
          <img src={scribble} alt="" />
        </div>
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
