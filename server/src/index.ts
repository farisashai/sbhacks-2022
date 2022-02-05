import { Request, Response } from "express";
import { Socket, Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, ConnectionHandler } from "./socket";

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>sbhacks-2022-backend</h1>');
});

io.on('connection', (socket: Socket) => {
  new ConnectionHandler(io, socket).handleConnection();
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
