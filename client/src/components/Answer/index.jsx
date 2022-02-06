import './style.less';

const Answer = ({ letter, answer, toggle }) => {
  return (
    <div className="ans">
      <span>{letter}: </span> &nbsp;{answer}
    </div>
  );
};

export default Answer;
