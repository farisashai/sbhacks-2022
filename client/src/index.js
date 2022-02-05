import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from 'pages/Home';
import UploadNotes from 'pages/UploadNotes'
import Lobby from 'pages/Lobby'
import Join from 'pages/Join'
import Steven from 'containers/Steven';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/upload" element={
        <UploadNotes
        back={() => window.location.href = '/'}
        next={() => window.location.href = '/lobby'}
        />
        } />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/lobby" element={<Lobby />} />
        <Route exact path="/steven" element={<Steven />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
