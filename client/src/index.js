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
