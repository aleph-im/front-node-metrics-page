import React from "react";

interface NodeDatalistProps {
  nodes: { hash: string; name: string }[];
  selectedNode: string;
  onChange: (selectedNode: string) => void;
  inputClassName?: string;
}

const NodeDatalist: React.FC<NodeDatalistProps> = ({
  nodes,
  selectedNode,
  onChange,
  inputClassName,
}) => {
  const handleNodeSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const node = nodes.find((node) => node.name === e.target.value);
    if (node) {
      onChange(node.hash);
    }
  };

  return (
    <>
      <input
        list="nodes"
        name="nodeSelector"
        onChange={handleNodeSelection}
        placeholder="Type or select a node"
        className={inputClassName}
      />
      <datalist id="nodes">
        {nodes.map((node, index) => (
          <option key={index} value={node.name}>{`${node.hash}`}</option>
        ))}
      </datalist>
    </>
  );
};

export default NodeDatalist;
