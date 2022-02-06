import { useState } from 'react';

import { sendMessage } from 'utils/socketHandler';

function Steven() {
  const [event, setEvent] = useState('');
  const [args, setArgs] = useState('');

  return (
    <div>
      <h1>socket.io client connection test</h1>
      <p>Event</p>
      <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} />
      <p>Args</p>
      <input type="text" value={args} onChange={(e) => setArgs(e.target.value)} />
      <br />
      <br />
      <button type="button" onClick={() => sendMessage(event, JSON.parse(args))}>
        Send Message
      </button>
    </div>
  );
}

export default Steven;
