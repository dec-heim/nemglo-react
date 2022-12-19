import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LandingPage from "./views/LandingPage";
import SimulationDashboard from "./views/SimulationDashboard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ProSidebarProvider className="pro-sidebar">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>NEMGLO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Router>
        <div>
          <Routes>
            <Route path="dashboard" element={<SimulationDashboard />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
      {/* <SimulationDashboard /> */}
    </ProSidebarProvider>
    //  </div>
  );
}

export default App;
