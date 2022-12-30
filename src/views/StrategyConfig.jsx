import React, { useState } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";

import DropDownSelector from "../components/DropDownSelector";
import SliderInputOptional from "../components/SliderInputOptional";
import SwitchInputOptional from "../components/SwitchInputOptional";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";
import ToggleButton from "react-bootstrap/ToggleButton";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

export default function StrategyConfig(props) {
  return (
    <Card
      style={{
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <Card.Title style={{ paddingLeft: 15 }}>
        <Alert variant="dark" style={{paddingLeft: 50, textAlign: "center", fontSize: "15px"}}>
          New features coming soon...
        </Alert>
        Operating Strategy
      </Card.Title>
      <Card.Body>
        <Row>
          <Col>
            <Card>
              <Card.Title style={{ paddingLeft: 15, paddingTop: 15 }}>
                Renewable Energy Certificates (RECs)
                <ToggleButton style={{'marginRight': '1rem'}}
                  className="mb-2 float-end"
                  id={"recMode"}
                  type="checkbox"
                  variant={"secondary"}
                  checked={false}
                  disabled={true}
                  value="1"
                >
                  {"Disabled"}
                </ToggleButton>
              </Card.Title>
              <Card.Body>
              <div>
                  <DropDownSelector
                    id={"recMode"}
                    label="Accounting Method"
                    description="This determines how the optimiser should consider RECs and its influence on load operating behaviour. The former option ensures load operation is completely covered by RECs collected over the entire simulation. The latter ensures sufficient RECs are collected per dispatch interval."
                    options={["[Aggregate] Acquire and Surrender RECs in Aggregate", "[Temporal] Temporally Match Operation to RECs via PPAs"]}
                    setConfigValue={props.setConfigValue}
                    value={props.recMode}
                    disabled={true}
                  ></DropDownSelector>
                  <SliderInputOptional
                    id={"recMarketPrice"}
                    label="REC Spot Price ($/MWh)"
                    description="If enabled a REC spot market facilitates the ability for the load to buy or sell surplus RECs at the given price."
                    setConfigValue={props.setConfigValue}
                    value={props.recMarketPrice}
                    max={200}
                    min={0}
                    disabled={true}
                  ></SliderInputOptional>
                  <Row>
                    <Col>
                      <SwitchInputOptional
                        id={"recMarketPrice"}
                        setConfigValue={props.setConfigValue}
                        value={"Allow Buying RECs"}
                        disabled={true}
                      ></SwitchInputOptional>
                    </Col>
                    <Col>
                      <SwitchInputOptional
                        id={"recMarketPrice"}
                        setConfigValue={props.setConfigValue}
                        value={"Allow Selling RECs"}
                        disabled={true}
                      ></SwitchInputOptional>
                    </Col>
                  </Row>
                  {/*<SliderInput
                    id={strikePriceId}
                    label="PPA Strike ($/MWh)"
                    description="."
                    setConfigValue={setConfigValue}
                    value={ppaStrikePrice}
                    max={100}
                    disabled={isDisabled}
                  ></SliderInput> */}
              </div>
              </Card.Body>
            </Card>

            {/* <RegularInput
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
            ></SliderInput> */}
          
          </Col>
          <Col>
          <Card>
              <Card.Title style={{ paddingLeft: 15, paddingTop: 15 }}>
                Emissions
                <ToggleButton style={{'marginRight': '1rem'}}
                  className="mb-2 float-end"
                  id={"emissionsMode"}
                  type="checkbox"
                  variant={"secondary"}
                  checked={false}
                  disabled={true}
                  value="1"
                >
                  {"Disabled"}
                </ToggleButton>
              </Card.Title>
              <Card.Body>
              <div>
                <DropDownSelector
                  id={"emissionsMode"}
                  label="Grid Emissions Trace"
                  description="The emissions data type considered. Navigate to the 'Planner' page to change this setting and load a new data trace."
                  options={["Average", "Marginal"]}
                  setConfigValue={props.setConfigValue}
                  value={props.emissionsMode}
                  disabled={true}
                ></DropDownSelector>
                <Tab.Container className="flex">
                  <Nav variant="pills" className="justify-content-center text-center" defaultActiveKey="none">
                    <Nav.Item style={{width: '50%'}}>
                      <Nav.Link eventKey="price" disabled={false}>Shadow Carbon Price</Nav.Link> {/*active={false}*/}
                    </Nav.Item>
                    <Nav.Item style={{width: '50%'}}>
                      <Nav.Link eventKey="constraint" disabled={false}>Emissions Constraint</Nav.Link>
                    </Nav.Item>
                    <Nav.Item><Nav.Link eventKey="none"></Nav.Link></Nav.Item>
                  </Nav>
                  <Row>
                    <Tab.Content>
                      <Tab.Pane eventKey="price">
                        <SliderInput
                          id={"co2Price"}
                          label="Shadow Carbon Price ($/tCO2-e)"
                          description="A shadow price for carbon applied to energy sourced from the spot market which is in excess of the traded energy received under the PPA structures. The shadow price therefore only applies to a proportion of total energy consumed when the contracted plant is generating."
                          setConfigValue={props.setConfigValue}
                          value={props.co2Price}
                          max={500}
                          disabled={true}
                        ></SliderInput>
                      </Tab.Pane>
                      <Tab.Pane eventKey="constraint">
                        <SliderInput
                          id={"co2Constraint"}
                          label="Carbon Intensity of H2 (tCO2-e/tH2)"
                          description="Apply a constraint on the carbon content intensity of produced hydrogen. This reflects only the carbon intensity of energy consumed from the spot market in excess of traded energy received under PPA structures. This constraint also applies on aggregate over the entire simulation window, not per interval."
                          setConfigValue={props.setConfigValue}
                          value={props.co2Price}
                          max={10}
                          step={0.01}
                          disabled={true}
                        ></SliderInput>
                      </Tab.Pane>
                      <Tab.Pane eventKey="none">
                      </Tab.Pane>
                    </Tab.Content>
                  </Row>
                </Tab.Container>


{/* 
                <Tabs
                  id="tabsEmissions"
                  className="mb-3"
                  fill
                  defaultActiveKey="shadowPrice"
                  activeKey="shadowPrice"
                  >
                  <Tab
                    eventkey="shadowPrice"
                    title="Shadow Price">
                      <Tab.Pane eventkey="shadowPrice">
                      <h1>aa</h1>
                      </Tab.Pane>
                    
                  </Tab>
                  <Tab
                    eventkey="EmissionsConstraint"
                    title="Constraint">
                      <p>my text</p>
                  </Tab>
                </Tabs> */}
                  {/* <DropDownSelector
                    id={recModeId}
                    label="DUID (Unit)"
                    description="."
                    options={["Acquire and Surrender on Total", "Temporally Match"]}
                    setConfigValue={setConfigValue}
                    value={recMode}
                    disabled={isDisabled}
                  ></DropDownSelector> */}
                  {/* <SliderInput
                    id={capacityId}
                    label="Capacity (MW)"
                    description="."
                    setConfigValue={setCapacity}
                    value={ppaCapacity}
                    max={100}
                    disabled={isDisabled}
                  ></SliderInput>
                  <SliderInput
                    id={strikePriceId}
                    label="PPA Strike ($/MWh)"
                    description="."
                    setConfigValue={setConfigValue}
                    value={ppaStrikePrice}
                    max={100}
                    disabled={isDisabled}
                  ></SliderInput> */}
              </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>

  );
}
