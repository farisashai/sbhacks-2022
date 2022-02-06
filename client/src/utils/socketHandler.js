import { io } from "socket.io-client";

const SERVER_URL = "http://192.168.1.42:4000";

const connection = io(SERVER_URL);

// Host-Specific Commands

export const sendCreateGame = () => {
    connection.emit('createGame');
}

// { gameID: string; players: Player[]; active: boolean; }
export const listenGameCreated = (callback) => {
    connection.removeAllListeners('gameCreated');
    connection.on('gameCreated', callback);
};

// { gameID: string; players: Player[]; active: boolean; }
export const listenGameUpdated = (callback) => {
    connection.removeAllListeners('gameUpdated');
    connection.on('gameUpdated', callback);
};

// Player-Specific Commands

// { gameID: string, name: string }
export const sendJoinGame = (gameID, name) => {
    connection.emit('joinGame', { gameID, name });
};

// { message: string }
export const listenFailedJoin = (callback) => {
    connection.removeAllListeners('failedJoin');
    connection.on('failedJoin', callback);
}

// { playerID: string }
export const listenSucceededJoin = (callback) => {
    connection.removeAllListeners('succeededJoin');
    connection.on('succeededJoin', callback);
}

// TESTING
connection.onAny((event, ...args) => {
    console.log(`got ${event}, ${JSON.stringify(args)}`);
});

export const sendMessage = (event, args) => {
    connection.emit(event, args);
};