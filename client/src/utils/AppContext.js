import { createContext, useMemo, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gameID, setGameID] = useState(null);
  const [playerID, setPlayerID] = useState(null);

  const value = useMemo(
    () => ({
      gameID,
      setGameID,
      playerID,
      setPlayerID,
    }),
    [gameID, setGameID, playerID, setPlayerID]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
