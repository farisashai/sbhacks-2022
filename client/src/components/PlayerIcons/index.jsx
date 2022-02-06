import React from 'react';
// import questionIcon from 'assets/question-icon.svg'
// import icon1 from 'assets/icon-1.svg'
// import icon2 from 'assets/icon-2.svg'
// import icon3 from 'assets/icon-3.svg'
// import icon4 from 'assets/icon-4.svg'
// import icon5 from 'assets/icon-5.svg'
// import icon6 from 'assets/icon-6.svg'
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

// ({index, name}) => {
//   const icons = [
//     questionIcon, icon1, icon2, icon3, icon4, icon5, icon6
//   ]
// };

export default PlayerIcons;