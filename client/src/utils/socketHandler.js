import { io } from "socket.io-client";

const SERVER_URL = "http://192.168.1.133:4000";

const connection = io(SERVER_URL);

connection.onAny((event, ...args) => {
    console.log(`got ${event}, ${JSON.stringify(args)}`);
});

export const sendMessage = (event, args) => {
    connection.emit(event, args);
};

export const sendCreateGame = () => {
    connection.emit('createGame');
}

export const listenGameCreated = (callback) => {
    connection.removeAllListeners('gameCreated');
    connection.on('gameCreated', callback);
};
