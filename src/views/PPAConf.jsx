import React, { Component } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NemGloApi from "../api/NemgloApi";
import AmChart from "../components/AmChart";

import DropDownSelector from "../components/DropDownSelector";
import SliderInput from "../components/SliderInput";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Audio } from "react-loader-spinner";
import PPAConfig from "./PPAConfig";

export default class PPAConf extends Component {
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
      isMakingApiCall: false,
    };
    this.setIsDisabled = this.setIsDisabled.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
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
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.getGeneratorData();
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
      config,
      marketData,
    } = this.props;
    const duid1Body = {
      startDate: startDate,
      endDate: endDate,
      region: region,
      dispatchIntervalLength: dispatchIntervalLength,
      duid: config.duid1 === "" ? marketData.availgens[0] : config.duid1,
      ppaCapacity: config.ppa1Capacity,
    };
    const duid2Body = {
      startDate: startDate,
      endDate: endDate,
      region: region,
      dispatchIntervalLength: dispatchIntervalLength,
      duid: config.duid2 === "" ? marketData.availgens[1] : config.duid2,
      ppaCapacity: config.ppa2Capacity,
    };
    this.setState({ isMakingApiCall: true });
    const ppaData1 = await NemGloApi.getGeneratorData(duid1Body);
    const ppaData2 = await NemGloApi.getGeneratorData(duid2Body);
    console.log("making call", ppaData1);
    this.storeDataPoints(ppaData1, ppaData2);
    setPPAData(ppaData1, "duid1");
    setPPAData(ppaData2, "duid2");
    this.setState({ isMakingApiCall: false });
  };

  componentDidMount() {
    console.log(this.props);
    const { startDate, endDate, region, dispatchIntervalLength, config } =
      this.props;
    this.setState({
      startDate,
      endDate,
      region,
      dispatchIntervalLength,
    });
    if (config.ppa1Data !== undefined || config.ppa2Data !== undefined) {
      if (config.ppa1Data.time.length > 0) {
        this.storeDataPoints(config.ppa1Data, config.ppa2Data);
      }
    }
  }

  storeDataPoints = (ppaData1, ppaData2) => {
    const { config, ppa1Disabled, ppa2Disabled } = this.props;
    let dataPoints = [];
    for (let i = 0; i < ppaData1.time.length; i++) {
      let dataPoint = {};
      dataPoint["timestamp"] = ppaData1.timestamps[i];
      //   dataPoint["mw"] = ppaCapacity * ppaData.cf_trace[i];
      if (!ppa1Disabled)
        dataPoint["ppa1"] = config.ppa1Capacity * ppaData1.cf_trace[i];
      if (!ppa2Disabled)
        dataPoint["ppa2"] = config.ppa2Capacity * ppaData2.cf_trace[i];
      dataPoints.push(dataPoint);
    }
    this.setState({ dataPoints });
  };

  setIsDisabled = (value) => {
    const { setPPADisabled, duidId, title } = this.props;
    console.log(title);
    if (!value) {
      setPPADisabled(duidId, true);
    } else {
      setPPADisabled(duidId, false);
    }
  };

  isDisabled = () => {
    return this.state.radioValue === "2";
  };

  render() {
    const seriesSettings = [
      {
        valueYField: "ppa1",
        tooltip: "MW: {valueY}",
      },
      {
        valueYField: "ppa2",
        tooltip: "MW: {valueY}",
      },
    ];
    let {
      setConfigValue,
      title,
      config,
      marketData,
      ppa1Disabled,
      ppa2Disabled,
      setPPADisabled,
      setPPAData,
    } = this.props;
    let { formValidated, dataPoints, isMakingApiCall } = this.state;
    return (
      <Card
        style={{
          paddingTop: 20,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
        }}
      >
        <Card.Title style={{ paddingLeft: 15 }}>
          Power Purchase Agreements
        </Card.Title>
        <Card.Body>
          {!isMakingApiCall ? (
            <div>
              {dataPoints.length > 0 && (
                <AmChart
                  id={"ppa-plot"}
                  data={dataPoints}
                  seriesSettings={seriesSettings}
                ></AmChart>
              )}
              <Container
                style={{
                  paddingTop: 20,
                }}
              >
                <Form
                  noValidate
                  validated={formValidated}
                  onSubmit={this.handleSubmit}
                >
                  <Row className="show-grid">
                    <Col>
                      <PPAConfig
                        title="PPA 1"
                        duidId="duid1"
                        capacityId="ppa1Capacity"
                        strikePriceId="ppa1StrikePrice"
                        setConfigValue={setConfigValue}
                        duid={
                          config.duid1 === ""
                            ? marketData.availgens[0]
                            : config.duid1
                        }
                        ppaCapacity={config.ppa1Capacity}
                        ppaStrikePrice={config.ppa1StrikePrice}
                        marketData={marketData}
                        otherPPADuid={config.duid2}
                        isDisabled={ppa1Disabled}
                        setPPADisabled={setPPADisabled}
                        availableGens={marketData.availgens}
                        startDate={config.startDate}
                        endDate={config.endDate}
                        region={config.region}
                        dispatchIntervalLength={config.dispatchIntervalLength}
                        ppaData={config.ppa1Data}
                        setPPAData={setPPAData}
                      />
                    </Col>
                    <Col>
                      <PPAConfig
                        title="PPA 2"
                        duidId="duid2"
                        capacityId="ppa2Capacity"
                        strikePriceId="ppa2StrikePrice"
                        setConfigValue={setConfigValue}
                        duid={
                          config.duid2 === ""
                            ? marketData.availgens[1]
                            : config.duid2
                        }
                        ppaCapacity={config.ppa2Capacity}
                        ppaStrikePrice={config.ppa2StrikePrice}
                        marketData={marketData}
                        otherPPADuid={config.duid1}
                        isDisabled={ppa2Disabled}
                        setPPADisabled={setPPADisabled}
                        availableGens={marketData.availgens}
                        startDate={config.startDate}
                        endDate={config.endDate}
                        region={config.region}
                        dispatchIntervalLength={config.dispatchIntervalLength}
                        ppaData={config.ppa2Data}
                        setPPAData={setPPAData}
                      />
                    </Col>
                  </Row>
                  <Container style={{ height: 10 }}></Container>
                  {ppa1Disabled && ppa2Disabled ? (
                    <Button className="float-end" variant={"secondary"}>
                      Get Renewables Data
                    </Button>
                  ) : (
                    <Button
                      className="float-end"
                      type="submit"
                      variant={"primary"}
                    >
                      Get Renewables Data
                    </Button>
                  )}
                </Form>
              </Container>
            </div>
          ) : (
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
        </Card.Body>
      </Card>
    );
  }
}
