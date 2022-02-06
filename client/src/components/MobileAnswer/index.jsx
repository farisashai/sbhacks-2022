import './style.less';

const MobileAnswer = ({ letter, answer, toggle, boxNum = 0 }) => {
  const boxes = [
    ['boxA.svg', 'boxAon.svg'],
    ['boxB.svg', 'boxBon.svg'],
    ['boxC.svg', 'boxCon.svg'],
    ['boxD.svg', 'boxDon.svg'],
  ];
  return (
    <div className="mobile-ans">
      <span>{letter}: </span> &nbsp;{answer}
      <img src={boxes[boxNum][toggle ? 1 : 0]} alt="" />
    </div>
  );
};

export default MobileAnswer;
