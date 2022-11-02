import React, { Component } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

class AmChart extends Component {
  constructor() {
    super();
    this.state = {};
    this.createAxisAndSeries = this.createAxisAndSeries.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  createAxisAndSeries = (
    chart,
    xAxis,
    data,
    valueYField,
    root,
    opposite,
    tooltip
  ) => {
    let yRenderer = am5xy.AxisRendererY.new(root, {
      opposite: opposite,
    });
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: yRenderer,
      })
    );

    if (chart.yAxes.indexOf(yAxis) > 0) {
      yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
    }

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: valueYField,
        valueXField: "timestamp",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: tooltip,
        }),
      })
    );

    //series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
    series.strokes.template.setAll({ strokeWidth: 1 });

    yRenderer.grid.template.set("strokeOpacity", 0.05);
    yRenderer.labels.template.set("fill", series.get("fill"));
    yRenderer.setAll({
      stroke: series.get("fill"),
      strokeOpacity: 1,
      opacity: 1,
    });

    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd",
      dateFields: ["timestamp"],
    });

    series.data.setAll(data);
  };

  updateChart = () => {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root.dom.id == "chartdiv") {
        root.dispose();
      }
    });

    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: false,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        layout: root.verticalLayout,
      })
    );

    let easing = am5.ease.linear;
    chart.get("colors").set("step", 3);
    // Create axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "minute",
          count: 5,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Define data

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    // add scrollbar
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );
    let data = this.props.data; // valueYField, tooltip
    const {seriesSettings} = this.props;
    for (let i = 0; i < seriesSettings.length; i++) {
      let seriesSetting = seriesSettings[i];
      let opposite = i % 2 == 0 ? true : false;
      this.createAxisAndSeries(      chart,
        xAxis,
        data,
        seriesSetting.valueYField,
        root,
        opposite,
        seriesSetting.tooltip)
    }

    let legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: "valueYField",
        centerX: am5.percent(50),
        x: am5.percent(50),
      })
    );
    legend.data.setAll(chart.series.values);
  };

  componentDidMount() {
    this.updateChart();
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }

  render() {
    const {id} = this.props;
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }
}

export default AmChart;
