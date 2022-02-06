import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from 'pages/Desktop/Home';
import UploadNotes from 'pages/Desktop/UploadNotes';
import Lobby from 'pages/Desktop/Lobby';
import Join from 'pages/Mobile/Join';
import Game from 'pages/Desktop/Game';
import SocketTester from 'containers/SocketTester';

import './index.css';
import { AppProvider } from 'utils/AppContext';
// import { textToJSON, ocr } from 'utils/ocr';

// window.text = textToJSON;
// window.data = ocr(
//   'Thomas Jefferson (April 13, 1743 July 4, 1826) was an American statesman, diplomat, lawyer, architect, philosopher, and Founding Father who served as the third president of the United States from 1801 to 1809. He had previously served as the second vice president of the United States under John Adams and as the first United States Secretary of State under George Washington. The principal author of the Declaration of Independence, Jefferson was a proponent of democracy, republicanism, and individual rights, motivating American colonists to break from the Kingdom of Great Britain and form a new nation; he produced formative documents and decisions at both the state and national levels.'
// );

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/upload" element={<UploadNotes />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/lobby" element={<Lobby />} />
          <Route exact path="/play" element={<Game />} />
          <Route exact path="/socket-tester" element={<SocketTester />} />
        </Routes>
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
