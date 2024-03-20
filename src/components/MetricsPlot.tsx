import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

interface MetricsPlotProps {
  plotData: Data[];
  layout: Partial<Plotly.Layout>;
}

const MetricsPlot: React.FC<MetricsPlotProps> = ({ plotData, layout }) => {
  return (
    <Plot
      data={plotData}
      layout={layout}
      config={{ responsive: true }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default MetricsPlot;
