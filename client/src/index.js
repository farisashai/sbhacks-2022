import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from './App';
import WebsocketServer from './containers/WebsocketServer';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/websocket-server" element={<WebsocketServer />} />
        <Route exact path="/websocket-client" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
