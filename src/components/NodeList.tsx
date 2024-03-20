import React from "react";
import { Node } from "../types";
import SearchInput from "./SearchInput";

interface NodeListProps {
  nodes: Node[];
  selectedNode?: Node;
  searchTerm: string;
  onSelectNode: (selectedNode: Node) => void;
  onSearchingNode: (searchTerm: string) => void;
  className?: string;
}

const NodeList: React.FC<NodeListProps> = ({
  nodes,
  selectedNode,
  searchTerm,
  onSelectNode,
  onSearchingNode,
  className,
}) => {
  const handleNodeFiltering = (searchTerm: string) => {
    onSearchingNode(searchTerm);
  };

  const handleNodeSelection = (node: Node) => {
    onSelectNode(node);
  };
  return (
    <div className={className}>
      <SearchInput
        onSearchTermChange={handleNodeFiltering}
        searchTerm={searchTerm}
        className="w-full px-4 z-20"
      />
      <ul role="list" className="divide-y divide-gray-100">
        {nodes.map((node) => (
          <>
            <li
              className={`flex justify-between gap-x-6 py-5 py-0:[&:last-child] px-4 rounded-lg ${
                selectedNode?.hash === node?.hash ? "bg-blue-200" : ""
              }`}
              key={node.hash}
              onClick={() => handleNodeSelection(node)}
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={node.picture}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {node.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {`${node.hash}`}
                  </p>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default NodeList;
