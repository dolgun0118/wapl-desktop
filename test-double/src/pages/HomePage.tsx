import React from "react";
import { markdown } from "../markdown/Home.md";
import LineChartComponent from "../LineChart/LineChartComponent";
import Markdown from "react-markdown";

const HomePage = () => {
  return (
    <>
      <Markdown>{markdown}</Markdown>
      <LineChartComponent />
    </>
  );
};

export default HomePage;
