import { useState, useEffect } from "react";
import { MetricData, Node } from "../types";

const useFetchMetrics = (selectedNode: Node | undefined, nodes: Node[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [metricData, setMetricData] = useState<MetricData | null>(null);

  useEffect(() => {
    if (!selectedNode) return;

    const node = nodes.find((n) => n.hash === selectedNode.hash);
    if (!node) return;

    setIsLoading(true);
    const baseUrl = "https://api2.aleph.im/api/v0";
    const endpoint =
      node.type === "resource"
        ? `${baseUrl}/compute/${node.hash}/metrics`
        : `${baseUrl}/core/${node.hash}/metrics`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setMetricData(data.metrics);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching metric data for node:", error);
        setIsLoading(false);
      });
  }, [selectedNode, nodes]);

  return { metricData, isLoading };
};

export default useFetchMetrics;
