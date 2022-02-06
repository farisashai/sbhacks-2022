import { Request, Response } from "express";
import { Socket, Server } from "socket.io";
import { ConnectionHandler } from "./socket";

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const io: Server = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (_: Request, res: Response) => {
  res.send("<h1>sbhacks-2022-backend</h1>");
});

io.on("connection", (socket: Socket) => {
  new ConnectionHandler(io, socket).handleConnection();
});

server.listen(process.env.PORT || 4000);


