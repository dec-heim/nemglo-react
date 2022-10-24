import React, { Component } from "react";
import { Card, Container, Button } from "react-bootstrap";


const secProfiles = ["fixed", "variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

export default function SimulationView(props) {
  return (
    <Card
      style={{
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <Card.Title style={{ paddingLeft: 15 }}>Perform Simulation</Card.Title>
      <Card.Body>
        <Button type="submit" variant={"secondary"}>
          Run Simulation
        </Button>
      </Card.Body>
    </Card>
  );
}
