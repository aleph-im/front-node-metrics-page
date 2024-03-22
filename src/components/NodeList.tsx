import React from "react";
import { Node } from "../types";
import { Icon, NodeName, TextInput } from "@aleph-front/core";

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
      <div className="m-2">
        <TextInput
          name="NodeFilter"
          placeholder="Search Node by Name or ID..."
          value={searchTerm}
          onChange={(e) => handleNodeFiltering(e.target.value)}
          icon={<Icon name="search" size="lg" />}
        />
      </div>
      <ul className="divide-y divide-gray-100">
        {nodes.map((node) => (
          <>
            <li
              className={`flex justify-between gap-x-6 py-5 py-0:[&:last-child] px-4 ${
                selectedNode?.hash === node?.hash ? "bg-[#029aff]" : ""
              }`}
              key={node.hash}
              onClick={() => handleNodeSelection(node)}
            >
              <NodeName
                apiServer="https://api2.aleph.im"
                ImageCmp={{}}
                hash={node.hash}
                name={node.name}
                picture={node.picture}
              />
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default NodeList;
