import * as d3 from "d3";
import axios from "axios";

interface DataItem {
  name: string;
  line1: number;
  line2: number;
  line3: number;
}

export class LineChart {
  private svg: SVGSVGElement;
  private legend: SVGGElement;

  constructor(svg: SVGSVGElement) {
    this.svg = svg;

    // SVG 요소를 감싸는 rect 요소 추가
    d3.select(this.svg)
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#ffffff");

    const legendGroup = d3
      .select(this.svg)
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(450,20)`);
    this.legend = legendGroup.node() as SVGGElement;
  }

  async render() {
    const data: DataItem[] = await this.fetchData();
    this.drawChart(data);
    this.drawLegend();
  }

  private async fetchData(): Promise<DataItem[]> {
    const response = await axios.get("/api/data");
    return response.data;
  }

  private drawChart(data: DataItem[]) {
    const svg = d3.select(this.svg);
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.name))
      .range([0, width - 100]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.line1, d.line2, d.line3))!])
      .nice()
      .range([height, 30]);

    const line1 = d3
      .line<DataItem>()
      .x((d) => x(d.name)!)
      .y((d) => y(d.line1));

    const line2 = d3
      .line<DataItem>()
      .x((d) => x(d.name)!)
      .y((d) => y(d.line2));

    const line3 = d3
      .line<DataItem>()
      .x((d) => x(d.name)!)
      .y((d) => y(d.line3));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("d", line1);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 3)
      .attr("d", line2);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 3)
      .attr("d", line3);
  }

  private drawLegend() {
    const legendData = ["line1", "line2", "line3"];
    const legendColors = ["steelblue", "green", "red"];

    const legendItem = d3
      .select(this.legend)
      .selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 25})`);

    legendItem
      .append("rect")
      .attr("x", 15)
      .attr("y", 3)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d, i) => legendColors[i]);

    legendItem
      .append("text")
      .attr("x", 35)
      .attr("y", 10)
      .text((d) => d)
      .attr("alignment-baseline", "middle");
  }
}
