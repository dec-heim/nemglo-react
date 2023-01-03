import axios from "axios";
import config from "../config.json";

const getMarketData = async (marketConfig) => {
  try {
    const body = {
      market_data: {
        start_date: marketConfig.startDate,
        end_date: marketConfig.endDate,
        start_time: marketConfig.startTime,
        end_time: marketConfig.endTime,
        region: marketConfig.region,
        dispatch_interval_length: marketConfig.dispatch_interval_length
      }
    }
    const reponse = await axios.post(`${config.api}/get-market-data`, body);
    return reponse.data;
  } catch(err) {
    console.log(err);
    return null;
  }
}

const getGeneratorData = async (simConfig) => {
  try {
    const body = {
      market_data: {
        start_date: simConfig.startDate,
        end_date: simConfig.endDate,
        region: simConfig.region,
        dispatch_interval_length: simConfig.dispatchIntervalLength,
      },
      ppa: {
        duid: simConfig.duid,
        capacity: simConfig.ppaCapacity,
        strike_price: simConfig.ppaStrikePrice,
        floor_price: simConfig.ppaFloorPrice
      }
    }
    const reponse = await axios.post(`${config.api}/get-generator-data`, body);
    return reponse.data;
  } catch(err) {
    console.log(err);
    return null;
  }
}

const getGeneratorData_ppa1 = async (simConfig) => {
  try {
    const body = {
      market_data: {
        start_date: simConfig.startDate,
        end_date: simConfig.endDate,
        region: simConfig.region,
        dispatch_interval_length: simConfig.dispatchIntervalLength
      },
      ppa_1: {
        duid:simConfig.duid1,
        capacity: simConfig.ppa1Capacity
      }
    }
    const reponse = await axios.post(`${config.api}/get-generator-data`, body);
    return reponse.data;
  } catch(err) {
    console.log(err);
    return null;
  }
}

const getGeneratorData_ppa2 = async (simConfig) => {
  try {
    const body = {
      market_data: {
        start_date: simConfig.startDate,
        end_date: simConfig.endDate,
        region: simConfig.region,
        dispatch_interval_length: simConfig.dispatchIntervalLength
      },
      ppa_2: {
        duid:simConfig.duid2,
        capacity: simConfig.ppa2Capacity
      }
    }
    const reponse = await axios.post(`${config.api}/get-generator-data`, body);
    return reponse.data;
  } catch(err) {
    console.log(err);
    return null;
  }
}

const runSimulation = async (simConfig, ppa1Disabled, ppa2Disabled) => {
  try {
    let body = {
      market_data: {
        start_date: simConfig.startDate,
        end_date: simConfig.endDate,
        region: simConfig.region,
        dispatch_interval_length: simConfig.dispatchIntervalLength,
      },
      electrolyser_load: {
        technology_type: simConfig.technologyType,
        h2_price: simConfig.h2Price,
        capacity: simConfig.electrolyserCapacity,
        min_stable_load: simConfig.minStableLoad,
        rated_load: simConfig.ratedLoad,
        overload: simConfig.overload,
        nominal_sec: simConfig.secProfile,
        conversion_factor: simConfig.conversionFactor,
        sec_profile: simConfig.secProfile,
      },
    };

    if (!ppa1Disabled) {
      body['ppa_1'] = {
        duid:simConfig.duid1,
        capacity: simConfig.ppa1Capacity,
        strike_price: simConfig.ppa1StrikePrice,
      }
    }
    if (!ppa2Disabled) {
      body['ppa_2'] = {
        duid:simConfig.duid2,
        capacity: simConfig.ppa2Capacity,
        strike_price: simConfig.ppa2StrikePrice,
      }
    }


    const reponse = await axios.post(`${config.api}/get-data`, body);
    return reponse.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


export default {
    runSimulation,
    getMarketData,
    getGeneratorData_ppa1,
    getGeneratorData_ppa2, 
    getGeneratorData
}
