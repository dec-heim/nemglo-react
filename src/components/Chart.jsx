import React, { useEffect, Component } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import moment from "moment/moment";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import RegularInput from "./RegularInput";

export default class Chart extends Component {
  constructor() {
    super();
    this.state = {
      startIndex: 0,
      endIndex: 100,
      selectedDataPoints: []
    };
    this.setConfigVal = this.setConfigVal.bind(this);
    this.setStartIndex = this.setStartIndex.bind(this);
    this.setEndIndex = this.setEndIndex.bind(this);
  }

  setRange() {
    const { startIndex, endIndex } = this.state;
    let selectedDataPoints = this.props.data.slice(startIndex, endIndex);
    this.setState({ selectedDataPoints });
  }

  componentDidMount() {
    // Runs after the first render() lifecycle
    this.setRange();
  }



  setStartIndex(id, index) {
    const { endIndex } = this.state;
    if (index <= endIndex && index < this.props.data.length) {
      this.setConfigVal(id, index);
    }
  }

  setEndIndex(id, index) {
    const { startIndex } = this.state;
    if (index >= startIndex && index < this.props.data.length) {
      this.setConfigVal(id, index);
    }
  }

  setConfigVal(id, val) {
    this.setState({
      [id]: val,
    });
  }

  render() {
    const { startIndex, endIndex, selectedDataPoints } = this.state;
    return (
      <Container>
        <Col>
          <Stack direction="horizontal" gap={4}>
            <RegularInput
              id="startIndex"
              label="Start"
              type="number"
              value={startIndex}
              setConfigValue={this.setStartIndex}
            ></RegularInput>
            <RegularInput
              id="endIndex"
              label="End"
              type="number"
              value={endIndex}
              setConfigValue={this.setEndIndex}
            ></RegularInput>
            <Container style={{  paddingTop: 20 }}>
              {" "}
              <Button variant={"primary"} onClick={() => this.setRange()}>
                {" "}
                Adjust Range
              </Button>
            </Container>
          </Stack>
          <ResponsiveContainer height={500}>
      
            <LineChart data={selectedDataPoints}>
              <XAxis
                dataKey="time"
                angle={60}
                textAnchor="start"
                height={100}
                width={100}
                tickFormatter={(unixTime) => {
                  return moment(unixTime).format("ddd MM h:mm");
                }}
                label={{ value: 'Time', angle: 0, position: 'insideBottom' }}
              />
              <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="ppa1" stroke="#8884d8" />
              <Line type="monotone" dataKey="ppa2" stroke="#82ca9d" />
              <Line type="monotone" dataKey="price" stroke="#173F5F" />
              <Line type="monotone" dataKey="combined" stroke="#F6D55C" />
              <Line type="monotone" dataKey="optimised" stroke="#ED553B" />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Container>
    );
  }
}
