import React, { Component } from "react";
import { Alert, Container } from "react-bootstrap";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

import NemGloApi from "../api/NemgloApi";
import Footer from "../components/Footer";
import ElectrolyserLoadConfig from "./ElectrolyserLoadConfig";
import PlannerConfig from "./PlannerConfig";
import PPAConf from "./PPAConf";
import ResultsView from "./ResultsView";
import RevenueChartView from "./RevenueChartView";
import SimulationView from "./SimulationView";
import StrategyConfig from "./StrategyConfig";

const secProfiles = ["fixed", "variable"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

export default class SimulationDashboard extends Component {
  constructor() {
    super();
    this.state = {
      config: {
        dispatchIntervalLength: 30,
        startDate: "2021-01-01",
        startTime: "00:00",
        endDate: "2021-01-07",
        endTime: "00:00",
        electrolyserCapacity: 50,
        ppa1StrikePrice: 20,
        ppa1FloorPrice:null,
        ppa1Capacity: 30,
        ppa2StrikePrice: 30,
        ppa2FloorPrice:null, 
        ppa2Capacity: 30,
        ppa2FloorPrice:null,
        duid1: "",
        duid2: "",
        ppa1Data: {},
        ppa2Data: {},
        secProfile: secProfiles[0],
        conversionFactor: 100,
        nominalSec: 60,
        // overload: 0,
        // ratedLoad: 50,
        minStableLoad: 10,
        h2Price: 6,
        technologyType: technologyTypes[0],
        region: regions[0],
      },
      dataPoints: [],
      revenueResults: [],
      viewResults: false,
      resetConfig: false,
      runSimulation: false,
      viewConfig: true,
      resultsLoaded: false,
      runningSimulation: false,
      formValidated: false,
      isLoading: false,
      currentConfig: "plannerConfig",
      marketData: {},
      ppa1Disabled: false,
      ppa2Disabled: true,
    };

    // Bindings go here
    this.setConfigValue = this.setConfigValue.bind(this);
    this.getResultsChartsData = this.getResultsChartsData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isDateInvalid = this.isDateInvalid.bind(this);
    this.setMarketData = this.setMarketData.bind(this);
    this.setPPADisabled = this.setPPADisabled.bind(this);
    this.setPPAData = this.setPPAData.bind(this);
    this.getChart1Settings = this.getChart1Settings.bind(this);
    this.getChart2Settings = this.getChart2Settings.bind(this);
  }

  isMarketDataLoaded = () => {
    return Object.keys(this.state.marketData).length > 0;
  };

  setConfigValue = (id, val) => {
    console.log(id, val);
    const { config } = this.state;
    config[id] = val;
    this.setState({
      config,
    });
  };

  getResultsChartsData = (data) => {
    const { config } = this.state;
    let dataPoints = [];
    let revenueResults = [];
    for (let i = 0; i < data.time.length; i++) {
      let dataPoint = {};
      dataPoint["timestamp"] = data.timestamps[i];
      dataPoint["price"] = data.prices[i];
      if ("ppa1" in data) {
        dataPoint["ppa1"] = data.ppa1.data[i] * config.ppa1Capacity;
      }
      if ("ppa2" in data) {
        dataPoint["ppa2"] = data.ppa2.data[i] * config.ppa2Capacity;
      }
      if (("ppa2" in data) & ("ppa1" in data)) {
        dataPoint["combined"] = data.combined_vre[i];
      }
      dataPoint["load"] = data.optimised_load[i];
      dataPoints.push(dataPoint);
      let revenueResult = {};
      revenueResult["timestamp"] = data.timestamps[i];
      revenueResult["energy"] = data.cost_energy[i];
      revenueResult["h2"] = data.cost_h2[i];
      revenueResult["total"] = data.cost_total[i];
      if ("cost_vre1" in data) {
        revenueResult["vre1"] = data.cost_vre1[i];
      }
      if ("cost_vre2" in data) {
        revenueResult["vre2"] = data.cost_vre2[i];
      }
      revenueResults.push(revenueResult);
    }
    this.setState({ dataPoints, revenueResults });
  };

  viewResults = () => {
    this.setState({ viewResults: true, viewConfig: false });
  };

  viewConfig = () => {
    this.setState({ viewResults: false, viewConfig: true });
  };

  isDateInvalid = () => {
    const { config } = this.state;
    if (config.startDate !== "" && config.endDate !== "") {
      const start = new Date(config.startDate);
      const end = new Date(config.endDate);
      let diff = end.getTime() - start.getTime();
      let diffDays = diff / (1000 * 3600 * 24);
      return diffDays > 7 || diffDays <= 0;
    }
    return config.startDate === "" || config.endDate === "";
  };

  setMarketData = (marketData) => {
    const duid1 = marketData.availgens[0];
    const duid2 = marketData.availgens[1];
    this.setConfigValue("duid1", duid1);
    this.setConfigValue("duid2", duid2);
    this.setState({ marketData, duid1, duid2 });
  };

  setPPAData = (ppaData, PPANum) => {
    const { config } = this.state;
    if (PPANum === "duid1") {
      config.ppa1Data = ppaData;
    } else if (PPANum === "duid2") {
      config.ppa2Data = ppaData;
    }
    this.setState({ config });
  };

  setPPADisabled = (PPANum, isDisabled) => {
    if (PPANum === "duid1") {
      this.setState({ ppa1Disabled: isDisabled });
    } else if (PPANum === "duid2") {
      this.setState({ ppa2Disabled: isDisabled });
    }
  };

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false || this.isDateInvalid()) {
      event.stopPropagation();
    } else {
      this.runSimulation();
    }
    this.setState({ formValidated: true });
  };

  runSimulation = async () => {
    this.setState({ runningSimulation: true, resultsLoaded: false });
    const data = await NemGloApi.runSimulation(
      this.state.config,
      this.state.ppa1Disabled,
      this.state.ppa2Disabled
    );
    if (data === null || data === undefined) {
      alert("Simulation Error");
      this.setState({ runningSimulation: false, resultsLoaded: false });
    } else {
      this.getResultsChartsData(data);
      this.setState({ runningSimulation: false, resultsLoaded: true });
    }
  };

  onSelectView = (id) => {
    let { currentConfig } = this.state;
    currentConfig = id;
    this.setState({
      currentConfig,
    });
  };

  resetConfig = () => {
    this.setState({
      config: {
        dispatchIntervalLength: 30,
        startDate: "2021-01-01",
        startTime: "00:00",
        endDate: "2021-01-07",
        endTime: "00:00",
        electrolyserCapacity: 50,
        ppa1StrikePrice: 20,
        ppa1FloorPrice:null,
        ppa1Capacity: 30,
        ppa2StrikePrice: 30,
        ppa2FloorPrice:null,
        ppa2Capacity: 30,
        duid1: "",
        duid2: "",
        ppa1Data: {},
        ppa2Data: {},
        secProfile: secProfiles[0],
        conversionFactor: 50,
        nominalSec: 6,
        // overload: 0,
        // ratedLoad: 50,
        minStableLoad: 50,
        h2Price: 6,
        technologyType: technologyTypes[0],
        region: regions[0],
      },
      dataPoints: [],
      viewResults: false,
      resetConfig: false,
      runSimulation: false,
      viewConfig: true,
      resultsLoaded: false,
      runningSimulation: false,
      formValidated: false,
      currentConfig: "plannerConfig",
    });
  };

  getChart1Settings = () => {
    let seriesSettings = [
      {
        valueYField: "price",
        tooltip: "Price: ${valueY}/MWh",
        enableYAxis: true,
      },
      {
        valueYField: "combined",
        tooltip: "Combined:  {valueY} MW",
        enableYAxis: true,
      },
      {
        valueYField: "load",
        tooltip: "Load:  {valueY} MW",
        enableYAxis: false,
      },
    ];
    if (!this.props.ppa1Disabled) {
      seriesSettings.push({
        valueYField: "ppa1",
        tooltip: "PPA1:  {valueY} MW",
        enableYAxis: false,
      });
    }
    if (!this.props.ppa2Disabled) {
      seriesSettings.push({
        valueYField: "ppa2",
        tooltip: "PPA2:  {valueY} MW",
        enableYAxis: false,
      });
    }
    return seriesSettings;
  };

  getChart2Settings = () => {
    let seriesSettings = [
      {
        valueYField: "energy",
        tooltip: "Energy: ${valueY}",
        enableYAxis: true,
      },
      {
        valueYField: "h2",
        tooltip: "H2:  ${valueY}",
        enableYAxis: false,
      },
      {
        valueYField: "total",
        tooltip: "Total:  ${valueY}",
        enableYAxis: false,
      },
    ];
    if (!this.props.ppa1Disabled) {
      seriesSettings.push({
        valueYField: "vre1",
        tooltip: "VRE1:  ${valueY}",
        enableYAxis: false,
      });
    }
    if (!this.props.ppa2Disabled) {
      seriesSettings.push({
        valueYField: "vre2",
        tooltip: "VRE2:  ${valueY}",
        enableYAxis: false,
      });
    }
    return seriesSettings;
  };

  render() {
    const {
      config,
      resultsLoaded,
      dataPoints,
      currentConfig,
      marketData,
      ppa1Disabled,
      ppa2Disabled,
      revenueResults,
    } = this.state;
    return (
      <div>
      <div
        className="full-screen-div"
        style={{ display: "flex", background: "#eceff4", minHeight: "100vh", width: "100%"}}
      >
        <Sidebar style={{ borderRight: "None" }}>
          <Menu>
            <SubMenu label="Configure Model">
              <MenuItem
                id="plannerConfig"
                onClick={() => this.onSelectView("plannerConfig")}
              >
                {" "}
                Planner{" "}
              </MenuItem>
              {this.isMarketDataLoaded() && (
                <MenuItem
                  id="electrolyserConfig"
                  onClick={() => this.onSelectView("electrolyserConfig")}
                >
                  {" "}
                  Electrolyser{" "}
                </MenuItem>
              )}

              {this.isMarketDataLoaded() && (
                <MenuItem
                  id="ppa1Config"
                  onClick={() => this.onSelectView("ppa1Config")}
                >
                  {" "}
                  Renewable PPAs{" "}
                </MenuItem>
              )}
              {this.isMarketDataLoaded() && (
                <MenuItem
                  id="strategyConfig"
                  onClick={() => this.onSelectView("strategyConfig")}
                >
                  {" "}
                  Strategy{" "}
                </MenuItem>
              )}
            </SubMenu>
            {this.isMarketDataLoaded() && (
              <MenuItem onClick={() => this.onSelectView("simulationView")}>
                {" "}
                Simulate{" "}
              </MenuItem>
            )}
            <SubMenu label="Results" defaultOpen={true}>
              {resultsLoaded && (
                <MenuItem onClick={() => this.onSelectView("viewChart1")}>
                  {" "}
                  Price & Dispatch{" "}
                </MenuItem>
              )}
              {resultsLoaded && (
                <MenuItem onClick={() => this.onSelectView("viewChart2")}>
                  {" "}
                  View Costings{" "}
                </MenuItem>
              )}
            </SubMenu>

          </Menu>
        </Sidebar>
        <Container
          style={{
            paddingBottom: 20,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Alert variant="danger">NEMGLO Simulator is temporarily suspended. This tool may not be available until 31 Jan</Alert>
          <Alert variant="warning">This is a <b>Beta</b> release of NEMGLO. Some elements may not work as expected. Check back later for a production release!</Alert>
          <Container
            style={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 20 }}
          >
            {currentConfig === "plannerConfig" && (
              <PlannerConfig
                setConfigValue={this.setConfigValue}
                dispatchIntervalLength={config.dispatchIntervalLength}
                startDate={config.startDate}
                startTime={config.startTime}
                endDate={config.endDate}
                endTime={config.endTime}
                region={config.region}
                marketData={marketData}
                setMarketData={this.setMarketData}
              />
            )}
            {currentConfig === "electrolyserConfig" && (
              <ElectrolyserLoadConfig
                setConfigValue={this.setConfigValue}
                technologyType={config.technologyType}
                h2Price={config.h2Price}
                electrolyserCapacity={config.electrolyserCapacity}
                minStableLoad={config.minStableLoad}
                ratedLoad={config.ratedLoad}
                overload={config.overload}
                nominalSec={config.nominalSec}
                conversionFactor={config.conversionFactor}
                secProfile={config.secProfile}
              />
            )}
            {currentConfig === "ppa1Config" && (
              <PPAConf
                config={config}
                marketData={marketData}
                ppa1Disabled={ppa1Disabled}
                ppa2Disabled={ppa2Disabled}
                setConfigValue={this.setConfigValue}
                setPPAData={this.setPPAData}
                setPPADisabled={this.setPPADisabled}
                startDate={config.startDate}
                startTime={config.startTime}
                endDate={config.endDate}
                endTime={config.endTime}
                region={config.region}
                dispatchIntervalLength={config.dispatchIntervalLength}
                electrolyserCapacity={config.electrolyserCapacity}
              />
            )}
            {currentConfig === "strategyConfig" && (
              <StrategyConfig
                setConfigValue={this.setConfigValue}
                recMode={config.recMode}
              />
            )}
            {currentConfig === "simulationView" && (
              <SimulationView
                state={this.state}
                runSimulation={this.runSimulation}
              />
            )}
            {currentConfig === "viewChart1" && (
              <ResultsView
                chart1={dataPoints}
                chartSettings={this.getChart1Settings()}
                title={"Simulation Results"}
              />
            )}
            {currentConfig === "viewChart2" && (
              <RevenueChartView
                chart1={revenueResults}
                chartSettings={this.getChart2Settings()}
                title={"Costs"}
              />
            )}
          </Container>
          <Container style={{
                textAlign: "center"
              }}>
            <p>By using this tool, you agree to abide by and acknowledge the <a href="https://github.com/dec-heim/NEMGLO/blob/main/LICENSE" target="_blank">licence and disclaimer.</a></p>
          </Container>
        </Container>
      </div>
      <Footer></Footer>
      </div>
    );
  }
}
