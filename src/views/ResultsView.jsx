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
    const seriesSettings = [
      {
        valueYField: "price",
        tooltip: "Price: ${valueY}",
      },
      {
        valueYField: "ppa1",
        tooltip: "PPA1:  ${valueY}",
      },
      {
        valueYField: "ppa2",
        tooltip: "PPA2:  ${valueY}",
      },
      {
        valueYField: "combined",
        tooltip: "Combined:  ${valueY}",
      },
      {
        valueYField: "optimised",
        tooltip: "Optimised:  ${valueY}",
      },
    ];
    return (
      <Card
        style={{
          paddingTop: 20,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
        }}
      >
        <Card.Title style={{ paddingLeft: 15 }}>Simulation Results</Card.Title>
        <Card.Body>
          <AmChart
            data={this.props.chart1}
            seriesSettings={seriesSettings}
          ></AmChart>
          // Second chart revenue,
        </Card.Body>
      </Card>
    );
  }
}
