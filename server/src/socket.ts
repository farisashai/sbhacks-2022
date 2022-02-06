import { Server, Socket } from "socket.io";
import { randomInteger, uuid } from "./utils";

const LIMIT = 6;

class Player {
    playerID: string;
    name: string;
    photo: string;
    score: number;

    constructor(name: string) {
        this.playerID = uuid(4);
        this.name = name;
        this.photo = `icon-${randomInteger(1, 6)}.svg`;
        this.score = 0;
    }
}

class Question {
    question: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correct: "A" | "B" | "C" | "D";

    constructor(question: string, answerA: string, answerB: string, answerC: string, answerD: string, correct: "A" | "B" | "C" | "D") {
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correct = correct;
    }

    public getPublicQuestion = () => {
        return { question: this.question, answerA: this.answerA, answerB: this.answerB, answerC: this.answerC, answerD: this.answerD };
    }

    public getQuestionAnswer = () => {
        return { correct: this.correct };
    }
}

class Guess {
    playerID: string;
    guess: "A" | "B" | "C" | "D";

    constructor(playerID: string, guess: "A" | "B" | "C" | "D") {
        this.playerID = playerID;
        this.guess = guess;
    }
}

class Game {
    gameID: string;
    players: Player[];
    active: boolean;
    questions: Question[];
    questionNumber: number;
    questionTotal: number;
    currentQuestion: Question;
    guesses: Guess[];
    timeoutID: NodeJS.Timeout;

    constructor() {
        this.gameID = uuid(4);
        this.players = [];
        this.active = false;
        // this.questions = [];
        this.questionNumber = 0;
        this.questionTotal = 3;
        this.currentQuestion = null;
        this.guesses = [];
        this.timeoutID = null;

        this.questions = [
            new Question("What is the first letter of the alphabet?", "A", "B", "C", "D", "A"),
            new Question("What is the fourth number of the numberbet?", "1", "2", "3", "4", "D"),
            new Question("Who's last name is Lee?", "Shirley", "Steven", "Stanley", "Faris", "C"),
        ]

        // new Question("The routine RestoreContext", "always returns 0;", "always returns the id of the calling thread;", "returns either 0 or the id of the calling thread;", "does not return.", "D"),
        //     new Question("To yield (give up the CPU) to another process, a process must", "save the program counter last;", "save the stack pointer before the program counter;", "call SaveContext;", "call RestoreContext.", "D"),
        //     new Question("Synchronization is used", "to avoid deadlocks;", "to avoid race conditions;", "to set an alarm;", "to transfer data from one process to another.", "D"),
        //     new Question("A critical section", "must execute before all non-critical sections;", "must execute before another process executes;", "can be executed by multiple processes only on a multiprocessor;", "can only be executed by one process at a time.", "D"),
        //     new Question("One necessary condition satisfying mutual exclusion is", "no process outside its critical section may block other processes;", "a process inside its critical section causes all other processes to block;", "a process may cause another process in its critical section to block;", "no process inside its critical section may block other processes.", "D"),
        //     new Question("The semaphore Signal operation increments the semaphore\'s value", "only if there are no waiting processes;", "and if there are no waiting processes, puts the process to sleep;", "and if there are any waiting processes, wakes one of them up;", "only if there are waiting processes.", "D"),
        //     new Question("Any interprocess communication (IPC) mechanism", "cannot be implemented solely with semaphores and shared memory;", "requires mechanisms for data transfer or synchronization, but not necessarily both;", "requires mechanisms for data transfer and synchronization;", "may be implemented solely with semaphores.", "D"),
        //     new Question("In a monitor, mutual exclusion is achieved by", "allowing only one process to be active inside the monitor;", "forcing a process to leave immediately if another is trying to enter;", "allowing processes to wait and signal other processes;", "forcing a process to wait if another is trying to enter.", "D"),
        //     new Question("Synchronization is achieved in message passing by", "not allowing a process to call receive until another process has called send;", "allowing a process to call receive only after another process has called send;", "making a process that calls receive to wait until the message is sent;", "making a sending process check whether another process is waiting to receive a message.", "D"),
        //     new Question("When evaluated based on turnaround time, shortest-process-next", "is always better than first-come-first-served;", "is never worse than shortest-remaining-time-first;", "may be better or worse than first-come-first-served;", "may be better or worse than round-robin.", "D"),
        //     new Question("If processes are executed in shortest-to-longest order, what is minimized:", "average time spent using the CPU;", "total time before all complete;", "average time spent waiting for the CPU;", "total time the CPU is idle.", "D"),
        //     new Question("Which is a condition for mutual exclusion:", "semaphores must be used to guard critical sections;", "Receive must be called before Send when using message passing;", "a process outside a critical section cannot cause a process about to enter a critical section to block;", "Signal must be the last statement in a monitor procedure.", "D"),
        //     new Question("When a process calls Wait(sem), which of the following cannot happen:", "a blocked process becomes ready;", "the calling process blocks;", "a deadlock occurs;", "the calling process does not block.", "D"),
        //     new Question("In the Banker\'s algorithm, a safe state means", "deadlock can definitely be avoided;", "there are no guarantees that deadlock can be avoided;", "one or more resources are available;", "all resources are currently being used.", "D"),
        //     new Question("Peterson\'s algorithm", "can\'t be used for mutual exclusion;", "can be used for mutual exclusion, but requires busy waiting;", "can be used for mutual exclusion and avoids busy waiting;", "is more efficient than using test-and-set.", "D"),
        //     new Question("Monitors require programming language (compiler) support to implement", "producer/consumer;", "mutual exclusion;", "context switching;", "deadlock prevention.", "D"),
        //     new Question("To support time-sharing the following must be supported by the kernel:", "the Yield system call;", "preemption;", "first-come-first-served scheduling;", "semaphores.", "D"),
        //     new Question("To implement user-level threads,", "the process stack must contain a stack per thread;", "context switching between threads must be supported by the kernel;", "thread scheduling is done by the kernel;", "all of the above.", "D"),
        //     new Question("In PA2, DoSched is used to", "cause the kernel to make a scheduling decision at the next opportune time;", "determine which process should run next;", "cause a context switch;", "respond to a timer interrupt.", "D"),
        //     new Question("In PA2, a call to RequestCPUrate(m,n) may be denied if: ", "m < n;", "m > n; ", "m = n; ", "all of the above.", "D"),
        //     new Question("Which of the calls below are not pure system calls?.", "fork()", "read()", "printf()", "exit()", "D"),
        //     new Question("Which are optimal, non-preemptive and preemptive scheduling policies?.", "FCFS & Round Robin", "Shortest Process Next & Proportional", "LIFO & Shortest Remaining Time", "Shortest Process Next & Shortest Remaining Time", "D"),
        //     new Question("Synchronization is used", "to avoid deadlocks;", "to avoid race conditions;", "to set an alarm;", "to transfer data from one process to another.", "D"),
        //     new Question("Rate Monotonic Scheduling can be used for", "periodic Processes", "eriodic Process", "or Both periodic and aperiodic processes.", "one of the above.", "D"),
        //     new Question("In the Banker\'s Algorithm, which of the following scenarios can occur:", "state is safe, a resource request is granted, state becomes unsafe;", "state is safe, a resource request is granted, state remains safe;", "state is unsafe, a resource request is granted, state becomes safe;", "state is unsafe, a resource request is granted, state remains unsafe.", "D"),
        //     new Question("The semaphore Signal operation increments the semaphore\'s value", "only if there are no waiting processes;", "and if there are no waiting processes, puts the process to sleep;", "and if there are any waiting processes, wakes one of them up;", "only if there are waiting processes.", "D"),
        //     new Question("Any interprocess communication (IPC) mechanism", "cannot be implemented solely with semaphores and shared memory;", "requires mechanisms for data transfer OR synchronization, but not necessarily both;", "requires mechanisms for data transfer AND synchronization;", "may be implemented solely with semaphores.", "D"),
        //     new Question("In a monitor, mutual exclusion is achieved by", "allowing only one process to be active inside the monitor;", "forcing a process to leave immediately if another is trying to enter;", "allowing processes to wait and signal other processes;", "forcing a process to wait if another is trying to enter.", "D"),
        //     new Question("If a set of processes can be scheduled to meet all deadlines using Earliest Deadline First, can all deadlines also be met using Rate-Monotonic Scheduling?", "yes;", "no;", "depends on utilization;", "none of the above.", "D"),
        //     new Question("If processes are executed in shortest-to-longest order, what is minimized:", "verage time spent using the CPU;", "total time before all complete;", "verage time spent waiting for the CPU;", "total time the CPU is idle.", "D"),
        //     new Question("When a process calls Wait(sem), which of the following cannot happen:", "a blocked process becomes ready;", "the calling process blocks;", "a deadlock occurs;", "the calling process does not block.", "D"),
        //     new Question("The Banker\'s Algorithm keeps track of", "free resources for all processes;", "allocated resources per process;", "total resources;", "all of the above.", "D"),
        //     new Question("Peterson\'s algorithm", "can\'t be used for mutual exclusion;", "can be used for mutual exclusion, but requires busy waiting;", "can be used for mutual exclusion and avoids busy waiting;", "is more efficient than using test-and-set.", "D"),
        //     new Question("Monitors require programming language (compiler) support to implement", "producer/consumer;", "mutual exclusion;", "context switching;", "deadlock prevention.", "D"),
        //     new Question("To support time-sharing the following must be supported by the kernel:", "the Yield system call;", "preemption;", "first-come-first-served scheduling;", "semaphores.", "D"),
        //     new Question("To implement user-level threads,", "the process stack must contain a stack per thread;", "context switching between threads must be supported by the kernel;", "thread scheduling is done by the kernel;", "all of the above.", "D"),
        //     new Question("The kernel gets back CPU control, when-", "rocess makes blocking read() call.", "rocess calls yield()", "rocess exits()", "iring of timer Interrupt.", "D"),
        //     new Question("Multi-Level-feedback-queue scheduling approximates which of the following scheduling policies.", "FIFO", "Priority", "Round Robin", "Shortest process Next.", "D"),
        //     new Question("Given a semaphore Z, there is no way for a process to determine that", "it blocked another process immediately after it called Wait (Z);", "it blocked another process immediately after it called Signal (Z);", "it will block itself if it calls Wait(Z);", "it will block itself if it calls Signal (Z).", "D"),
        //     new Question("By ordering all resources and forcing all requests to follow the ordering, which condition for deadlock is being removed:", "utual exclusion;", "hold and wait;", "no preemption;", "circular wait.", "D")
    }

    public getPublicGame = () => {
        return { gameID: this.gameID, players: this.players, active: this.active };
    };
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

        const game = new Game();

        games.set(game.gameID, game);

        this.socket.emit('gameCreated', game.getPublicGame());
    };

    private handleStartGame = (input: { gameID: string }) => {
        console.log("handleStartGame");

        if (!input || !input.gameID) {
            console.log("handleStartGame", "ERROR: missing gameID parameter")
            return;
        }

        const { gameID } = input;

        if (!games.has(gameID)) {
            console.log("handleStartGame", "ERROR: unable to find game")
            return;
        }

        const game = games.get(gameID);

        game.active = true;

        this.doQuestion(gameID);
    };

    private doQuestion = (gameID: string) => {
        console.log("doQuestion");

        if (!games.has(gameID)) {
            console.log("doQuestion", "ERROR: unable to find game")
            return;
        }

        const game = games.get(gameID);

        if (game.questions.length !== 0) {
            console.log("questionStarted");

            game.questionNumber++;

            this.io.emit('questionStarted', {...game.questions[0].getPublicQuestion(), questionNumber: game.questionNumber, questionTotal: game.questionTotal, playerCount: game.players.length });

            game.currentQuestion = game.questions[0];

            game.questions.splice(0, 1);
            games.set(gameID, game);
        }

        const timeoutID = setTimeout(() => {
            const game = games.get(gameID);

            for (let i = 0; i < game.guesses.length; i += 1) {
                const guess = game.guesses[i];

                const playerIdx = game.players.findIndex((player) => player.playerID === guess.playerID);

                if (playerIdx === -1) {
                    continue;
                }

                if (guess.guess === game.currentQuestion.correct) {
                    game.players[playerIdx].score += 100 * (6 - i);
                }
            }

            const question = game.currentQuestion;

            game.currentQuestion = null;
            game.guesses = [];
            games.set(gameID, game);

            this.io.emit('questionEnded', { ...question, questionNumber: game.questionNumber, questionTotal: game.questionTotal, playerCount: game.players.length });

            setTimeout(() => {
                this.io.emit('gameResults', { finished: game.questions.length === 0, question, players: game.players });

                if (game.questions.length !== 0) {
                    setTimeout(() => {
                        this.doQuestion(gameID);
                    }, 7500);
                }
            }, 7500);
        }, 10000);

        game.timeoutID = timeoutID;
        games.set(gameID, game);
    };

    private handleSkipQuestion = (input: { gameID: string }) => {
        console.log("handleSkipQuestion");

        if (!input || !input.gameID) {
            console.log("handleSkipQuestion", "ERROR: missing gameID parameter")
            return;
        }

        const { gameID } = input;

        if (!games.has(gameID)) {
            console.log("handleSkipQuestion", "ERROR: unable to find game")
            return;
        }

        const game = games.get(gameID);

        if (game.currentQuestion) {
            const question = game.currentQuestion;

            game.currentQuestion = null;
            game.guesses = [];

            games.set(gameID, game);

            this.io.emit('gameResults', { finished: game.questions.length === 0, question, players: game.players });
        }
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

        const player: Player = new Player(name);

        game.players.push(player);
    
        this.socket.emit('succeededJoin', { playerID: player.playerID });
        this.io.emit('gameUpdated', game.getPublicGame());
    };

    private handleAnswerQuestion = ({ gameID, playerID, answer }: { gameID: string, playerID: string, answer: "A" | "B" | "C" | "D" }) => {
        console.log("handleAnswerQuestion");

        if (!gameID || !playerID || !answer) {
            console.log("handleAnswerQuestion", "ERROR: missing variable")
            return;
        }

        if (!games.has(gameID)) {
            console.log("handleAnswerQuestion", "ERROR: unable to find game")
            return;
        }
        
        const game = games.get(gameID);

        game.guesses.push(new Guess(playerID, answer));

        games.set(gameID, game);

        this.io.emit('questionUpdated', { answerCount: game.guesses.length });
    };

    public handleConnection = () => {

        this.socket.on('answerQuestion', this.handleAnswerQuestion);
        this.socket.on('createGame', this.handleCreateGame);
        this.socket.on('joinGame', this.handleJoinGame);
        this.socket.on('skipQuestion', this.handleSkipQuestion);
        this.socket.on('startGame', this.handleStartGame);
    
        console.log(`a user, ${this.socket.id}, connected`);
    };
}