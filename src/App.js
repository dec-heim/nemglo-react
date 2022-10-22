import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
  import { Button, Card, Col, Container, Row, Navbar, Nav} from "react-bootstrap";
import SimulationDashboard from "./views/SimulationDashboard";

import './App.scss';

// import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <Navbar className="navbar">
        <Container >
          <Navbar.Brand href="/">NEMGLO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">Simulator</Nav.Link>
            <Nav.Link href="features">Report</Nav.Link>
            <Nav.Link href="pricing">Settings</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      


      <Router>
        <Routes>
          <Route path="/" element={<SimulationDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
