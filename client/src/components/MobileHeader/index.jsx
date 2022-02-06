import './style.less';

function MobileHeader({ header, body }) {
  return (
    <div className="MobileHeader">
      <h1>{header}</h1>
      <h2>{body}</h2>
    </div>
  );
}

export default MobileHeader;
