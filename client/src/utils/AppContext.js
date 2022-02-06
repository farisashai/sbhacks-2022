import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gameID, setGameID] = useState(null);
  const [playerID, setPlayerID] = useState(null);
  const [questions, setQuestions] = useState([]);

  const value = useMemo(
    () => ({
      gameID,
      setGameID,
      playerID,
      setPlayerID,
      questions,
      setQuestions,
    }),
    [gameID, setGameID, playerID, setPlayerID, questions, setQuestions]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
