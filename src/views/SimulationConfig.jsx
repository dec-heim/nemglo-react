import moment from "moment/moment";
import React, { Component } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import Chart from "../components/Chart";
import DropDownSelector from "../components/DropDownSelector";
import PlotlyChart from "../components/PlotlyChart";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";
import data from "../data/response.json";

export default class SimulationConfig extends Component {
  constructor() {
    super();
    this.state = {
      dispatchIntervalLength: 0,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      electrolyserCapacity: 50,
      ppa1StrikePrice: 20,
      ppa1Capacity: 30,
      ppa2StrikePrice: 0,
      ppa2Capacity: 0,
      duid1: "",
      secProfile: "",
      conversionFactor: 0,
      nominalSec: 0,
      overload: 0,
      ratedLoad: 0,
      minStableLoad: 50,
      technologyType: "",
      dataPoints: [],
    };

    // Bindings go here
    this.setValue = this.setValue.bind(this);
    this.getData = this.getData.bind(this);
    this.setSeriesData = this.setSeriesData.bind(this);
    this.setSeriesData();
  }

  setValue = (id, val) => {
    this.setState({
      [id]: val,
    });
  };

  setSeriesData = () => {
    let dataPoints = [];
    let optimised = [];
    let x = [];
    for (let i = 0; i < data.time.length; i++) {
      optimised.push(100);
      x.push(i + 1);
    }

    dataPoints.push(
      {
        // prices
        x: x,
        y: data.prices,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "red" },
      },
      {
        // ppa 1
        x: x,
        y: data.ppa1.data,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "blue" },
      },
      {
        // ppa 2
        x: x,
        y: data.ppa2.data,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "green" },
      },
      {
        // combined vre
        x: x,
        y: data.combined_vre.data,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "yellow" },
      },

      {
        // optimised
        x: x,
        y: optimised,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "orange" },
      }
    );
    this.setState({ dataPoints });
  };

  getData = () => {
    let dataPoints = [];
    for (let i = 0; i < data.time.length; i++) {
      let dataPoint = {};
      dataPoint["time"] = data.time[i];
      dataPoint["price"] = data.prices[i];
      dataPoint["ppa1"] = data.ppa1.data[i];
      dataPoint["ppa2"] = data.ppa2.data[i];
      dataPoint["combined"] = data.combined_vre.data[i];
      dataPoint["optimised"] = data.optimised_load.data[i][1];
      dataPoints.push(dataPoint);
    }
    return dataPoints;
  };

  render() {
    const {
      electrolyserCapacity,
      ppa1StrikePrice,
      ppa1Capacity,
      ppa2StrikePrice,
      ppa2Capacity,
      overload,
      ratedLoad,
      minStableLoad,
      dataPoints,
    } = this.state;

    return (
      <div>
        <Container style={{ height: 15 }} />
        <Row>
          <Col className="electrolyser-load">
            <Card
              style={{
                paddingTop: 20,
                paddingBottom: 10,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <Card.Title style={{ paddingLeft: 15 }}>
                Electrolyser Load
              </Card.Title>
              <Card.Body>
                <DropDownSelector
                  id="technologyType"
                  label="Technology Type"
                  options={["PEM", "MEM"]}
                  setValue={this.setValue}
                ></DropDownSelector>

                <SliderInput
                  id="electrolyserCapacity"
                  label="Capacity (MW)"
                  setValue={this.setValue}
                  value={electrolyserCapacity}
                  max={100}
                ></SliderInput>
                <Container style={{ height: 50 }}></Container>
                <SliderInput
                  id="minStableLoad"
                  label="Minimum Stable Load"
                  setValue={this.setValue}
                  value={minStableLoad}
                  max={100}
                ></SliderInput>
                <SliderInput
                  id="ratedLoad"
                  label="Rated Load (MW)"
                  setValue={this.setValue}
                  value={ratedLoad}
                  max={100}
                ></SliderInput>
                <SliderInput
                  id="overload"
                  label="Overload (MW)"
                  setValue={this.setValue}
                  value={overload}
                  max={100}
                ></SliderInput>
                <Container style={{ height: 50 }}></Container>
                <RegularInput
                  id="nominalSec"
                  label="Nominal SEC (KWH/kg)"
                  placeholder={50}
                  setValue={this.setValue}
                ></RegularInput>
                <RegularInput
                  id="conversionFactor"
                  label="Conversion Factor (%)"
                  placeholder={50}
                  setValue={this.setValue}
                ></RegularInput>
                <DropDownSelector
                  id="secProfile"
                  label="SEC Profile"
                  options={["Fixed", "Variable"]}
                  setValue={this.setValue}
                ></DropDownSelector>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
              <Col className="renewables-ppa-1">
                <Card
                  style={{
                    paddingTop: 20,
                    paddingBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Card.Title style={{ paddingLeft: 15 }}>PPA 1</Card.Title>
                  <Card.Body>
                    <DropDownSelector
                      id="duid1"
                      label="DUID (Unit)"
                      options={["BERYLSF1", "BERYLSF2"]}
                      setValue={this.setValue}
                    ></DropDownSelector>
                    <SliderInput
                      id="ppa1Capacity"
                      label="Capacity (MW)"
                      setValue={this.setValue}
                      value={ppa1Capacity}
                      max={100}
                    ></SliderInput>
                    <SliderInput
                      id="ppa1StrikePrice"
                      label="PPA Strike ($/MWh)"
                      setValue={this.setValue}
                      value={ppa1StrikePrice}
                      max={100}
                    ></SliderInput>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="renewables-ppa-2">
                <Card
                  style={{
                    paddingTop: 20,
                    paddingBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Card.Title style={{ paddingLeft: 15 }}>PPA 1</Card.Title>
                  <Card.Body>
                    <DropDownSelector
                      id="duid2"
                      label="DUID (Unit)"
                      options={["BERYLSF1", "BERYLSF2"]}
                      setValue={this.setValue}
                    ></DropDownSelector>
                    <SliderInput
                      id="ppa2Capacity"
                      label="Capacity (MW)"
                      setValue={this.setValue}
                      value={ppa2Capacity}
                      max={100}
                    ></SliderInput>
                    <SliderInput
                      id="ppa2StrikePrice"
                      label="PPA Strike ($/MWh)"
                      setValue={this.setValue}
                      value={ppa2StrikePrice}
                      max={100}
                    ></SliderInput>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Container style={{ height: 15 }} />
            <Row>
              <Col className="market-data">
                <Card
                  style={{
                    paddingTop: 20,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Card.Title style={{ paddingLeft: 15 }}>
                    Market Data
                  </Card.Title>
                  <Card.Body>
                    <DropDownSelector
                      id="dispatchIntervalLength"
                      label="Dispatch Interval Length"
                      options={[30, 60, 90]}
                      setValue={this.setValue}
                    ></DropDownSelector>

                    <Form.Group style={{ paddingBottom: 10 }}>
                      <Form.Label
                        style={{ textAlign: "text-center text-md-right" }}
                      >
                        Start Period Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        id="startDate"
                        onChange={this.setValue}
                      />
                    </Form.Group>
                    <Form.Group style={{ paddingBottom: 10 }}>
                      <Form.Label
                        style={{ textAlign: "text-center text-md-right" }}
                      >
                        Start Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        name="startTime"
                        onChange={this.setValue}
                      />
                    </Form.Group>
                    <Form.Group style={{ paddingBottom: 10 }}>
                      <Form.Label
                        style={{ textAlign: "text-center text-md-right" }}
                      >
                        End Period Date
                      </Form.Label>
                      <Form.Control type="date" name="endDate" />
                    </Form.Group>
                    <Form.Group style={{ paddingBottom: 10 }}>
                      <Form.Label
                        style={{ textAlign: "text-center text-md-right" }}
                      >
                        End Time
                      </Form.Label>
                      <Form.Control type="time" name="endTime" />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
