import React, { Component, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NemGloApi from "../api/NemgloApi";

import DropDownSelector from "../components/DropDownSelector";
import RegularInput from "../components/RegularInput";
import SliderInput from "../components/SliderInput";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];

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
    // this.getMarketData = this.getMarketData.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.storeDataPoints = this.storeDataPoints.bind(this);
  }

  componentDidMount() {
    let radioValue = this.props.isDisabled ? '2' : '1';
    this.setState({ radioValue });
    // if (this.props.marketData !== {}) {
    //   if ("prices" in this.props.marketData) {
    //     if (this.props.marketData.prices.length > 0) {
    //       this.storeDataPoints(this.props.marketData);
    //     }
    //   }
    // }
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.getGeneratorData(); // NEED TO CONSIDER EITHER PPA 1 OR 2
    }
    this.setState({ formValidated: true });
  };

  // isDateInvalid = () => {
  //   const { startDate, endDate } = this.props;
  //   console.log("checkingDate", startDate, endDate);
  //   if (startDate !== "" && endDate !== "") {
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);
  //     let diff = end.getTime() - start.getTime();
  //     let diffDays = diff / (1000 * 3600 * 24);
  //     return diffDays > 7 || diffDays <= 0;
  //   }
  //   if (startDate !== "" && endDate === "") {
  //     return true;
  //   }
  //   if (startDate === "" && endDate !== "") {
  //     return true;
  //   }
  //   return false;
  // };

  getGeneratorData = async () => {
    this.setState({dataPoints : []});
    const { startDate, endDate, region } = this.props;
    const config = {
      startDate: startDate,
      endDate: endDate,
      region: region,
    };
    const marketData = await NemGloApi.getMarketData(config); // NEED TO CONSIDER EITHER PPA 1 OR 2
    this.storeDataPoints(marketData);
    this.props.setMarketData(marketData);
    this.setState({ marketData });
  };

  // storeDataPoints = (marketData) => {
  //   let dataPoints = [];
  //   for (let i = 0; i < marketData.time.length; i++) {
  //     let dataPoint = {};
  //     dataPoint["timestamp"] = marketData.timestamps[i];
  //     dataPoint["price"] = marketData.prices[i];
  //     dataPoints.push(dataPoint);
  //   }
  //   this.setState({dataPoints});
  // }

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
  let {duidId, capacityId, strikePriceId,  setConfigValue, duid, isDisabled, ppaStrikePrice, title, ppaCapacity, availableGens, otherPPADuid} = this.props;
  let filteredOptions = availableGens.filter(item => item !== otherPPADuid);
  const { formValidated, dataPoints } = this.state;
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
        <Form
              noValidate
              validated={formValidated}
              onSubmit={this.handleSubmit}
        >
          <DropDownSelector
            id={duidId}
            label="DUID (Unit)"
            options={filteredOptions}
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
          <Button className="float-end" type="submit" variant={"primary"}>
              Get Renewables Data
          </Button>
        </Form>
      </Card.Body>
    </Card>
);
}
 
}

// Add Togggle switch
