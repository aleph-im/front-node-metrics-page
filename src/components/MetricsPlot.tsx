import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from "recharts";

import ProgressBar from "./ProgressBar";

interface MetricDataPoint {
  name: string;
  [key: string]: number | string;
}

interface MetricsPlotProps {
  isLoadingMetrics: boolean;
  plotData: MetricDataPoint[];
  plotConfig: any[];
  selectedNodeName?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-1 border-solid border-[#cccc] border-2 bg-[#ffff]">
        <p className="label text-[#141327]">{`${label}`}</p>
        {payload.map((p: any, index: number) => (
          <>
            <p
              key={index}
              className={`text-[${p.color}]`}
            >{`${p.name}: ${p.value}`}</p>
          </>
        ))}
      </div>
    );
  }

  return null;
};

// Custom Legend Component
const CustomLegend = ({ payload, onClick }: any) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {payload.map((entry: any, index: any) => (
        <>
          {console.log(`cursor-pointer color-[${entry.color}] mb-1`)}
          <li
            className={`cursor-pointer color-[#8884d8] mb-1`}
            key={`item-${index}`}
            onClick={() => onClick(entry.value)}
          >
            {entry.value}
          </li>
        </>
      ))}
    </ul>
  );
};

const MetricsPlot: React.FC<MetricsPlotProps> = ({
  isLoadingMetrics,
  plotData,
  plotConfig,
  selectedNodeName,
}) => {
  const [visibleMetrics, setVisibleMetrics] = useState<any>(
    plotConfig.reduce((acc: any, { name, hide }) => {
      acc[name] = !hide; // Start with all metrics visible
      return acc;
    }, {})
  );

  // Toggles the visibility of a metric based on its name
  const handleLegendClick = (metricName: any) => {
    setVisibleMetrics((prevMetrics: { [x: string]: any }) => ({
      ...prevMetrics,
      [metricName]: !prevMetrics[metricName],
    }));
  };

  return (
    <>
      {console.log(plotConfig)}
      {isLoadingMetrics ? (
        <div>
          Loading {selectedNodeName} metrics...
          <ProgressBar isLoading={isLoadingMetrics} loadDuration={12000} />
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={plotData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend onClick={handleLegendClick} />} />
              {
                // Dynamically add lines for each metric
                Object.keys(plotData[0])
                  .filter((key) => key !== "name")
                  .map((metricKey, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={metricKey}
                      stroke="#8884d8"
                      activeDot={{ r: 4 }}
                      hide={!visibleMetrics[metricKey]}
                    />
                  ))
              }
              <Brush dataKey="date" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  );
};

export default MetricsPlot;
