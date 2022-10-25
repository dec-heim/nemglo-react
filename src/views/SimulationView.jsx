import React, { Component } from "react";
import { Card, Container, Button } from "react-bootstrap";

const secProfiles = ["fixed", "variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

// dispatchIntervalLength: 30,
// startDate: "",
// startTime: "",
// endDate: "",
// endTime: "",
// electrolyserCapacity: 50,
// ppa1StrikePrice: 20,
// ppa1Capacity: 30,
// ppa2StrikePrice: 30,
// ppa2Capacity: 30,
// duid1: duids[0],
// duid2: duids[0],
// secProfile: secProfiles[0],
// conversionFactor: 50,
// nominalSec: 6,
// // overload: 0,
// // ratedLoad: 50,
// minStableLoad: 50,
// h2Price: 6,
// technologyType: technologyTypes[0],
// region: regions[0],
export default function SimulationView(props) {
  let { config, ppa1Disabled, ppa2Disabled } = props.state;
  return (
    <Card
    // style={{
    //   paddingTop: 20,
    //   paddingBottom: 10,
    //   paddingLeft: 5,
    //   paddingRight: 5,
    // }}
    >
      <Card.Header>Perform Simulation</Card.Header>
      <Card.Body>
        <Card.Title style={{ paddingBottom: 10 }}>Market Data</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Dispatch Interval: {config.dispatchIntervalLength}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Start Date: {config.startDate}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          End Date: {config.endDate}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Region: {config.region}
        </Card.Subtitle>
        <Card.Title style={{ paddingBottom: 10, paddingTop: 10 }}>
          Electrolyser Load
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Technology Type: {config.technologyType}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          H2 Price ($/kh): {config.h2Price}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Capacity (MW): {config.electrolyserCapacity}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Minimum Stable Load: {config.minStableLoad}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Nominal SEC (KWH/kg): {config.nominalSec}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Conversion Factor (%): {config.conversionFactor}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          SEC Profile: {config.secProfile}
        </Card.Subtitle>
        {!ppa1Disabled && (
          <div>
            <Card.Title style={{ paddingBottom: 10, paddingTop: 10 }}>
              PPA 1
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              DUID (Unit): {config.duid1}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              PPA Strike ($/MWh): {config.ppa1StrikePrice}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Capacity (MW): {config.ppa1Capacity}
            </Card.Subtitle>
          </div>
        )}
        {!ppa2Disabled && (
          <div>
            <Card.Title style={{ paddingBottom: 10, paddingTop: 10 }}>
              PPA 2
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              DUID (Unit): {config.duid2}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              PPA Strike ($/MWh): {config.ppa2StrikePrice}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Capacity (MW): {config.ppa2Capacity}
            </Card.Subtitle>
          </div>
        )}
        <br></br>
        <Button  variant={"primary"}>Run Simulation</Button>{" "}
        <Button  variant={"danger"} onClick={() => window.location.reload(false)}>Reset Model Config</Button>
      </Card.Body>
    </Card>
  );
}
