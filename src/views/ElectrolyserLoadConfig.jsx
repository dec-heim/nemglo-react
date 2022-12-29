import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import DropDownSelector from "../components/DropDownSelector";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";

const PEM_TYPE = "PEM";
const AE_TYPE = "AE";
const CUSTOM_TYPE = "CUSTOM";

const SEC_PROFILES = ["fixed", "variable"];
const TECHNOLOGY_TYPES = [PEM_TYPE, AE_TYPE, CUSTOM_TYPE];

const PEM_PROFILE = {
  nominalSec: 10,
  conversionFactor: 10,
  secProfile: SEC_PROFILES[0],
};

const AE_PROFILE = {
  nominalSec: 20,
  conversionFactor: 50,
  secProfile: SEC_PROFILES[1],
};

export default function ElectrolyserLoadConfig({
  setConfigValue,
  technologyType,
  nominalSec,
  conversionFactor,
  secProfile,
  h2Price,
  electrolyserCapacity,
  minStableLoad,
}) {
  const [isCustomType, setCustomType] = useState(false);

  const setTechnologyType = (id, technologyType) => {
    var validTypeSelected = true;
    console.log(id, technologyType);
    switch (technologyType) {
      case PEM_TYPE:
        setCustomType(false);
        console.log("PEM selected");
        break;
      case AE_TYPE:
        setCustomType(false);
        console.log("AE selected");
        break;
      case CUSTOM_TYPE:
        setCustomType(true);
        console.log("CUSTOM selected");
        break;
      default:
        console.warn("INVALID TECHNOLOGY TYPE SELECTED");
        validTypeSelected = false;
    }
    if (validTypeSelected) {
      setConfigValue(id, technologyType);
    }
  };

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
        <Row>
          <Col>
            <DropDownSelector
              id="technologyType"
              label="Technology Type"
              description="Default values are configured by selecting a technology. Choose CUSTOM to enter your own values."
              options={TECHNOLOGY_TYPES}
              setConfigValue={setTechnologyType}
              value={technologyType}
            ></DropDownSelector>
            <RegularInput
              id="nominalSec"
              label="Nominal SEC (kWh/kg)"
              description="The Specific Energy Consumption of the electrolyser used to compute the produced hydrogen mass from the electrical energy consumed."
              placeholder={50}
              setConfigValue={setConfigValue}
              value={nominalSec}
              type="number"
              readOnly={!isCustomType}
            ></RegularInput>
            <RegularInput
              id="conversionFactor"
              label="Conversion Factor (%)"
              description="An efficiency factor applied to the above SEC should this prior value consider only the electrolyser stack and not balance of plant."
              placeholder={100}
              setConfigValue={setConfigValue}
              value={conversionFactor}
              type="number"
              readOnly={!isCustomType}
            ></RegularInput>
            <DropDownSelector
              id="secProfile"
              label="SEC Profile"
              description="The assumed profile of the SEC input. Refer to use guide for 'variable SEC'. If 'variable' the assumed SEC changes dependent on the load operating point."
              options={SEC_PROFILES}
              setConfigValue={setConfigValue}
              value={secProfile}
              disabled={!isCustomType}
            ></DropDownSelector>
          </Col>
          <Col>
            <SliderInput
              id="h2Price"
              label="H2 Price ($/kg)"
              description="The production benefit ('sales') price for each kg of hydrogen."
              setConfigValue={setConfigValue}
              value={h2Price}
              max={20}
            ></SliderInput>
            <SliderInput
              id="electrolyserCapacity"
              label="Capacity (MW)"
              description="The desired nominal capacity and rated load value of the electrolyser."
              setConfigValue={setConfigValue}
              value={electrolyserCapacity}
              max={100}
            ></SliderInput>
            <SliderInput
              id="minStableLoad"
              label="Minimum Stable Load"
              description="The lowest possible operating point of the load in MW."
              setConfigValue={setConfigValue}
              value={minStableLoad}
              max={60}
            ></SliderInput>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
