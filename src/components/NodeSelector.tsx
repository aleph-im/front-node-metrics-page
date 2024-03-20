import React from "react";

interface NodeSelectorProps {
  nodes: { hash: string; name: string }[];
  selectedNode: string;
  onChange: (selectedNode: string) => void;
}

const NodeSelector: React.FC<NodeSelectorProps> = ({
  nodes,
  selectedNode,
  onChange,
}) => {
  return (
    <select onChange={(e) => onChange(e.target.value)} value={selectedNode}>
      <option value="">Select a Node</option>
      {nodes.map((node, index) => (
        <option key={index} value={node.hash}>
          {node.name}
        </option>
      ))}
    </select>
  );
};

export default NodeSelector;
