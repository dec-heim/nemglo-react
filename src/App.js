import React from "react";
import { Button, Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { HiAdjustments } from "react-icons/hi";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Icon, Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AmChart from "./components/AmChart";
import SimulationDashboard from "./views/SimulationDashboard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ProSidebarProvider className="pro-sidebar">
      <Navbar className="navbar"  expand="lg">
          <Container>
          <Navbar.Brand href="/">NEMGLO</Navbar.Brand>
          </Container>
      </Navbar>
      <SimulationDashboard />
    </ProSidebarProvider>
  );
}

export default App;
