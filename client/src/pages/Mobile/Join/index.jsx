import './style.less';
import { useState, useEffect } from 'react';

import MobileLayout from 'containers/MobileLayout';

import MobileAnswer from 'components/MobileAnswer';
import MobileHeader from 'components/MobileHeader';
import CircleButton from 'components/Circle/CircleButton';
import {
  sendJoinGame,
  listenFailedJoin,
  listenSucceededJoin,
  listenQuestionStarted,
  listenQuestionEnded,
  listenGameResults,
} from 'utils/socketHandler';
import { notification } from 'antd';
import { useSearchParams } from 'react-router-dom';

const Join = () => {
  const [searchParams] = useSearchParams();
  const [gameState, setGameState] = useState('signup');
  const [roomCode, setRoomCode] = useState(searchParams.get('code') || '');
  const [name, setName] = useState('');

  useEffect(() => {
    listenQuestionStarted(() => {
      setGameState('question');
    });
    listenQuestionEnded(() => {
      setGameState('submitted');
    });
    listenGameResults((resp) => {
      if (resp.finished) {
        setGameState('finished');
      }
    });
  }, [listenQuestionStarted, setGameState, listenQuestionEnded]);
  switch (gameState) {
    case 'signup':
      return (
        <MobileLayout>
          <h1 className="signup-inputs">Room Code</h1>
          <input
            className="signup-input"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            type="text"
            placeholder="ENTER 4 LETTER GAME CODE"
          />
          <h1 className="signup-inputs">Name</h1>
          <input
            className="last-input"
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
                });
              });
              listenSucceededJoin((resp) => {
                setGameState('joined');
                localStorage.setItem('playerID', resp.playerID);
              });
              sendJoinGame(roomCode, name);
            }}
          />
        </MobileLayout>
      );
    case 'joined':
      return (
        <MobileLayout>
          <MobileHeader header="You’re in!" body="Hold tight while players join..." />
        </MobileLayout>
      );
    case 'question':
      return (
        <MobileLayout>
          <div style={{ height: '50px' }} />
          <MobileHeader header="Question 1 " body="" />
          <div className="answers">
            <MobileAnswer letter="A" answer="Meow" toggle={false} boxNum={0} />
            <MobileAnswer letter="B" answer="Meow" toggle={false} boxNum={1} />
            <MobileAnswer letter="C" answer="Meow" toggle={false} boxNum={2} />
            <MobileAnswer letter="D" answer="Meow" toggle={false} boxNum={3} />
          </div>
        </MobileLayout>
      );
    case 'submitted':
      return (
        <MobileLayout>
          <MobileHeader header="Hold on..." body="Results are loading on screen" />
        </MobileLayout>
      );
    case 'finished':
      return (
        <MobileLayout>
          <MobileHeader header="Game Over" body="Look up to see what place you got!" />
          <div style={{ height: '100px' }} />
          <CircleButton text="Leave" onClick={() => setGameState('signup')} />
        </MobileLayout>
      );
    default:
      return (
        <MobileLayout>
          <MobileHeader header="How did you get here?" body="An error has occured!" />
        </MobileLayout>
      );
  }
};

export default Join;
