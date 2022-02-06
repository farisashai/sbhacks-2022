import './style.less';
import { useState, useEffect, useContext } from 'react';

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
  sendAnswerQuestion,
} from 'utils/socketHandler';
import { notification } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from 'utils/AppContext';

const Join = () => {
  const { gameID, setGameID, playerID, setPlayerID } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [gameState, setGameState] = useState('signup');
  const [roomCode, setRoomCode] = useState(searchParams.get('code') || '');
  const [name, setName] = useState('');

  const [questionState, setQuestionState] = useState({ questionNumber: 0, questionTotal: 0 });

  useEffect(() => {
    listenQuestionStarted((resp) => {
      setQuestionState(resp);
      setGameState('question');
    });
    listenQuestionEnded((resp) => {
      setQuestionState(resp);
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
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            maxLength={4}
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
              listenFailedJoin((resp) => {
                notification.open({
                  message: resp.message,
                });
              });
              listenSucceededJoin((resp) => {
                setGameState('joined');
                setGameID(roomCode.trim().toLocaleUpperCase());
                setPlayerID(resp.playerID);
              });
              sendJoinGame(roomCode.trim().toLocaleUpperCase(), name);
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
          <MobileHeader header={`Question ${questionState.questionNumber}`} body="" />
          <div className="answers">
            <MobileAnswer
              letter="A"
              answer={questionState.answerA}
              boxNum={0}
              onClick={() => {
                console.log({ gameID, playerID, a: 'A' });
                sendAnswerQuestion(gameID, playerID, 'A');
                setGameState('submitted');
              }}
            />
            <MobileAnswer
              letter="B"
              answer={questionState.answerB}
              boxNum={1}
              onClick={() => {
                sendAnswerQuestion(gameID, playerID, 'B');
                setGameState('submitted');
              }}
            />
            <MobileAnswer
              letter="C"
              answer={questionState.answerC}
              boxNum={2}
              onClick={() => {
                sendAnswerQuestion(gameID, playerID, 'C');
                setGameState('submitted');
              }}
            />
            <MobileAnswer
              letter="D"
              answer={questionState.answerD}
              boxNum={3}
              onClick={() => {
                sendAnswerQuestion(gameID, playerID, 'D');
                setGameState('submitted');
              }}
            />
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
          <CircleButton text="Leave" onclick={() => setGameState('signup')} />
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
