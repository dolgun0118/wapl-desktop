import { LineChart } from "./LineChart";
// import axios from "axios";
// import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("BarChart", () => {
  test("fetches data and renders chart", async () => {
    document.body.innerHTML = '<svg width="500" height="300"></svg>';
    const svg = document.querySelector("svg") as SVGSVGElement;

    const chart = new LineChart(svg);
    await chart.render();

    // Check if the chart is rendered correctly
    expect(svg.querySelectorAll("rect").length).toBe(2); // 예: 막대가 2개 그려졌는지 확인
  });
});
