import { Data } from "plotly.js";
import React, { useState } from "react";
import MetricsPlot from "../components/MetricsPlot";
import useFetchNodes from "../hooks/useFetchNodes";
import useFetchMetrics from "../hooks/useFetchMetrics";
import useFilteredNodes from "../hooks/useFilteredNodes";
import { MetricData, Node } from "../types";
import NodeList from "../components/NodeList";
import { Spinner } from "@aleph-front/core";
import MetricsPlotPlotly from "../components/MetricsPlotPlotly";

const metricsConfig: {
  key: keyof MetricData;
  name: string;
  visible?: boolean | "legendonly";
}[] = [
  { key: "base_latency", name: "Base Latency" },
  { key: "base_latency_ipv4", name: "Base Latency IPv4" },
  { key: "full_check_latency", name: "Full Check Latency" },
  { key: "diagnostic_vm_latency", name: "Diagnostic VM Latency" },
  { key: "metrics_latency", name: "Metrics Latency" },
  { key: "aggregate_latency", name: "Aggregate Latency" },
  { key: "file_download_latency", name: "File Download Latency" },
  {
    key: "pending_messages",
    name: "Pending Messages",
    visible: "legendonly",
  },
  {
    key: "eth_height_remaining",
    name: "ETH Height Remaining",
    visible: "legendonly",
  },
];

const NodeMetricsPage: React.FC = () => {
  const { nodes, isLoadingNodes } = useFetchNodes();
  const [selectedNode, setSelectedNode] = useState<Node | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredNodes = useFilteredNodes(nodes, searchTerm);
  const { metricData, isLoadingMetrics } = useFetchMetrics(selectedNode, nodes);

  const metricsConfig2: {
    key: keyof MetricData;
    name: string;
    hide?: boolean;
  }[] = [
    { key: "base_latency", name: "Base Latency" },
    { key: "base_latency_ipv4", name: "Base Latency IPv4" },
    { key: "full_check_latency", name: "Full Check Latency" },
    { key: "diagnostic_vm_latency", name: "Diagnostic VM Latency" },
    { key: "metrics_latency", name: "Metrics Latency" },
    { key: "aggregate_latency", name: "Aggregate Latency" },
    { key: "file_download_latency", name: "File Download Latency" },
    {
      key: "pending_messages",
      name: "Pending Messages",
      hide: true,
    },
    {
      key: "eth_height_remaining",
      name: "ETH Height Remaining",
      hide: true,
    },
  ];

  const isMetricPresent = (metric: (number | null)[]): boolean => {
    return metric.some((value) => value !== null);
  };

  const xAxisData = metricData?.measured_at.map((timestamp) =>
    new Date(timestamp * 1000).toISOString()
  );

  const plotData: Data[] = React.useMemo(() => {
    if (!metricData || !xAxisData) return [];

    return metricsConfig.reduce<Data[]>((acc, { key, name, visible }) => {
      const metricArray: (number | null)[] | undefined = metricData[key];
      if (metricArray && isMetricPresent(metricArray)) {
        acc.push({
          x: xAxisData,
          y: metricArray,
          type: "scatter",
          mode: "lines+markers",
          name: name,
          visible: visible,
        });
      }
      return acc;
    }, []);
  }, [metricData, xAxisData]);

  const plotLayout: Partial<Plotly.Layout> = React.useMemo(() => {
    if (!xAxisData || !selectedNode) return {};

    return {
      autosize: true,
      title: `${selectedNode?.name} Node Metrics`,
      xaxis: {
        range: [xAxisData[0], xAxisData[xAxisData.length - 1]],
      },
    };
  }, [xAxisData, selectedNode]);

  // Recharts

  const plotData2 = React.useMemo(() => {
    if (!metricData || !xAxisData) return [];

    // Initialize an array to hold the combined data for all metrics at each x-axis point
    const combinedData = xAxisData.map((date, index) => {
      const dataPoint: any = { name: date }; // Assuming date is your x-axis label
      metricsConfig2.forEach(({ key, name, hide }) => {
        const metricArray = metricData[key];
        if (metricArray && metricArray[index] !== null) {
          // Add each metric to the dataPoint by its name, with value at current index
          dataPoint[name] = metricArray[index];
        }
      });
      return dataPoint;
    });

    return combinedData;
  }, [metricData, xAxisData]);

  return (
    <div className="flex flex-row ">
      <NodeList
        isLoading={isLoadingNodes}
        nodes={filteredNodes}
        selectedNode={selectedNode}
        searchTerm={searchTerm}
        onSelectNode={setSelectedNode}
        onSearchingNode={setSearchTerm}
        className="overflow-y-scroll h-[calc(100vh-77px)] min-w-[250px] z-40 "
      ></NodeList>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-77px)] p-8 z-30 bg-white text-black">
        <div className="flex flex-grow items-center justify-center w-full h-max">
          {isLoadingNodes ? (
            <Spinner color="#141327" />
          ) : selectedNode ? (
            <>
              <MetricsPlotPlotly
                isLoadingMetrics={isLoadingMetrics}
                plotData={plotData}
                layout={plotLayout}
              />
              <MetricsPlot
                isLoadingMetrics={isLoadingMetrics}
                plotData={plotData2}
                plotConfig={metricsConfig2}
                selectedNodeName={selectedNode.name}
              />
            </>
          ) : (
            <div className="text-gray-500">
              Select a node to see its metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodeMetricsPage;
