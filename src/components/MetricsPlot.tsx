import React from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";
import ProgressBar from "./ProgressBar";

interface MetricsPlotProps {
  isLoadingMetrics: boolean;
  plotData: Data[];
  layout: Partial<Plotly.Layout>;
}

const MetricsPlot: React.FC<MetricsPlotProps> = ({
  isLoadingMetrics,
  plotData,
  layout,
}) => {
  const extendedLayout: Partial<Plotly.Layout> = {
    ...layout,
    xaxis: {
      tickformatstops: [
        {
          dtickrange: [null, 3600000], // For less than an hour
          value: "%H:%M:%S %d/%m/%Y", // Show full date and time
        },
        {
          dtickrange: [3600000, 86400000], // For an hour to one day
          value: "%H:%M %d/%m/%Y", // Show hour and date
        },
        {
          dtickrange: [86400000, null], // For more than a day
          value: "%d/%m/%Y", // Show only date
        },
      ],
      type: "date",

      ...layout.xaxis,
    },
    legend: {
      orientation: "h",
      x: 0.5,
      xanchor: "center",
      y: -0.1,
      yanchor: "top",
      ...layout.legend,
    },
  };

  console.log(extendedLayout);

  return (
    <>
      {isLoadingMetrics ? (
        <div>
          Loading metrics...
          <ProgressBar isLoading={isLoadingMetrics} loadDuration={12000} />
        </div>
      ) : (
        <Plot
          data={plotData}
          layout={extendedLayout}
          config={{ responsive: true }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </>
  );
};

export default MetricsPlot;
