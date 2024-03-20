import { useMemo } from "react";
import { Node } from "../types";

const useFilteredNodes = (nodes: Node[], searchTerm: string) => {
  return useMemo(
    () =>
      nodes.filter(
        (node) =>
          node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          node.hash.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ),
    [nodes, searchTerm]
  );
};

export default useFilteredNodes;
