import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";

import DropDownSelector from "../components/DropDownSelector";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";

const secProfiles = ["fixed", "variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

export default function PPA1Config(props) {
  return (
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
            setConfigValue={props.setConfigValue}
            value={props.duid1}
          ></DropDownSelector>
          <SliderInput
            id="ppa1Capacity"
            label="Capacity (MW)"
            setConfigValue={props.setConfigValue}
            value={props.ppa1Capacity}
            max={100}
          ></SliderInput>
          <SliderInput
            id="ppa1StrikePrice"
            label="PPA Strike ($/MWh)"
            setConfigValue={props.setConfigValue}
            value={props.ppa1StrikePrice}
            max={100}
          ></SliderInput>
        </Card.Body>
      </Card>
  );
}