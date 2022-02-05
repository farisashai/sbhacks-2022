import React from 'react';
import questionIcon from '../../../assets/question-icon.svg'
import './style.less'

const PlayerIcons = ({name, onclick}) => {
  return (
    <div className="button">
        <img src={questionIcon} alt="arrow"></img>
        <p>{name}</p>
    </div>
    )
};

export default PlayerIcons;