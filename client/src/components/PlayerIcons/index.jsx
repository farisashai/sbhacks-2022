import React from 'react';
import './style.less';
import crown from 'assets/crown.svg';

const PlayerIcons = ({ username, image = 'question-icon.svg', position, showPoints, points, winner = false }) => {
  return (
    <div className="player">
      {winner && <img src={crown} alt="crown" className="crown" />}
      <img src={image} alt="icon" />
      <div className="player-right">
        {username && <p className="name">{username}</p>}
        {!username && <p className="name">#{position} open</p>}
        {showPoints && <p className="points">{points} points</p>}
      </div>
    </div>
  );
};

export default PlayerIcons;
