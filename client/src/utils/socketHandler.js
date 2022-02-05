import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:4000";

const connection = io(SERVER_URL);

connection.onAny((event, ...args) => {
    console.log(`got ${event}, ${args}`);
});

export const sendMessage = (event, args) => {
    connection.emit(event, args);
};
