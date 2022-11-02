import React, { Component, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NemGloApi from "../api/NemgloApi";
import AmChart from "../components/AmChart";

import DropDownSelector from "../components/DropDownSelector";
import SliderInput from "../components/SliderInput";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Audio } from "react-loader-spinner";


export default class PPAConfig extends Component {
  constructor() {
    super();
    this.state = {
      marketData: null,
      formValidated: false,
      startDate: "",
      endDate: "",
      region: "",
      dispatchIntervalLength: 0,
      dataPoints: [],
      radioValue: "1",
      radios: [
        { name: "Active", value: "1" },
        { name: "Disabled", value: "2" },
      ],
      isMakingApiCall: false,

    };
    this.setIsDisabled = this.setIsDisabled.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.setCapacity = this.setCapacity.bind(this);
  }

  setCapacity(id, capacity) {
    const { setConfigValue, ppaData } = this.props;
    setConfigValue(id, capacity);
    if (
      "cf_trace" in ppaData
    ) {
      if (this.props.ppaData.time.length > 0) {
        this.storeDataPoints(this.props.ppaData);
      }
    }
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

  getGeneratorData = async () => {
    this.setState({ dataPoints: [] });
    const {
      startDate,
      endDate,
      region,
      dispatchIntervalLength,
      duid,
      ppaCapacity,
      duidId,
      setPPAData,
    } = this.props;
    const config = {
      startDate: startDate,
      endDate: endDate,
      region: region,
      dispatchIntervalLength: dispatchIntervalLength,
      duid: duid,
      ppaCapacity: ppaCapacity,
    };
    this.setState({ isMakingApiCall: true });
    const ppaData = await NemGloApi.getGeneratorData(config);
    this.setState({ isMakingApiCall: false });
    this.storeDataPoints(ppaData);
    setPPAData(ppaData, duidId);
  };

  componentDidMount() {
    const { startDate, endDate, region, dispatchIntervalLength, isDisabled } =
      this.props;
    let radioValue = isDisabled ? "2" : "1";
    this.setState({
      radioValue,
      startDate,
      endDate,
      region,
      dispatchIntervalLength,
    });
    if (this.props.ppaData !== {}) {
      if (
        "mw_trace" in this.props.ppaData &&
        "cf_trace" in this.props.ppaData
      ) {
        if (this.props.ppaData.time.length > 0) {
          this.storeDataPoints(this.props.ppaData);
        }
      }
    }
  }

  storeDataPoints = (ppaData) => {
    const { ppaCapacity } = this.props;
    console.log(ppaCapacity)
    let dataPoints = [];
    for (let i = 0; i < ppaData.time.length; i++) {
      let dataPoint = {};
      dataPoint["timestamp"] = ppaData.timestamps[i];
      dataPoint["mw"] = ppaCapacity * ppaData.cf_trace[i];
      dataPoints.push(dataPoint);
    }
    this.setState({ dataPoints });
  };

  setIsDisabled = (value) => {
    const { setPPADisabled, duidId } = this.props;
    if (value === "1") {
      setPPADisabled(duidId, false);
    } else {
      setPPADisabled(duidId, true);
    }
    this.setState({ radioValue: value });
  };

  isDisabled = () => {
    return this.state.radioValue === "2";
  };

  render() {
    const seriesSettings = [
      {
        valueYField: "mw",
        tooltip: "MW: {valueY}",
      },
    ];
    let {
      duidId,
      capacityId,
      strikePriceId,
      setConfigValue,
      duid,
      isDisabled,
      ppaStrikePrice,
      title,
      ppaCapacity,
      availableGens,
      otherPPADuid,
    } = this.props;
    let filteredOptions = availableGens.filter((item) => item !== otherPPADuid);
    const { formValidated, dataPoints, isMakingApiCall } = this.state;
    return (
      <Card>
        <Card.Header
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <ButtonGroup className="float-end">
            {this.state.radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-danger" : "outline-success"}
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
        <Card.Title style={{ paddingLeft: 15, paddingTop: 15 }}>
          {title}
        </Card.Title>
        <Card.Body>
        {!isMakingApiCall ? 
          <div>
        {dataPoints.length > 0 && (
            <AmChart
              id={duid}
              data={dataPoints}
              seriesSettings={seriesSettings}
            ></AmChart>
          )}
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
              setConfigValue={this.setCapacity}
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
          </div>
          : <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            }} /> }
        </Card.Body>
      </Card>
    );
  }
}
