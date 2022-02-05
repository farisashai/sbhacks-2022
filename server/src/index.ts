import { Request, Response } from "express";
import { Socket } from "socket.io";

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>sbhacks-2022-backend</h1>');
});

io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
  });

server.listen(4000, () => {
  console.log('listening on *:4000');
});