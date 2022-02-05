import { io } from 'socket.io-client';

const Steven = () => {
    const connection = io("http://localhost:4000");

    return <div>
        <h1>socket.io client connection test</h1>
        <button type='button' onClick={() => {
            connection.emit('chat message', "it works!");
        }}>Send Message</button>
        </div>;
}

export default Steven;