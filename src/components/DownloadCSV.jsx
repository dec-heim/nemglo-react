import React from "react";
import { CSVDownload, CSVLink } from "react-csv";

export default function DownloadCSV({ data, filename }) {
  return <CSVLink data={data} filename={filename}>Download CSV</CSVLink>;
}
