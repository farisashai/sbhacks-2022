import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from './App';
import Steven from './containers/Steven';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route exact path="/steven" element={<Steven />} /> */}
        <Route exact path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
