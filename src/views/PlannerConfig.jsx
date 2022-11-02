import React, { Component } from "react";
import { Card, Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NemGloApi from "../api/NemgloApi";
import AmChart from "../components/AmChart";
import { Audio } from "react-loader-spinner";

import DropDownSelector from "../components/DropDownSelector";

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
      let diff = end.getTime() - start.getTime();
      let diffDays = diff / (1000 * 3600 * 24);
      return diffDays > 7 || diffDays <= 0;
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
    const { startDate, endDate, region } = this.props;
    const config = {
      startDate: startDate,
      endDate: endDate,
      region: region,
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
        tooltip: "Price: ${valueY}",
      },
    ];
    const { formValidated, dataPoints, isMakingApiCall } = this.state;
    return (
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
          {!isMakingApiCall ? (
            <Form
              noValidate
              validated={formValidated}
              onSubmit={this.handleSubmit}
            >
              {dataPoints.length > 0 && (
                <AmChart
                  id="planner"
                  data={dataPoints}
                  seriesSettings={seriesSettings}
                ></AmChart>
              )}

              <DropDownSelector
                id="dispatchIntervalLength"
                label="Dispatch Interval Length"
                value={this.props.dispatchIntervalLength}
                options={[30, 60, 90]}
                setConfigValue={this.props.setConfigValue}
              ></DropDownSelector>

              <Form.Group style={{ paddingBottom: 10 }}>
                <Form.Label
                  style={{
                    textAlign: "text-center text-md-right",
                  }}
                >
                  Start Date
                </Form.Label>
                <Form.Control
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
                  Please select a valid date. Maximum date range is 7 days.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group style={{ paddingBottom: 10 }}>
                <Form.Label
                  style={{
                    textAlign: "text-center text-md-right",
                  }}
                >
                  End Date
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
                  Please select a valid date. Maximum date range is 7 days.
                </Form.Control.Feedback>
              </Form.Group>
              <DropDownSelector
                id="region"
                label="Region"
                value={this.props.region}
                options={regions}
                setConfigValue={this.props.setConfigValue}
              ></DropDownSelector>
              {}
              <Button className="float-end" type="submit" variant={"primary"}>
                Get Market Data
              </Button>
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
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            />
          )}
        </Card.Body>
      </Card>
    );
  }
}
