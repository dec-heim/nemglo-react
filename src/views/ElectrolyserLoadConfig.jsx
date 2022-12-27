import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";

import DropDownSelector from "../components/DropDownSelector";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";

const secProfiles = ["fixed", "variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

// Remove overload, rated load

export default function ElectrolyserLoadConfig(props) {
  return (
    <Card
      style={{
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <Card.Title style={{ paddingLeft: 15 }}>Electrolyser Load</Card.Title>
      <Card.Body>
        <DropDownSelector
          id="technologyType"
          label="Technology Type"
          description="Default values are configured by selecting a technology. Choose CUSTOM to enter your own values."
          options={technologyTypes}
          setConfigValue={props.setConfigValue}
          value={props.technologyType}
        ></DropDownSelector>
        <SliderInput
          id="h2Price"
          label="H2 Price ($/kg)"
          description="The production benefit ('sales') price for each kg of hydrogen."
          setConfigValue={props.setConfigValue}
          value={props.h2Price}
          max={20}
        ></SliderInput>
        <SliderInput
          id="electrolyserCapacity"
          label="Capacity (MW)"
          description="The desired nominal capacity and rated load value of the electrolyser."
          setConfigValue={props.setConfigValue}
          value={props.electrolyserCapacity}
          max={100}
        ></SliderInput>
        <Container style={{ height: 50 }}></Container>
        <SliderInput
          id="minStableLoad"
          label="Minimum Stable Load"
          description="The lowest possible operating point of the load in MW."
          setConfigValue={props.setConfigValue}
          value={props.minStableLoad}
          max={60}
        ></SliderInput>
        {/* <SliderInput
              id="ratedLoad"
              label="Rated Load (MW)"
              setConfigValue={props.setConfigValue}
              value={props.ratedLoad}
              max={100}
            ></SliderInput> */}
        {/* <SliderInput
              id="overload"
              label="Overload (MW)"
              setConfigValue={props.setConfigValue}
              value={props.overload}
              max={100}
            ></SliderInput> */}
        <Container style={{ height: 50 }}></Container>
        <RegularInput
          id="nominalSec"
          label="Nominal SEC (kWh/kg)"
          description="The Specific Energy Consumption of the electrolyser used to compute the produced hydrogen mass from the electrical energy consumed."
          placeholder={50}
          setConfigValue={props.setConfigValue}
          value={props.nominalSec}
          type="number"
        ></RegularInput>
        <RegularInput
          id="conversionFactor"
          label="Conversion Factor (%)"
          description="An efficiency factor applied to the above SEC should this prior value consider only the electrolyser stack and not balance of plant."
          placeholder={100}
          setConfigValue={props.setConfigValue}
          value={props.conversionFactor}
          type="number"
        ></RegularInput>
        <DropDownSelector
          id="secProfile"
          label="SEC Profile"
          description="The assumed profile of the SEC input. Refer to use guide for 'variable SEC'. If 'variable' the assumed SEC changes dependent on the load operating point."
          options={secProfiles}
          setConfigValue={props.setConfigValue}
          value={props.secProfile}
        ></DropDownSelector>
      </Card.Body>
    </Card>
  );
}
