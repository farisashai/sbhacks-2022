import React from 'react';
import './style.less'

const PlayerIcons = ({ username, image, position}) => {
  return(
    <div className="player">
        <img src={image} alt="icon"></img>
        {username && <p>{username}</p>}
        {!username && <p>#{position} open</p>}
    </div>
    )
}

export default PlayerIcons;