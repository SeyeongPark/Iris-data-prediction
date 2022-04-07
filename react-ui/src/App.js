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

      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/test">Test</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<InputData />} />
          <Route path="/result" element={<Result />} />
        {/* <Route render ={()=> < InputData />} path="/test" /> */}
        </Routes>
      </div>

    </Router>
  );
}

export default App;
