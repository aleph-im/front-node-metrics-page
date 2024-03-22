import { useEffect, useState } from "react";
import { Node } from "../types";

const useFetchNodes = () => {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    fetch(
      "https://api3.aleph.im/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel"
    )
      .then((response) => response.json())
      .then((data) => {
        const coreNodes: Node[] = data.data.corechannel.nodes.map(
          (node: any) => ({
            hash: node.hash,
            name: node.name,
            picture: node.picture,
            type: "core",
          })
        );
        const resourceNodes: Node[] = data.data.corechannel.resource_nodes.map(
          (node: any) => ({
            hash: node.hash,
            name: node.name,
            picture: node.picture,
            type: "resource",
          })
        );
        setNodes([...coreNodes, ...resourceNodes]);
      })
      .catch((error) => console.error("Error fetching nodes:", error));
  }, []);

  return nodes;
};

export default useFetchNodes;
