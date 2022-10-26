import React, { Component } from "react";
import { Card } from "react-bootstrap";

import AmChart from "../components/AmChart";


export default class ResultsView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let seriesSettings = [
      {
        valueYField: "price",
        tooltip: "Price: ${valueY}",
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
    if (!this.props.ppa1Disabled) {
      seriesSettings.push({
        valueYField: "ppa1",
        tooltip: "PPA1:  ${valueY}",
      });
    }
    if (!this.props.ppa2Disabled) {
      seriesSettings.push({
        valueYField: "ppa2",
        tooltip: "PPA2:  ${valueY}",
      });
    }
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
