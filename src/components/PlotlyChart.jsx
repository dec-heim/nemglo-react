import React, { Component } from "react";
import Plot from "react-plotly.js";

import data from "../data/response.json";

class PlotlyChart extends Component {
  constructor() {
    super();
    this.state = {};
    this.getSeriesData = this.getSeriesData.bind(this);
  }

  getSeriesData = () => {
    let dataPoints = [];
    let optimised = [];
    let x = [];
    for (let i = 0; i < data.time.length; i++) {
      optimised.push(100);
      x.push(i + 1);
    }

    dataPoints.push(
      {
        // prices
        x: x,
        y: data.prices,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "red" },
      },
      {
        // ppa 1
        x: x,
        y: data.ppa1.data,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "purple" },
      },
      {
        // ppa 2
        x: x,
        y: data.ppa2.data,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "orange" },
      },
      {
        // combined vre
        x: x,
        y: data.combined_vre.data,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "blue" },
      },

      {
        // optimised
        x: x,
        y: optimised,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "green" },
      }
    );
    return dataPoints;
  };

  render() {
    // const data = this.getSeriesData();
    const data = this.props.data;
    return (
      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   height: "60vh",
        // }}
      >
        <Plot
          data={data}
          layout={{ width: window.innerWidth * 0.95, title: "Optimisation" }}
        />
      </div>
    );
  }
}

export default PlotlyChart;
