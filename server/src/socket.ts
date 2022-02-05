import { Server, Socket } from "socket.io";

export interface ServerToClientEvents {
    failedJoin: () => void;
    gameCreated: () => void;
    gameResults: () => void;
    gameUpdated: () => void;
    questionEnded: () => void;
    questionStarted: () => void;
    questionUpdated: () => void;
    succeededJoin: () => void;
}

export interface ClientToServerEvents {
    answerQuestion: () => void;
    createGame: () => void;
    joinGame: () => void;
    skipQuestion: () => void;
    startGame: () => void;
}

export interface InterServerEvents {

}

export interface SocketData {

}

const LIMIT = 6;

interface Player {
    name: string;
    photo: string;
}

interface Game {
    code: string;
    players: Player[];
}

const games = new Map<string, Game>();

const handleCreateGame: (io: Server, socket: Socket) => ServerToClientEvents["gameCreated"] = (io: Server, socket: Socket) => () => {
    console.log("handleCreateGame");
};

export const handleConnection = (io: Server, socket: Socket) => {
    socket.on('createGame', handleCreateGame(io, socket));


    console.log('a user connected');

    // socket.broadcast.emit('hi');

    // socket.on('chat message', (msg) => {
    //     console.log(msg);
    //     io.emit('chat message', msg);
    // });

    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
};
