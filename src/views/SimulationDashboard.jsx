import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NemGloApi from "../api/NemgloApi";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ElectrolyserLoadConfig from "./ElectrolyserLoadConfig";
import PPA1Config from "./PPA1Config";
import PPA2Config from "./PPA2Config";
import PlannerConfig from "./PlannerConfig";
import SimulationView from "./SimulationView";
import ResultsView from "./ResultsView";

const secProfiles = ["fixed", "variable"];
const duids = ["BERYLSF1", "BERYLSF2", "BLOWERNG"];
const regions = ["NSW1", "QLD1", "VIC1", "SA1", "TAS1"];
const technologyTypes = ["PEM", "AE"];

export default class SimulationDashboard extends Component {
  constructor() {
    super();
    this.state = {
      config: {
        dispatchIntervalLength: 30,
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        electrolyserCapacity: 50,
        ppa1StrikePrice: 20,
        ppa1Capacity: 30,
        ppa2StrikePrice: 30,
        ppa2Capacity: 30,
        duid1: duids[0],
        duid2: duids[0],
        secProfile: secProfiles[0],
        conversionFactor: 50,
        nominalSec: 6,
        overload: 0,
        ratedLoad: 50,
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
      isLoading: false,
      currentConfig: "plannerConfig",
      marketData: []
    };

    // Bindings go here
    this.setConfigValue = this.setConfigValue.bind(this);
    this.getReChartsData = this.getReChartsData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isDateInvalid = this.isDateInvalid.bind(this);
    this.setMarketData = this.setMarketData.bind(this);

  }

  setConfigValue = (id, val) => {
    console.log(id, val);
    const { config } = this.state;
    config[id] = val;
    this.setState({
      config,
    });
  };

  getReChartsData = (data) => {
    let dataPoints = [];
    for (let i = 0; i < data.time.length; i++) {
      let dataPoint = {};
      dataPoint["timestamp"] = data.timestamps[i];
      dataPoint["price"] = data.prices[i];
      dataPoint["ppa1"] = data.ppa1.data[i];
      dataPoint["ppa2"] = data.ppa2.data[i];
      dataPoint["combined"] = data.combined_vre[i];
      dataPoint["optimised"] = data.optimised_load[i];
      dataPoints.push(dataPoint);
    }
    this.setState({ dataPoints });
    console.log(dataPoints)
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

  setMarketData =  (marketData) => {
    this.setState({ marketData });
  };


  handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity());
    event.preventDefault();
    console.log(this.isDateInvalid());
    if (form.checkValidity() === false || this.isDateInvalid()) {
      event.stopPropagation();
    } else {
      this.runSimulation();
    }
    this.setState({ formValidated: true });
  };

  runSimulation = async () => {
    this.setState({ runningSimulation: true, resultsLoaded: false });
    const data = await NemGloApi.runSimulation(this.state.config);
    if (data === null || data === undefined) {
      alert("Simulation Error");
      this.setState({ runningSimulation: false, resultsLoaded: false });
    } else {
      this.getReChartsData(data);
      this.setState({ runningSimulation: false, resultsLoaded: true });
    }
  };

  onSelectModelConfig = (id) => {
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
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        electrolyserCapacity: 50,
        ppa1StrikePrice: 20,
        ppa1Capacity: 30,
        ppa2StrikePrice: 30,
        ppa2Capacity: 30,
        duid1: duids[0],
        duid2: duids[0],
        secProfile: secProfiles[0],
        conversionFactor: 50,
        nominalSec: 6,
        overload: 0,
        ratedLoad: 50,
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

  getCurrentConfig = () => {
    const { currentConfig, config } = this.state;
    switch (currentConfig) {
      case "plannerConfig":
        return (
          <PlannerConfig
            setConfigValue={this.setConfigValue}
            dispatchIntervalLength={config.dispatchIntervalLength}
            startDate={config.startDate}
            endDate={config.endDate}
            region={config.region}
          />
        );
      case "electrolyserConfig":
        return (
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
        );
      case "ppa1Config":
        return (
          <PPA1Config
            setConfigValue={this.setConfigValue}
            duid1={config.duid1}
            ppa1Capacity={config.ppa1Capacity}
            ppa1StrikePrice={config.ppa1StrikePrice}
          />
        );
      case "ppa2Config":
        return (
          <PPA2Config
            setConfigValue={this.setConfigValue}
            duid2={config.duid2}
            ppa2Capacity={config.ppa2Capacity}
            ppa2StrikePrice={config.ppa2StrikePrice}
          />
        );
      case "simulationView":
        return <SimulationView />;
      // case "emissionsConfig":
      //   return "bar";
      default:
        return "foo";
    }
  };

  render() {
    const {
      config,
      runningSimulation,
      resultsLoaded,
      viewConfig,
      viewResults,
      dataPoints,
      formValidated,
      isLoading,
      currentConfig,
      marketData
    } = this.state;
    return (
      <div style={{ display: "flex", height: "100vh", background: "#eceff4" }}>
        <Sidebar style={{ borderRight: "None" }}>
          <Menu>
            <SubMenu label="Configure Model">
              <MenuItem
                id="plannerConfig"
                onClick={() => this.onSelectModelConfig("plannerConfig")}
              >
                {" "}
                Planner{" "}
              </MenuItem>
              <MenuItem
                id="electrolyserConfig"
                onClick={() => this.onSelectModelConfig("electrolyserConfig")}
              >
                {" "}
                Electrolyser{" "}
              </MenuItem>
              <MenuItem
                id="ppa1Config"
                onClick={() => this.onSelectModelConfig("ppa1Config")}
              >
                {" "}
                Renewable PPA 1{" "}
              </MenuItem>
              <MenuItem
                id="ppa2Config"
                onClick={() => this.onSelectModelConfig("ppa2Config")}
              >
                {" "}
                Renewable PPA 2{" "}
              </MenuItem>
            </SubMenu>
            <MenuItem
              onClick={() => this.onSelectModelConfig("simulationView")}
            >
              {" "}
              Simulate{" "}
            </MenuItem>
            {resultsLoaded && (
              <MenuItem onClick={() => this.onSelectModelConfig("resultsView")}>
                {" "}
                Results{" "}
              </MenuItem>
            )}

            <MenuItem> About </MenuItem>
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
          {/* <Form
            noValidate
            validated={formValidated}
            onSubmit={this.handleSubmit}
          > */}
            <Container style={{ paddingLeft: 5, paddingRight: 5 }}>
              {currentConfig === "plannerConfig" && (
                <PlannerConfig
                  setConfigValue={this.setConfigValue}
                  dispatchIntervalLength={config.dispatchIntervalLength}
                  startDate={config.startDate}
                  endDate={config.endDate}
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
                <PPA1Config
                  setConfigValue={this.setConfigValue}
                  duid1={config.duid1}
                  ppa1Capacity={config.ppa1Capacity}
                  ppa1StrikePrice={config.ppa1StrikePrice}
                />
              )}
              {currentConfig === "ppa2Config" && (
                <PPA2Config
                  setConfigValue={this.setConfigValue}
                  duid2={config.duid2}
                  ppa2Capacity={config.ppa2Capacity}
                  ppa2StrikePrice={config.ppa2StrikePrice}
                />
              )}
              {currentConfig === "simulationView" && <SimulationView />}
              {currentConfig === "resultsView" && <ResultsView chart1={dataPoints}/>}
            </Container>
          {/* </Form> */}
        </Container>
      </div>
    );
  }
}
