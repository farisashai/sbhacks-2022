import React from 'react';
import './style.less';

const PlayerIcons = ({ username, image, position, showPoints, points }) => {
  return (
    <div className="player">
      <img src={image} alt="icon" />
      {username && <p className="name">{username}</p>}
      {!username && <p className="name">#{position} open</p>}
      {showPoints && <p className="points">{points} points</p>}
    </div>
  );
};

export default PlayerIcons;
