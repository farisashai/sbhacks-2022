import './style.less';

const Answer = ({ letter, answer, toggle }) => {
  const boxes = {
    one: ['boxA.svg', 'boxAon.svg'],
    two: ['boxB.svg', 'boxBon.svg'],
    three: ['boxC.svg', 'boxCon.svg'],
    four: ['boxD.svg', 'boxDon.svg'],
  };
  return (
    <div className={`ans ${toggle ? 'correct' : ''}`}>
      <span>{letter}: </span> &nbsp;{answer}
    </div>
  );
};

export default Answer;
