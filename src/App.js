import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Button, Card, Col, Container, Row, Navbar, Nav} from "react-bootstrap";
import SimulationDashboard from "./views/SimulationDashboard";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { HiAdjustments } from "react-icons/hi";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import AmChart from "./components/AmChart";

import { Sidebar, Menu, MenuItem, SubMenu, Icon } from 'react-pro-sidebar';

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

      <Container fluid>
        <Row>
          {/* <h4 style={{color: "#a9a9a9"}}>deployment testbench v0.1</h4> */}
        </Row>
        <Row>
          <Col sm={"265px"} className="col_sidebar" style={{alignSelf: "left", width: "265px", minWidth: "265px"}}>
            <ProSidebarProvider className="pro-sidebar">
              <Sidebar className="main_sidebar" backgroundColor="#2e3440" overlayColor="#eceff4"  style={{"border-right": "None"}}>
                <Menu>
                  <SubMenu icon={<HiAdjustments /> } backgroundColor="#2e3440" overlayColor="#000000" label="Configure Model">
                    <MenuItem > Planner </MenuItem>
                    <MenuItem> Electrolyser </MenuItem>
                    <MenuItem disabled> Renewable PPA 1 </MenuItem>
                    <MenuItem disabled> Renewable PPA 2 </MenuItem>
                    <MenuItem disabled> Emissions </MenuItem>
                  </SubMenu>
                  <MenuItem > Results </MenuItem>
                  <MenuItem> About </MenuItem>
                </Menu>
              </Sidebar>
            </ProSidebarProvider>
          </Col>
          <Col style={{background: "#eceff4"}}>
            <Router>
              <Routes>
                <Route path="/" element={<SimulationDashboard />} />
                <Route path="/test" element={<AmChart />} />
              </Routes>
            </Router> 
          </Col>
        </Row>
      </Container>;

      
            
    </div>
  );
}


export default App;
