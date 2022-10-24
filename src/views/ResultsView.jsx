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
    this.isDateInvalid = this.isDateInvalid.bind(this);
  }
  isDateInvalid = () => {
    const { startDate, endDate } = this.props;
    console.log("checkingDate", startDate, endDate);
    if (startDate !== "" && endDate !== "") {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = end.getTime() - start.getTime();
      let diffDays = diff / (1000 * 3600 * 24);
      return diffDays > 7 || diffDays <= 0;
    }
    if (startDate !== "" && endDate === "") {
      return true;
    }
    if (startDate === "" && endDate !== "") {
      return true;
    }
    return false;
  };

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
