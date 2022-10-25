import React, { Component, useState } from "react";
import { Card, Container } from "react-bootstrap";

import DropDownSelector from "../components/DropDownSelector";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const secProfiles = ["fixed", "variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

export default class PPAConfig extends Component {

  constructor() {
    super();
    this.state = {
      marketData: null,
      formValidated: false,
      dataPoints: [],
      radioValue: '1', 
      radios: [
        { name: 'Active', value: '1' },
        { name: 'Disabled', value: '2' },
      ]
    };
    this.setIsDisabled = this.setIsDisabled.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  componentDidMount() {
    let radioValue = this.props.isDisabled ? '2' : '1';
    this.setState({ radioValue });
  }

  setIsDisabled = (value) => {
    const {setPPADisabled, duidId} = this.props;
      if (value === '1') {
        setPPADisabled(duidId, false);
      } else {
        setPPADisabled(duidId, true);
      }
      this.setState({ radioValue: value });
  }


  isDisabled = () => {
    return this.state.radioValue === '2';
  }


render () {
  const {duidId, capacityId, strikePriceId,  setConfigValue, duid, isDisabled, ppaStrikePrice, title, ppaCapacity} = this.props;
  return (
    <Card>
      <Card.Header  style={{
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
      }}>
   <ButtonGroup className="float-end">
      {this.state.radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant={idx % 2 ? 'outline-danger' : 'outline-success'}
          name="radio"
          value={radio.value}
          checked={this.state.radioValue === radio.value}
          onChange={(e) => this.setIsDisabled(e.currentTarget.value)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
      </Card.Header>
      <Card.Title style={{ paddingLeft: 15, paddingTop: 15 }}>{title}</Card.Title>
      <Card.Body>
        <DropDownSelector
          id={duidId}
          label="DUID (Unit)"
          options={duids}
          setConfigValue={setConfigValue}
          value={duid}
          disabled={isDisabled}
        ></DropDownSelector>
        <SliderInput
          id={capacityId}
          label="Capacity (MW)"
          setConfigValue={setConfigValue}
          value={ppaCapacity}
          max={100}
          disabled={isDisabled}
        ></SliderInput>
        <SliderInput
          id={strikePriceId}
          label="PPA Strike ($/MWh)"
          setConfigValue={setConfigValue}
          value={ppaStrikePrice}
          max={100}
          disabled={isDisabled}
        ></SliderInput>
      </Card.Body>
    </Card>
);
}
 
}

// Add Togggle switch
