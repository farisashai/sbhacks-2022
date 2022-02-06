import React from 'react';
import './style.less';

function PlayerIcons({ username, image, position }) {
  return (
    <div className="player">
      <img src={image} alt="icon" />
      {username && <p>{username}</p>}
      {!username && <p>#{position} open</p>}
    </div>
  );
}

export default PlayerIcons;
