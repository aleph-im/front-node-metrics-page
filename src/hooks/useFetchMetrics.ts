import { useState, useEffect } from "react";
import { MetricData, Node } from "../types";

const useFetchMetrics = (selectedNode: Node | undefined, nodes: Node[]) => {
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
  const [metricData, setMetricData] = useState<MetricData | null>(null);

  useEffect(() => {
    if (!selectedNode) return;

    const node = nodes.find((n) => n.hash === selectedNode.hash);
    if (!node) return;

    setIsLoadingMetrics(true);
    const baseUrl = "https://api2.aleph.im/api/v0";

    const endpoint =
      node.type === "resource"
        ? `${baseUrl}/compute/${node.hash}/metrics`
        : `${baseUrl}/core/${node.hash}/metrics`;

    const url = new URL(endpoint, baseUrl);

    const endDate = Math.floor(Date.now() / 1000); // current time (in seconds)
    const startDate = endDate - 2 * 7 * 24 * 60 * 60; // 2 weeks from now (in seconds)

    url.search = new URLSearchParams({
      start_date: startDate.toString(),
      end_date: endDate.toString(),
      sort: "asc",
    }).toString();

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => {
        setMetricData(data.metrics);
        setIsLoadingMetrics(false);
      })
      .catch((error) => {
        console.error("Error fetching metric data for node:", error);
        setIsLoadingMetrics(false);
      });
  }, [selectedNode, nodes]);

  return { metricData, isLoadingMetrics };
};

export default useFetchMetrics;
