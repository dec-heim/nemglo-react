import axios from "axios";
import config from "../config.json";

const runPreloadMarket = async (simConfig) => {
  try {
    const body = {
      market_data: {
        start_date: simConfig.startDate,
        end_date: simConfig.endDate,
        region: simConfig.region,
        dispatch_interval_length: simConfig.dispatchIntervalLength,
      },
    };

    const reponse = await axios.post(`${config.api}/get-market-data`, body);
    return reponse.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const runSimulation = async (simConfig) => {
  try {
    const body = {
      market_data: {
        start_date: simConfig.startDate,
        end_date: simConfig.endDate,
        region: simConfig.region,
        dispatch_interval_length: simConfig.dispatchIntervalLength,
      },
      ppa_1: {
        duid:simConfig.duid1,
        capacity: simConfig.ppa1Capacity,
        strike_price: simConfig.ppa1StrikePrice,
      },
      ppa_2: {
        duid: simConfig.duid2,
        capacity: simConfig.ppa2Capacity,
        strike_price: simConfig.ppa2StrikePrice,
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

    const reponse = await axios.post(`${config.api}/get-data`, body);
    return reponse.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};



export default {
    runPreloadMarket,
    runSimulation
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