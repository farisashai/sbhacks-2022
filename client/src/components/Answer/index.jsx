import './style.less';

const Answer = ({ letter, answer, toggle, boxNum }) => {
  const boxes = [
    ['boxA.svg', 'boxAon.svg'],
    ['boxB.svg', 'boxBon.svg'],
    ['boxC.svg', 'boxCon.svg'],
    ['boxD.svg', 'boxDon.svg'],
  ];
  return (
    <div className="ans">
      <span>{letter}: </span> &nbsp;{answer}
      <img src={boxes[boxNum][toggle ? 1 : 0]} alt="" />
    </div>
  );
};

export default Answer;
