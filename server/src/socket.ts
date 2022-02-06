import { Server, Socket } from "socket.io";
import { randomInteger, uuid } from "./utils";

const LIMIT = 6;

interface Player {
    playerID: string;
    name: string;
    photo: string;
}

interface Game {
    gameID: string;
    players: Player[];
    active: boolean;
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

        const game: Game = { gameID: uuid(4), players: [], active: false };

        games.set(game.gameID, game);

        this.socket.emit('gameCreated', game);
    };

    private handleStartGame = ({ gameID }: { gameID: string }) => {
        console.log("handleStartGame");

        if (!games.has(gameID)) {
            console.log("handleStartGame", "ERROR: unable to find game")
            return;
        }

        const game = games.get(gameID);

        game.active = true;

        // TODO: Send first question
    };

    private handleSkipQuestion = () => {
        console.log("handleSkipQuestion");
    
        this.socket.emit('Ack: handleSkipQuestion', '');
    };

    // Player to Server Events

    private handleJoinGame = ({ gameID, name }: { gameID: string, name: string }) => {
        console.log("handleJoinGame");

        if (!gameID) {
            this.socket.emit('failedJoin', { message: "A gameID is required." });
            return;
        }

        if (!name) {
            this.socket.emit('failedJoin', { message: "A name is required." });
            return;
        }

        if (!games.has(gameID)) {
            this.socket.emit('failedJoin', { message: "Unable to find a game with that gameID." });
            return;
        }

        const game: Game = games.get(gameID);

        if (game.players.length >= LIMIT) {
            this.socket.emit('failedJoin', { message: "This game is full." });
            return;
        }

        if (game.active) {
            this.socket.emit('failedJoin', { message: "This game has already started." });
            return;
        }

        const player = { playerID: uuid(4), name, photo: `icon-${randomInteger(1, 6)}.svg` };

        game.players.push(player);
    
        this.socket.emit('succeededJoin', { playerID: player.playerID });
        this.socket.broadcast.emit('gameUpdated', game);
    };

    private handleAnswerQuestion = () => {
        console.log("handleAnswerQuestion");
    
        this.socket.emit('Ack: handleAnswerQuestion', '');
    };

    public handleConnection = () => {

        this.socket.on('answerQuestion', this.handleAnswerQuestion);
        this.socket.on('createGame', this.handleCreateGame);
        this.socket.on('joinGame', this.handleJoinGame);
        this.socket.on('skipQuestion', this.handleSkipQuestion);
        this.socket.on('startGame', this.handleStartGame);
    
        console.log('a user connected');
    };
}