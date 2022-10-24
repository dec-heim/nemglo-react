import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import DropDownSelector from "../components/DropDownSelector";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";

const secProfiles = ["fixed", "variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

export default class PlannerConfig extends Component {
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
        <Card.Title style={{ paddingLeft: 15 }}>Market Data</Card.Title>
        <Card.Body>
          <DropDownSelector
            id="dispatchIntervalLength"
            label="Dispatch Interval Length"
            value={this.props.dispatchIntervalLength}
            options={[30, 60, 90]}
            setConfigValue={this.props.setConfigValue}
          ></DropDownSelector>

          <Form.Group style={{ paddingBottom: 10 }}>
            <Form.Label
              style={{
                textAlign: "text-center text-md-right",
              }}
            >
              Start Date
            </Form.Label>
            <Form.Control
              required
              id="startDate"
              type="date"
              format="dd/MM/yyyy"
              onChange={(e) =>
                this.props.setConfigValue("startDate", e.target.value)
              }
              value={this.props.startDate}
              isInvalid={this.isDateInvalid()}
            />
            <Form.Control.Feedback type="invalid">
              Please select a valid date. Maximum date range is 7 days.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ paddingBottom: 10 }}>
            <Form.Label
              style={{
                textAlign: "text-center text-md-right",
              }}
            >
              End Date
            </Form.Label>
            <Form.Control
              required
              id="endDate"
              type="date"
              format="dd/MM/yyyy"
              onChange={(e) =>
                this.props.setConfigValue("endDate", e.target.value)
              }
              value={this.props.endDate}
              isInvalid={this.isDateInvalid()}
            />
            <Form.Control.Feedback type="invalid">
              Please select a valid date. Maximum date range is 7 days.
            </Form.Control.Feedback>
          </Form.Group>
          <DropDownSelector
            id="region"
            label="Region"
            value={this.props.region}
            options={regions}
            setConfigValue={this.props.setConfigValue}
          ></DropDownSelector>
        </Card.Body>
      </Card>
    );
  }
}
