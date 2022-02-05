import React from 'react';
import arrow from '../../../assets/arrow.svg'
import './style.less'

const CircleButton = ({text, onclick}) => {
  return (
    <div className="button">
        <button onClick={onclick}>{text}</button>
        <img src={arrow} alt="arrow"></img>
    </div>
    )
};

export default CircleButton;
