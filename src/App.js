import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Navbar,
  Nav,
} from "react-bootstrap";
import SimulationDashboard from "./views/SimulationDashboard";
import { ProSidebarProvider } from "react-pro-sidebar";
import { HiAdjustments } from "react-icons/hi";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import AmChart from "./components/AmChart";

import { Sidebar, Menu, MenuItem, SubMenu, Icon } from "react-pro-sidebar";

function App() {
  return (
    <ProSidebarProvider className="pro-sidebar">
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="/">NEMGLO</Navbar.Brand>
        </Container>
      </Navbar>
      <SimulationDashboard />
  
      {/* <div style={{ display: "flex", height: "100%" }}>
        <Sidebar style={{ "border-right": "None" }}>
          <Menu>
            <SubMenu label="Configure Model">
              <MenuItem> Planner </MenuItem>
              <MenuItem> Electrolyser </MenuItem>
              <MenuItem> Renewable PPA 1 </MenuItem>
              <MenuItem>Renewable PPA 2 </MenuItem>
              <MenuItem> Emissions </MenuItem>
            </SubMenu>
            <MenuItem> Results </MenuItem>
            <MenuItem> About </MenuItem>
          </Menu>
        </Sidebar>

        <Container style={{ background: "#eceff4" }}>
          <Router>
            <Routes>
              <Route path="/" element={<SimulationDashboard />} />
              <Route path="/test" element={<AmChart />} />
            </Routes>
          </Router>
        </Container>
      </div> */}
    </ProSidebarProvider>
  );
}

export default App;
