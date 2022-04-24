import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} 
from "react-router-dom";

import InputData from './InputData';
import Home from './Home';
import Result from './Result';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
    return (

      
      <Router>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">SPTech</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="/" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/test">Test</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<InputData />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
