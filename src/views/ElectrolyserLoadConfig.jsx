import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import DropDownSelector from "../components/DropDownSelector";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";

// STATIC VARIABLES
const PEM_TYPE = "PEM";
const AE_TYPE = "AE";
const CUSTOM_TYPE = "CUSTOM";
const SEC_PROFILES = ["fixed", "variable"];
const TECHNOLOGY_TYPES = [PEM_TYPE, AE_TYPE, CUSTOM_TYPE];
const PEM_PROFILE = {
  nominalSec: 10,
  conversionFactor: 10,
  minStableLoadFactor: 0.2
};
const AE_PROFILE = {
  nominalSec: 50,
  conversionFactor: 100,
  minStableLoadFactor: 0.4
};
const NOMINAL_SEC_PLACEHOLDER = 50;
const CONVERSION_PLACEHOLDER = 100;
const MAX_H2_PRICE = 20;
const MAX_CAPACITY = 200;
const MAX_MIN_STABLE_LOAD = 60;


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
  const [isCustomTechType, setCustomTechType] = useState(false);

  const setTechnologyType = (id, technologyType) => {
    switch (technologyType) {
      case PEM_TYPE:
        setCustomTechType(false);
        setConfigValue("nominalSec", PEM_PROFILE.nominalSec);
        setConfigValue("conversionFactor", PEM_PROFILE.conversionFactor);
        setConfigValue("minStableLoad", PEM_PROFILE.minStableLoadFactor * electrolyserCapacity);
        break;
      case AE_TYPE:
        setCustomTechType(false);
        setConfigValue("nominalSec", AE_PROFILE.nominalSec);
        setConfigValue("conversionFactor", AE_PROFILE.conversionFactor);
        setConfigValue("minStableLoad", AE_PROFILE.minStableLoadFactor * electrolyserCapacity);
        break;
      case CUSTOM_TYPE:
        setCustomTechType(true);
        break;
      default:
        console.warn("INVALID TECHNOLOGY TYPE SELECTED");
    }
    setConfigValue(id, technologyType);
  };

  const getMaxMinStableLoad = () => {

  }


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
              placeholder={NOMINAL_SEC_PLACEHOLDER}
              setConfigValue={setConfigValue}
              value={nominalSec
              }
              type="number"
              readOnly={!isCustomTechType}
            ></RegularInput>
            <RegularInput
              id="conversionFactor"
              label="Conversion Factor (%)"
              description="An efficiency factor applied to the above SEC should this prior value consider only the electrolyser stack and not balance of plant."
              placeholder={CONVERSION_PLACEHOLDER}
              setConfigValue={setConfigValue}
              value={conversionFactor
              }
              type="number"
              readOnly={!isCustomTechType}
            ></RegularInput>
            <SliderInput
              id="minStableLoad"
              label="Minimum Stable Load"
              description="The lowest possible operating point of the load in MW."
              setConfigValue={setConfigValue}
              value={minStableLoad}
              max={isCustomTechType ? 0.7 * electrolyserCapacity : minStableLoad }
              disabled={!isCustomTechType}
            ></SliderInput>
           
          </Col>
          <Col>
            <SliderInput
              id="h2Price"
              label="H2 Price ($/kg)"
              description="The production benefit ('sales') price for each kg of hydrogen."
              setConfigValue={setConfigValue}
              value={h2Price}
              max={MAX_H2_PRICE}
            ></SliderInput>
            <SliderInput
              id="electrolyserCapacity"
              label="Capacity (MW)"
              description="The desired nominal capacity and rated load value of the electrolyser."
              setConfigValue={setConfigValue}
              value={electrolyserCapacity}
              max={MAX_CAPACITY}
            ></SliderInput>
             <DropDownSelector
              id="secProfile"
              label="SEC Profile"
              description="The assumed profile of the SEC input. Refer to use guide for 'variable SEC'. If 'variable' the assumed SEC changes dependent on the load operating point."
              options={SEC_PROFILES}
              setConfigValue={setConfigValue}
              value={secProfile
              }
              disabled={false}
            ></DropDownSelector>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}