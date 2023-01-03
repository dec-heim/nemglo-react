import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Audio } from "react-loader-spinner";

import NemGloApi from "../api/NemgloApi";
import MarketDataChart from "../components/charts/MarketDataChart";
import DropDownSelector from "../components/DropDownSelector";
import HelpToolTip from "../components/HelpToolTip";

const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];

export default class PlannerConfig extends Component {
  constructor() {
    super();
    this.state = {
      marketData: null,
      formValidated: false,
      dataPoints: [],
      isMakingApiCall: false,
    };
    this.isDateInvalid = this.isDateInvalid.bind(this);
    this.getMarketData = this.getMarketData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.storeDataPoints = this.storeDataPoints.bind(this);
  }

  componentDidMount() {
    if (this.props.marketData !== {}) {
      if ("prices" in this.props.marketData) {
        if (this.props.marketData.prices.length > 0) {
          this.storeDataPoints(this.props.marketData);
        }
      }
    }
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.getMarketData();
    }
    this.setState({ formValidated: true });
  };

  isDateInvalid = () => {
    const { startDate, endDate } = this.props;
    console.log("checkingDate", startDate, endDate);
    if (startDate !== "" && endDate !== "") {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const earliest = new Date("2018-01-01T00:00:00.000+10:00")
      const curr = new Date()//.toISOString().slice(0, 10);

      // Date not earlier than defined param
      if (start < earliest) {
        return true;
      }
      // Date not later than two months prior curr
      if (end.getTime() > curr.getTime() - (1000 * 3600 * 24 * 30 * 2)) {
        return true;
      }
      let diff = end.getTime() - start.getTime();
      let diffDays = diff / (1000 * 3600 * 24);
      // Date range longer than 7 days or invalid
      if (diffDays > 7 || diffDays <= 0 || isNaN(diffDays))  {
        return true;
      } else {
        return false;
      }
    }
    if (startDate !== "" && endDate === "") {
      return true;
    }
    if (startDate === "" && endDate !== "") {
      return true;
    }
    return false;
  };

  getMarketData = async () => {
    this.setState({ dataPoints: [] });
    const { startDate, endDate, region, dispatchIntervalLength, startTime, endTime } = this.props;
    const config = {
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      region: region,
      dispatch_interval_length: dispatchIntervalLength,
    };
    this.setState({ isMakingApiCall: true });
    const marketData = await NemGloApi.getMarketData(config);
    this.setState({ isMakingApiCall: false });
    this.storeDataPoints(marketData);
    this.props.setMarketData(marketData);
    this.setState({ marketData });
  };

  storeDataPoints = (marketData) => {
    let dataPoints = [];
    for (let i = 0; i < marketData.time.length; i++) {
      let dataPoint = {};
      dataPoint["timestamp"] = marketData.timestamps[i];
      dataPoint["price"] = marketData.prices[i];
      dataPoints.push(dataPoint);
    }
    this.setState({ dataPoints });
  };

  render() {
    const seriesSettings = [
      {
        valueYField: "price",
        tooltip: "Price: ${valueY.formatNumber('#.00')}",
      },
    ];
    const { formValidated, dataPoints, isMakingApiCall } = this.state;
    return (
      <Col>
        <Card
          style={{
            paddingTop: 20,
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 5,
          }}
        >
          <Card.Title style={{ paddingLeft: 15 }}>Market Data</Card.Title>

          <Card.Body>
            {dataPoints.length > 0 && (
              <div>
                <MarketDataChart
                  id="planner-plot"
                  data={dataPoints}
                  seriesSettings={seriesSettings}
                  baseInterval={{
                    timeUnit: "minute",
                    count: this.props.dispatchIntervalLength,
                  }}
                ></MarketDataChart>
              </div>
            )}
            {!isMakingApiCall ? (
              <Form
                noValidate
                validated={formValidated}
                onSubmit={this.handleSubmit}
              >
                <Row>
                  <Col>
                    <DropDownSelector
                      id="dispatchIntervalLength"
                      label="Dispatch Interval Length"
                      description="The time resolution (minutes) between simulated load dispatch intervals. NEM input data is aggregated to this length."
                      value={this.props.dispatchIntervalLength}
                      options={[5, 30, 60]}
                      setConfigValue={this.props.setConfigValue}
                    ></DropDownSelector>

                    <Form.Group style={{ paddingBottom: 10 }}>
                      <Form.Label
                        style={{
                          textAlign: "text-center text-md-right",
                        }}
                      >
                        Start Time
                        <HelpToolTip
                          description={"Time to commence simulation."}
                        ></HelpToolTip>
                      </Form.Label>
                      <Form.Control
                        required
                        id="startTime"
                        type="time"
                        onChange={(e) =>
                          this.props.setConfigValue("startTime", e.target.value)
                        }
                        value={this.props.startTime}
                        isInvalid={this.isDateInvalid()}
                      />
                      <Container style={{ paddingBottom: 10 }}></Container>
                      <Form.Label
                        style={{
                          textAlign: "text-center text-md-right",
                        }}
                      >
                        Start Date
                        <HelpToolTip
                          description={
                            "Date to commence simulation. Time commences by default from 00:00 but all intervals are reported as time-ending."
                          }
                        ></HelpToolTip>
                      </Form.Label>
                      <Form.Control
                        style={{ paddingBottom: 10 }}
                        required
                        id="startDate"
                        type="date"
                        format="dd/MM/yyyy"
                        onChange={(e) =>
                          this.props.setConfigValue("startDate", e.target.value)
                        }
                        value={this.props.startDate}
                        isInvalid={this.isDateInvalid()}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a valid date. Earliest date supported is 01/01/2018. Maximum date range is 7
                        days.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <DropDownSelector
                      id="region"
                      label="Region"
                      description="The NEM region for which input data is sourced and the simulation is run in."
                      value={this.props.region}
                      options={regions}
                      setConfigValue={this.props.setConfigValue}
                    ></DropDownSelector>

                    <Form.Group style={{ paddingBottom: 10 }}>
                      <Form.Label
                        style={{
                          textAlign: "text-center text-md-right",
                        }}
                      >
                        End Time
                        <HelpToolTip
                          description={
                            "Date to commence simulation. Time commences by default from 00:00 but all intervals are reported as time-ending."
                          }
                        ></HelpToolTip>
                      </Form.Label>

                      <Form.Control
                        required
                        id="endTime"
                        type="time"
                        onChange={(e) =>
                          this.props.setConfigValue("endTime", e.target.value)
                        }
                        value={this.props.endTime}
                        isInvalid={this.isDateInvalid()}
                      />
                      <Container style={{ paddingBottom: 10 }}></Container>

                      <Form.Label
                        style={{
                          textAlign: "text-center text-md-right",
                        }}
                      >
                        End Date
                        <HelpToolTip
                          description={
                            "Date to end simulation. Time ends by default at 00:00"
                          }
                        ></HelpToolTip>
                      </Form.Label>
                      <Form.Control
                        required
                        id="endDate"
                        type="date"
                        format="dd/MM/yyyy"
                        onChange={(e) =>
                          this.props.setConfigValue("endDate", e.target.value)
                        }
                        value={this.props.endDate}
                        isInvalid={this.isDateInvalid()}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a valid date. Latest date supported is 2 months prior today. Maximum date range is 7
                        days.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Container style={{ height: 10 }}></Container>
                {this.isDateInvalid() && (
                  <Button
                    className="float-end"
                    type="submit"
                    variant={"secondary"}
                    disabled={this.isDateInvalid()}
                  >
                    Get Market Data
                  </Button>
                )}
                {!this.isDateInvalid() && (
                  <Button
                    className="float-end"
                    type="submit"
                    variant={"primary"}
                    disabled={this.isDateInvalid()}
                  >
                    Get Market Data
                  </Button>
                )}
              </Form>
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
      </Col>
    );
  }
}
