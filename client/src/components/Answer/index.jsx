import './style.less';

const Answer = ({ letter, answer, toggle, boxNum = 0 }) => {
  const boxes = [
    ['boxA.svg', 'boxAon.svg'],
    ['boxB.svg', 'boxBon.svg'],
    ['boxC.svg', 'boxCon.svg'],
    ['boxD.svg', 'boxDon.svg'],
  ];
  return (
    <div className="ans">
      <span>{letter}: </span> &nbsp;
      <h3 className="ans-words">{answer}</h3>
      <img src={boxes[boxNum][toggle ? 1 : 0]} alt="" />
    </div>
  );
};

export default Answer;
