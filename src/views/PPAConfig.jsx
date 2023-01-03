import React, { Component, useState } from "react";
import { Card, InputGroup } from "react-bootstrap";
import Switch from "react-bootstrap-switch";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Audio } from "react-loader-spinner";

import NemGloApi from "../api/NemgloApi";
import AmChart from "../components/charts/MarketDataChart";
import DropDownSelector from "../components/DropDownSelector";
import PPA1Chart from "../components/PPA1Chart";
import SliderInput from "../components/SliderInput";
import SliderInputOptional from "../components/SliderInputOptional";

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
    this.setCapacity = this.setCapacity.bind(this);
  }

  setCapacity(id, capacity) {
    const { setConfigValue, ppaData } = this.props;
    setConfigValue(id, capacity);
    if ("cf_trace" in ppaData) {
      if (this.props.ppaData.time.length > 0) {
        this.storeDataPoints(this.props.ppaData);
      }
    }
  }

  handleSubmit = (event) => {
    console.log(this.props.isDisabled);
    if (!this.props.isDisabled) {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        this.getGeneratorData();
      }
      this.setState({ formValidated: true });
    }
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
      ppaStrikePrice,
      ppaFloorPrice,
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
      ppaStrikePrice: ppaStrikePrice,
      ppaFloorPrice: ppaFloorPrice
    };
    console.log("ppaconfig.jsx")
    console.log(config)
    this.setState({ isMakingApiCall: true });
    const ppaData = await NemGloApi.getGeneratorData(config);
    this.setState({ isMakingApiCall: false });
    this.storeDataPoints(ppaData);
    setPPAData(ppaData, duidId);
  };

  componentDidMount() {
    // console.log(this.props);
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
    const { setPPADisabled, duidId, title } = this.props;
    console.log(title, value);
    if (!value) {
      setPPADisabled(duidId, true);
    } else {
      setPPADisabled(duidId, false);
    }
  };

  render() {
    let {
      duidId,
      capacityId,
      strikePriceId,
      floorPriceId,
      setConfigValue,
      duid,
      isDisabled,
      ppaStrikePrice,
      ppaFloorPrice,
      title,
      ppaCapacity,
      availableGens,
      otherPPADuid,
      electrolyserCapacity,
    } = this.props;
    let filteredOptions = availableGens.filter((item) => item !== otherPPADuid);
    const { formValidated } = this.state;
    const { setCapacity } = this.props;
    return (
      <Card>
        <Card.Title style={{ paddingLeft: 15, paddingTop: 15 }}>
          {title}
          <ToggleButton style={{'marginRight': '1rem'}}
                className="mb-2 float-end"
                id={duidId}
                type="checkbox"
                variant={!isDisabled ? "outline-primary" : "secondary"}
                checked={!isDisabled}
                value="1"
                onChange={(e) => this.setIsDisabled(e.currentTarget.checked)}
              >
                {isDisabled ? "Disabled" : "Enabled"}
              </ToggleButton>
        </Card.Title>
        <Card.Body>
          <div>
            <Form
              noValidate
              validated={formValidated}
              // onSubmit={this.handleSubmit}
            >
              <DropDownSelector
                id={duidId}
                label="DUID (Unit)"
                description="The desired solar or wind generator for which its historical trace is considered in a PPA contract. Units available reflect the region selected on the Planner page."
                options={filteredOptions}
                setConfigValue={setConfigValue}
                value={duid}
                disabled={isDisabled}
              ></DropDownSelector>
              <SliderInput
                id={capacityId}
                label="Capacity (MW)"
                description="The desired scaled nominal capacity of the unit trace selected."
                setConfigValue={setCapacity}
                value={ppaCapacity}
                disabled={isDisabled}
                max={3 * electrolyserCapacity}
              ></SliderInput>
              <SliderInput
                id={strikePriceId}
                label="PPA Strike ($/MWh)"
                description="The Power Purchase Agreement strike price at which the variable volume contract for difference is settled."
                setConfigValue={setConfigValue}
                value={ppaStrikePrice}
                disabled={isDisabled}
                max={3 * electrolyserCapacity}
              ></SliderInput>
              <SliderInputOptional // Floor price input needs to be configurable as optional field, if unchecked (disabled) api call should be None.
              // Probably could do without the slider for floor input, just have the numerical field input?
                id={floorPriceId}
                label="Floor Price ($/MWh)"
                setConfigValue={setConfigValue}
                value={ppaFloorPrice}
                max={10} // Value range for floor price should be say -100 (min) to 0 (max)
                min={-100}
                disabled={isDisabled}
              ></SliderInputOptional>
            </Form>
          </div>
        </Card.Body>
      </Card>
      
    );
  }
}