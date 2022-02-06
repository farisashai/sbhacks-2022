import './style.less';

function Answer(letter, answer, fileName) {
  return (
    <div className="answer-div">
      <h1 background={fileName}>{letter}:</h1>
      <h3>{answer}</h3>
    </div>
  );
}

export default Answer;
