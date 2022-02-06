import { Server, Socket } from "socket.io";
import { uuid } from "./utils";

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

    private handleCreateGame = () => {
        console.log("handleCreateGame");

        const game: Game = { code: uuid(4), players: [] };

        games.set(game.code, game);

        this.socket.emit('gameCreated', game);
    };

    private handleStartGame = () => {
        console.log("handleStartGame");
    
        this.socket.emit('Ack: handleStartGame', '');
    };

    private handleSkipQuestion = () => {
        console.log("handleSkipQuestion");
    
        this.socket.emit('Ack: handleSkipQuestion', '');
    };

    // Player to Server Events

    private handleJoinGame = () => {
        console.log("handleJoinGame");
    
        this.socket.emit('Ack: handleJoinGame', '');
    };

    private handleAnswerQuestion = () => {
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