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
          options={technologyTypes}
          setConfigValue={props.setConfigValue}
          value={props.technologyType}
        ></DropDownSelector>
        <SliderInput
          id="h2Price"
          label="H2 Price ($/kh)"
          setConfigValue={props.setConfigValue}
          value={props.h2Price}
          max={100}
        ></SliderInput>
        <SliderInput
          id="electrolyserCapacity"
          label="Capacity (MW)"
          setConfigValue={props.setConfigValue}
          value={props.electrolyserCapacity}
          max={100}
        ></SliderInput>
        <Container style={{ height: 50 }}></Container>
        <SliderInput
          id="minStableLoad"
          label="Minimum Stable Load"
          setConfigValue={props.setConfigValue}
          value={props.minStableLoad}
          max={100}
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
          label="Nominal SEC (KWH/kg)"
          placeholder={50}
          setConfigValue={props.setConfigValue}
          value={props.nominalSec}
          type="number"
        ></RegularInput>
        <RegularInput
          id="conversionFactor"
          label="Conversion Factor (%)"
          placeholder={50}
          setConfigValue={props.setConfigValue}
          value={props.conversionFactor}
          type="number"
        ></RegularInput>
        <DropDownSelector
          id="secProfile"
          label="SEC Profile"
          options={secProfiles}
          setConfigValue={props.setConfigValue}
          value={props.secProfile}
        ></DropDownSelector>
      </Card.Body>
    </Card>
  );
}
