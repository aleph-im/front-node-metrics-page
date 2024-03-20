export interface MetricData {
  measured_at: number[];
  base_latency: (number | null)[];
  base_latency_ipv4: (number | null)[];
  full_check_latency: number[];
  diagnostic_vm_latency: number[];
  metrics_latency: (number | null)[];
  aggregate_latency: (number | null)[];
  file_download_latency: (number | null)[];
  pending_messages: (number | null)[];
  eth_height_remaining: (number | null)[];
}

export interface Node {
  hash: string;
  name: string;
  picture?: string;
  type: "resource" | "core";
}
