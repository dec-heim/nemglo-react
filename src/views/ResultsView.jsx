import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";

import AmChart from "../components/AmChart";

const secProfiles = ["fixed", "variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

export default class ResultsView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Card
        style={{
          paddingTop: 20,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
        }}
      >
        <Card.Title style={{ paddingLeft: 15 }}>Chart 1</Card.Title>
        <Card.Body>
        <AmChart data={this.props.chart1}></AmChart>
        </Card.Body>
      </Card>
    );
  }
}
