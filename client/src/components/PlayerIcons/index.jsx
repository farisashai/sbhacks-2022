import React from 'react';
import questionIcon from 'assets/question-icon.svg'
import icon1 from 'assets/icon-1.svg'
import icon2 from 'assets/icon-2.svg'
import icon3 from 'assets/icon-3.svg'
import icon4 from 'assets/icon-4.svg'
import icon5 from 'assets/icon-5.svg'
import icon6 from 'assets/icon-6.svg'
import './style.less'

const PlayerIcons = ({index = -1, name = 'icon2', onclick}) => {
  const icons = [
    questionIcon,
    icon1, icon2, icon3, icon4, icon5, icon6
  ]
  //   'questionIcon': questionIcon,
  //   'icon1': icon1,
  //   'icon2': icon2,
  //   'icon3': icon3,
  //   'icon4': icon4,
  //   'icon5': icon5,
  //   'icon6': icon6
  // }
  return (
    <div className="player">
        <img src={icons[index + 1]} alt="icon"></img>
        {name && <p>{name}</p>}
        {!name && <p>#{index} open</p>}
    </div>
    )
};

export default PlayerIcons;