import { io } from "socket.io-client";

const SERVER_URL = "http://192.168.1.42:4000";

const connection = io(SERVER_URL);

// Host-Specific Commands

export const sendCreateGame = () => {
    connection.emit('createGame');
}

// { gameID, players: { playerID, name, photo, score }[], active }
export const listenGameCreated = (callback) => {
    connection.removeAllListeners('gameCreated');
    connection.on('gameCreated', callback);
};

// { gameID, players: { playerID, name, photo, score }[], active }
export const listenGameUpdated = (callback) => {
    connection.removeAllListeners('gameUpdated');
    connection.on('gameUpdated', callback);
};

export const sendStartGame = () => {
    connection.emit('startGame');
}

// Player-Specific Commands

// { gameID: string, name: string }
export const sendJoinGame = (gameID, name) => {
    connection.emit('joinGame', { gameID, name });
};

// { message }
export const listenFailedJoin = (callback) => {
    connection.removeAllListeners('failedJoin');
    connection.on('failedJoin', callback);
}

// { playerID }
export const listenSucceededJoin = (callback) => {
    connection.removeAllListeners('succeededJoin');
    connection.on('succeededJoin', callback);
}

// { gameID: string, playerID: string, answer: "A" | "B" | "C" | "D" }
export const sendAnswerQuestion = (gameID, playerID, answer) => {
    connection.emit('answerQuestion', { gameID, playerID, answer });
};

// Shared Commands

// { question, answerA, answerB, answerC, answerD }
export const listenQuestionStarted = (callback) => {
    connection.removeAllListeners('questionStarted');
    connection.on('questionStarted', callback);
}

// { question: { question, answerA, answerB, answerC, answerD, correct }, answerCount, players: { playerID, name, photo, score }[] }
export const listenQuestionEnded = (callback) => {
    connection.removeAllListeners('questionEnded');
    connection.on('questionEnded', callback);
}

// Testing Commands

// Listen for all events
connection.onAny((event, ...args) => {
    console.log(`got ${event}, ${JSON.stringify(args)}`);
});

// Send a custom event message
export const sendMessage = (event, args) => {
    connection.emit(event, args);
};