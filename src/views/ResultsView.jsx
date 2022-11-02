import React, { Component } from "react";
import { Card } from "react-bootstrap";

import AmChart from "../components/AmChart";
import RevenueChart from "../components/RevenueChart";

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
          <Card.Title style={{ paddingLeft: 15 }}>
            {this.props.title}
          </Card.Title>
          <Card.Body>
            <AmChart
              data={this.props.chart1}
              seriesSettings={this.props.chartSettings}
            ></AmChart>
          </Card.Body>
        </Card>
    );
  }
}
