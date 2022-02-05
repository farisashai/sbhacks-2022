import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Steven = () => {
    const [connection, setConnection] = useState();

    useEffect(() => {
        setConnection(io("http://localhost:4000"));
    }, [])

    const [event, setEvent] = useState('');
    const [args, setArgs] = useState('');

    return (
        <div>
            <h1>socket.io client connection test</h1>
            <p>Event</p>
            <input type="text" value={event} onChange={(e) => setEvent(e.target.value)}/>
            <p>Args</p>
            <input type="text" value={args} onChange={(e) => setArgs(e.target.value)}/>
            <br />
            <br />
            <button type='button' onClick={() => connection.emit(event, args)}>Send Message</button>
        </div>
    );
}

export default Steven;