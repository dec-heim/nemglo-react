import React, { useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";
import moment from "moment/moment";

export default function Chart(props) {
  console.log(props.data);
  return (
    <ResponsiveContainer height={500}>
      <LineChart data={props.data}>
        <XAxis
          dataKey="time"
          // domain={["auto", "auto", "auto"]}
          // name="time"
          tickFormatter={(unixTime) => moment(unixTime).format("DD/MM")}
          // type="number"
        />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="ppa1" stroke="#8884d8" />
        <Line type="monotone" dataKey="ppa2" stroke="#82ca9d" />
        <Line type="monotone" dataKey="price" stroke="#173F5F" />
        <Line type="monotone" dataKey="combined" stroke="#F6D55C" />
        <Line type="monotone" dataKey="optimised" stroke="#ED553B" />
      </LineChart>
    </ResponsiveContainer>
  );
}
