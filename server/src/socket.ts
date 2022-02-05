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

export class ConnectionHandler {
    private io: Server;
    private socket: Socket;

    constructor(io: Server, socket: Socket) {
        this.io = io;
        this.socket = socket;
    }

    // Host to Server Events

    private handleCreateGame: ClientToServerEvents["createGame"] = () => {
        console.log("handleCreateGame");
    
        this.socket.emit('Ack: handleCreateGame', '');
    };

    private handleStartGame: ClientToServerEvents["startGame"] = () => {
        console.log("handleStartGame");
    
        this.socket.emit('Ack: handleStartGame', '');
    };

    private handleSkipQuestion: ClientToServerEvents["skipQuestion"] = () => {
        console.log("handleSkipQuestion");
    
        this.socket.emit('Ack: handleSkipQuestion', '');
    };

    // Player to Server Events

    private handleJoinGame: ClientToServerEvents["joinGame"] = () => {
        console.log("handleJoinGame");
    
        this.socket.emit('Ack: handleJoinGame', '');
    };

    private handleAnswerQuestion: ClientToServerEvents["answerQuestion"] = () => {
        console.log("handleAnswerQuestion");
    
        this.socket.emit('Ack: handleAnswerQuestion', '');
    };

    public handleConnection = () => {
        
        // Client to Server Events
        this.socket.on('answerQuestion', this.handleAnswerQuestion);
        this.socket.on('createGame', this.handleCreateGame);
        this.socket.on('joinGame', this.handleJoinGame);
        this.socket.on('skipQuestion', this.handleSkipQuestion);
        this.socket.on('startGame', this.handleStartGame);

        
    
        console.log('a user connected');
    };
}