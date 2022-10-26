import axios from "axios";
import config from "../config.json";

const getMarketData = async (marketConfig) => {
  try {
    const body = {
      market_data: {
        start_date: marketConfig.startDate,
        end_date: marketConfig.endDate,
        region: marketConfig.region
      }
    }
    const reponse = await axios.post(`${config.api}/get-market-data`, body);
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
    getMarketData
}



// Example body
// const body = {
//     market_data: {
//       start_date: "2020-1-10",
//       end_date: "2020-1-17",
//       region: "NSW1",
//       dispatch_interval_length: 30,
//     },
//     ppa_1: {
//       duid: "BLOWERNG",
//       capacity: 100,
//       strike_price: 40,
//     },
//     ppa_2: {
//       duid: "BERYLSF1",
//       capacity: 100,
//       strike_price: 40,
//     },
//     electrolyser_load: {
//       technology_type: "PEM",
//       h2_price: 6,
//       capacity: 100,
//       min_stable_load: 50,
//       rated_load: 50,
//       overload: 50,
//       nominal_sec: 6,
//       conversion_factor: 50,
//       sec_profile: "fixed",
//     },
//   };