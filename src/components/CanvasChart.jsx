import React, { Component } from "react";
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var startTime = 0,
  endTime = 0;
  
class CanvasChart extends Component {
    // componentDidMount() {
    // 	endTime = new Date();
    // 	document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
    // }
  
    render() {
      var limit = 50000;
      var y = 100;
      var data = this.props.selectedData;
      console.log(data);
      const spanStyle = {
        position: "absolute",
        top: "10px",
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#d85757",
        padding: "0px 4px",
        color: "#ffffff",
      };
  
      // data = [];
      // var dataSeries = { type: "line" };
      // var dataPoints = [];
      // for (var i = 0; i < limit; i += 1) {
      //   y += Math.round(Math.random() * 10 - 5);
      //   dataPoints.push({
      //     x: i,
      //     y: y,
      //   });
      // }
      // dataSeries.dataPoints = dataPoints;
      // data.push(dataSeries);
      console.log(data);
      const options = {
        axisX: {
          valueFormatString: "HH:mm:ss",
        },
        zoomEnabled: true,
        animationEnabled: true,
        title: {
          text: this.props.title,
        },
        data: data, // random data
      };
  
      startTime = new Date();
  
      return (
        <div>
          <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          <span id="timeToRender" style={spanStyle}></span>
        </div>
      );
    }
  }
  
  export default CanvasChart;