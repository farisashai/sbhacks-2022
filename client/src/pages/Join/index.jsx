import './style.less'
import { useState, useEffect } from 'react'

import MobileLayout from 'containers/MobileLayout'

import MobileHeader from 'components/MobileHeader'
import CircleButton from 'components/Circle/CircleButton'
import {
  sendJoinGame,
  listenFailedJoin,
  listenSucceededJoin,
  listenQuestionStarted,
} from 'utils/socketHandler'
import { notification } from 'antd'
import { useSearchParams } from 'react-router-dom'

const Join = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [gameState, setGameState] = useState('signup')
  const [roomCode, setRoomCode] = useState(searchParams.get('code') ?? '')
  const [name, setName] = useState('')

  useEffect(() => {
    if (gameState === 'joined') {
      listenQuestionStarted(() => {
        console.log('GAME STARTED')
      })
    }
  }, [gameState])
  switch (gameState) {
    case 'signup':
      return (
        <MobileLayout>
          <label htmlFor="">Room Code</label>
          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            type="text"
            placeholder="ENTER 4 LETTER GAME CODE"
          />
          <label htmlFor="">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="ENTER YOUR NAME"
          />
          <CircleButton
            text="Start"
            onclick={() => {
              listenFailedJoin(() => {
                notification.open({
                  message: 'Failed to join room.',
                })
              })
              listenSucceededJoin(() => {
                setGameState('joined')
              })
              sendJoinGame(roomCode, name)
            }}
          />
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
