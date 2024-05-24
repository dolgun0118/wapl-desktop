// src/BarChartComponent.tsx
import React, { useEffect, useRef } from "react";
import { LineChart } from "./LineChart";

const LineChartComponent = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const barChart = new LineChart(svgRef.current);
      barChart.render();
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      width={550} // 차트의 너비
      height={300} // 차트의 높이
    />
  );
};

export default LineChartComponent;
