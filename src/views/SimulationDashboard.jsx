import React, { Component } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";


import Chart from "../components/Chart";
import DateTimeSelector from "../components/DateTimeSelector";
import DropDownSelector from "../components/DropDownSelector";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";
import NemGloApi from "../api/NemgloApi";

const secProfiles = ["Fixed", "Variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1","QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "MEM"];

export default class SimulationDashboard extends Component {
  constructor() {
    super();
    this.state = {
      config: {
        dispatchIntervalLength: 30,
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        electrolyserCapacity: 50,
        ppa1StrikePrice: 20,
        ppa1Capacity: 30,
        ppa2StrikePrice: 30,
        ppa2Capacity: 30,
        duid1: duids[0],
        duid2: duids[0],
        secProfile: secProfiles[0],
        conversionFactor: 50,
        nominalSec: 6,
        overload: 0,
        ratedLoad: 50,
        minStableLoad: 50,
        h2Price: 6,
        technologyType: technologyTypes[0],
        region: regions[0]
      },
      dataPoints: [],
      viewResults: false,
      resetConfig: false,
      runSimulation: false,
      viewConfig: true,
      resultsLoaded: false,
      runningSimulation: false,
    };

    // Bindings go here
    this.setConfigValue = this.setConfigValue.bind(this);
    this.getReChartsData = this.getReChartsData.bind(this);
  }

  setConfigValue = (id, val) => {
    const { config } = this.state;
    config[id] = val;
    this.setState({
      config,
    });
  };

  getReChartsData = (data) => {
    let dataPoints = [];
    for (let i = 0; i < data.time.length; i++) {
      let dataPoint = {};
      dataPoint["time"] = data.timestamps[i];
      dataPoint["price"] = data.prices[i];
      dataPoint["ppa1"] = data.ppa1.data[i];
      dataPoint["ppa2"] = data.ppa2.data[i];
      dataPoint["combined"] = data.combined_vre[i];
      dataPoint["optimised"] = data.optimised_load[i];
      dataPoints.push(dataPoint);
    }
    this.setState({ dataPoints });
  };

  viewResults = () => {
    this.setState({ viewResults: true, viewConfig: false });
  };

  viewConfig = () => {
    this.setState({ viewResults: false, viewConfig: true });
  };

  runSimulation = async () => {
    this.setState({ runningSimulation: true, resultsLoaded: false });
    const data = await NemGloApi.runSimulation(this.state.config);
    console.log(data);
    this.getReChartsData(data);
    this.setState({ runningSimulation: false, resultsLoaded: true });
  };

  resetConfig = () => {
    this.setState({
      config: {
        dispatchIntervalLength: 30,
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        electrolyserCapacity: 50,
        ppa1StrikePrice: 20,
        ppa1Capacity: 30,
        ppa2StrikePrice: 30,
        ppa2Capacity: 30,
        duid1: duids[0],
        duid2: duids[0],
        secProfile: secProfiles[0],
        conversionFactor: 50,
        nominalSec: 6,
        overload: 0,
        ratedLoad: 50,
        minStableLoad: 50,
        h2Price: 6,
        technologyType: technologyTypes[0],
        region: regions[0]
      },
      dataPoints: [],
      viewResults: false,
      resetConfig: false,
      runSimulation: false,
      viewConfig: true,
      resultsLoaded: false,
      runningSimulation: false,
    });
  };

  render() {
    const {
      config,
      runningSimulation,
      resultsLoaded,
      viewConfig,
      viewResults,
      dataPoints,
    } = this.state;
    return (
      <div>
        <Container style={{ paddingBottom: 5, paddingTop: 15 }}>
          <Stack direction="horizontal" gap={3}>
            <h2>Simulation Config</h2>
            <Button
              variant={!runningSimulation ? "warning" : "secondary"}
              onClick={
                !runningSimulation ? this.runSimulation : console.log("")
              }
            >
              Run Simulation
            </Button>{" "}
            <Button variant="danger" onClick={this.resetConfig}>
              Reset Config
            </Button>{" "}
            {resultsLoaded && (
              <Button variant="primary" onClick={this.viewConfig}>
                View Config
              </Button>
            )}{" "}
            <Button
              variant={resultsLoaded ? "success" : "secondary"}
              onClick={resultsLoaded ? this.viewResults : console.log("")}
            >
              View Results
            </Button>{" "}
          </Stack>

          <Container style={{ height: 15 }} />

          {viewConfig && (
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
                      options={technologyTypes}
                      setConfigValue={this.setConfigValue}
                      value={config.technologyType}
                    ></DropDownSelector>

                    <SliderInput
                      id="h2Price"
                      label="H2 Price ($/kh)"
                      setConfigValue={this.setConfigValue}
                      value={config.h2Price}
                      max={100}
                    ></SliderInput>
                    <SliderInput
                      id="electrolyserCapacity"
                      label="Capacity (MW)"
                      setConfigValue={this.setConfigValue}
                      value={config.electrolyserCapacity}
                      max={100}
                    ></SliderInput>
                    <Container style={{ height: 50 }}></Container>
                    <SliderInput
                      id="minStableLoad"
                      label="Minimum Stable Load"
                      setConfigValue={this.setConfigValue}
                      value={config.minStableLoad}
                      max={100}
                    ></SliderInput>
                    <SliderInput
                      id="ratedLoad"
                      label="Rated Load (MW)"
                      setConfigValue={this.setConfigValue}
                      value={config.ratedLoad}
                      max={100}
                    ></SliderInput>
                    <SliderInput
                      id="overload"
                      label="Overload (MW)"
                      setConfigValue={this.setConfigValue}
                      value={config.overload}
                      max={100}
                    ></SliderInput>
                    <Container style={{ height: 50 }}></Container>
                    <RegularInput
                      id="nominalSec"
                      label="Nominal SEC (KWH/kg)"
                      placeholder={50}
                      setConfigValue={this.setConfigValue}
                      value={config.nominalSec}
                      type="number"
                    ></RegularInput>
                    <RegularInput
                      id="conversionFactor"
                      label="Conversion Factor (%)"
                      placeholder={50}
                      setConfigValue={this.setConfigValue}
                      value={config.conversionFactor}
                      type="number"
                    ></RegularInput>
                    <DropDownSelector
                      id="secProfile"
                      label="SEC Profile"
                      options={secProfiles}
                      setConfigValue={this.setConfigValue}
                      value={config.secProfile}
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
                          options={duids}
                          setConfigValue={this.setConfigValue}
                          value={config.duid1}
                        ></DropDownSelector>
                        <SliderInput
                          id="ppa1Capacity"
                          label="Capacity (MW)"
                          setConfigValue={this.setConfigValue}
                          value={config.ppa1Capacity}
                          max={100}
                        ></SliderInput>
                        <SliderInput
                          id="ppa1StrikePrice"
                          label="PPA Strike ($/MWh)"
                          setConfigValue={this.setConfigValue}
                          value={config.ppa1StrikePrice}
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
                          options={duids}
                          setConfigValue={this.setConfigValue}
                          value={config.duid2}
                        ></DropDownSelector>
                        <SliderInput
                          id="ppa2Capacity"
                          label="Capacity (MW)"
                          setConfigValue={this.setConfigValue}
                          value={config.ppa2Capacity}
                          max={100}
                        ></SliderInput>
                        <SliderInput
                          id="ppa2StrikePrice"
                          label="PPA Strike ($/MWh)"
                          setConfigValue={this.setConfigValue}
                          value={config.ppa2StrikePrice}
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
                          value={config.dispatchIntervalLength}
                          options={[30, 60, 90]}
                          setConfigValue={this.setConfigValue}
                        ></DropDownSelector>
                        <DateTimeSelector
                          type="date"
                          id="startDate"
                          label="Start Date"
                          value={config.startDate}
                          setConfigValue={this.setConfigValue}
                        ></DateTimeSelector>
                        <DateTimeSelector
                          type="time"
                          id="startTime"
                          label="Start Time"
                          value={config.startTime}
                          setConfigValue={this.setConfigValue}
                        ></DateTimeSelector>
                        <DateTimeSelector
                          type="date"
                          id="endDate"
                          label="End Date"
                          value={config.endDate}
                          setConfigValue={this.setConfigValue}
                        ></DateTimeSelector>
                        <DateTimeSelector
                          type="time"
                          id="endTime"
                          label="End Time"
                          value={config.endTime}
                          setConfigValue={this.setConfigValue}
                        ></DateTimeSelector>
                        <DropDownSelector
                          id="region"
                          label="Region"
                          value={config.region}
                          options={regions}
                          setConfigValue={this.setConfigValue}
                        ></DropDownSelector>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          {viewResults && (
            <Container>
              {" "}
              <Chart data={dataPoints}></Chart>{" "}
            </Container>
          )}
        </Container>
      </div>
    );
  }
}
