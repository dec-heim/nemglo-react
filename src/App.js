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
    // <div style={{ height: "100vh * 2"}}>
    <ProSidebarProvider className="pro-sidebar">
      <Navbar className="navbar"  expand="lg">
          <Container>
          <Navbar.Brand href="/">NEMGLO</Navbar.Brand>
          </Container>
      </Navbar>
      <SimulationDashboard />
    </ProSidebarProvider>
    // </div>
  );
}

export default App;