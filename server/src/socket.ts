import { Server, Socket } from "socket.io";

export interface ServerToClientEvents {

}

export interface ClientToServerEvents {

}

export interface InterServerEvents {

}

export interface SocketData {

}

const handleConnection = (io: Server, socket: Socket) => {
   console.log('a user connected');
  socket.broadcast.emit('hi');
  socket.on('chat message', (msg) => {
      console.log(msg);
      io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
};
export handleConnection;