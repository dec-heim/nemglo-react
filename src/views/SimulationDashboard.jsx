import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NemGloApi from "../api/NemgloApi";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ElectrolyserLoadConfig from "./ElectrolyserLoadConfig";
import PPAConfig from "./PPAConfig";
import PlannerConfig from "./PlannerConfig";
import SimulationView from "./SimulationView";
import ResultsView from "./ResultsView";

const secProfiles = ["fixed", "variable"];
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
        duid1: "",
        duid2: "",
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
      isLoading: false,
      currentConfig: "plannerConfig",
      marketData: {},
      ppa1Disabled: false,
      ppa2Disabled: false,
    };

    // Bindings go here
    this.setConfigValue = this.setConfigValue.bind(this);
    this.getReChartsData = this.getReChartsData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isDateInvalid = this.isDateInvalid.bind(this);
    this.setMarketData = this.setMarketData.bind(this);
    this.setPPADisabled = this.setPPADisabled.bind(this);
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
    console.log(dataPoints);
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
    this.setState({ marketData });
  };

  setPPADisabled = (PPANum, isDisabled) => {
    console.log(PPANum, isDisabled);
    if (PPANum === "duid1") {
      this.setState({ ppa1Disabled: isDisabled });
    } else if (PPANum === "duid2") {
      this.setState({ ppa2Disabled: isDisabled });
    }
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
    const data = await NemGloApi.runSimulation(
      this.state.config,
      this.state.ppa1Disabled,
      this.state.ppa2Disabled
    );
    if (data === null || data === undefined) {
      alert("Simulation Error");
      this.setState({ runningSimulation: false, resultsLoaded: false });
    } else {
      this.getReChartsData(data);
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
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        electrolyserCapacity: 50,
        ppa1StrikePrice: 20,
        ppa1Capacity: 30,
        ppa2StrikePrice: 30,
        ppa2Capacity: 30,
        duid1: "",
        duid2: "",
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
      marketData,
      ppa1Disabled,
      ppa2Disabled,
    } = this.state;
    console.log(marketData);
    return (
      <div style={{ display: "flex", height: "100vh", background: "#eceff4" }}>
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
                  Renewable PPA 1{" "}
                </MenuItem>
              )}
              {this.isMarketDataLoaded() && (
                <MenuItem
                  id="ppa2Config"
                  onClick={() => this.onSelectView("ppa2Config")}
                >
                  {" "}
                  Renewable PPA 2{" "}
                </MenuItem>
              )}
            </SubMenu>
            {this.isMarketDataLoaded() && (
              <MenuItem onClick={() => this.onSelectView("simulationView")}>
                {" "}
                Simulate{" "}
              </MenuItem>
            )}
            {resultsLoaded && (
              <MenuItem onClick={() => this.onSelectView("resultsView")}>
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
              <PPAConfig
                title="PPA 1"
                duidId="duid1"
                capacityId="ppa1Capacity"
                strikePriceId="ppa1StrikePrice"
                setConfigValue={this.setConfigValue}
                duid={config.duid1 === "" ? marketData.availgens[0] : config.duid1}
                ppaCapacity={config.ppa1Capacity}
                ppaStrikePrice={config.ppa1StrikePrice}
                marketData={marketData}
                otherPPADuid={config.duid2}
                isDisabled={ppa1Disabled}
                setPPADisabled={this.setPPADisabled}
                availableGens={marketData.availgens}
              />
            )}
            {currentConfig === "ppa2Config" && (
              <PPAConfig
                title="PPA 2"
                duidId="duid2"
                capacityId="ppa2Capacity"
                strikePriceId="ppa2StrikePrice"
                setConfigValue={this.setConfigValue}
                duid={config.duid2 === "" ? marketData.availgens[1] : config.duid2}
                ppaCapacity={config.ppa2Capacity}
                ppaStrikePrice={config.ppa2StrikePrice}
                marketData={marketData}
                otherPPADuid={config.duid1}
                isDisabled={ppa2Disabled}
                setPPADisabled={this.setPPADisabled}
                availableGens={marketData.availgens}
              />
            )}
            {currentConfig === "simulationView" && (
              <SimulationView
                state={this.state}
                runSimulation={this.runSimulation}
              />
            )}
            {currentConfig === "resultsView" && (
              <ResultsView chart1={dataPoints} />
            )}
          </Container>
        </Container>
      </div>
    );
  }
}
