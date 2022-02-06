import './style.less'
import React, { useState } from 'react'

import MobileLayout from 'containers/MobileLayout'

import MobileHeader from 'components/MobileHeader'
import CircleButton from 'components/Circle/CircleButton'

const Join = (props) => {
  const [gameState, setGameState] = useState('signup')

  switch (gameState) {
    case 'signup':
      return (
        <MobileLayout>
          {/* <MobileHeader
            header="You’re in!"
            body="Hold tight while players join..."
          /> */}
          <label htmlFor="">Room Code</label>
          <input type="text" placeholder="ENTER 4 LETTER GAME CODE" />
          <label htmlFor="">Name</label>
          <input type="text" placeholder="ENTER YOUR NAME" />
          <CircleButton text="Start" onclick={() => {}}/>
        </MobileLayout>
      )
    case 'joined':
      return (
        <MobileLayout>
          <MobileHeader
            header="You’re in!"
            body="Hold tight while players join..."
          />
        </MobileLayout>
      )
    case 'question':
      return (
        <MobileLayout>
          <MobileHeader header="Question 1" body="" />
        </MobileLayout>
      )
    case 'submitted':
      return (
        <MobileLayout>
          <MobileHeader
            header="Hold on..."
            body="Results are loading on screen"
          />
        </MobileLayout>
      )
    case 'finished':
      return (
        <MobileLayout>
          <MobileHeader
            header="Game Over"
            body="Look up to see what place you got!"
          />
          <CircleButton text="Leave" onClick={() => setGameState('signup')} />
        </MobileLayout>
      )
    default:
      return (
        <MobileLayout>
          <MobileHeader
            header="How did you get here?"
            body="An error has occured!"
          />
        </MobileLayout>
      )
  }
}

export default Join
