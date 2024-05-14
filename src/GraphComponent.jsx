import React, { useState } from 'react';
import ReactFlow, { Controls, MiniMap, Background } from '@react-flow-renderer/react-flow';
import NodeForm from './NodePopup';

const GraphEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleCreateNode = () => {
    const newNode = {
      id: `${Date.now()}`,
      type: 'default',
      data: { label: 'New Node' },
      position: { x: 100, y: 100 },
    };
    setElements((els) => [...els, newNode]);
  };

  const handleNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
  };

  const handleSaveNodeTitle = (nodeId, title) => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === nodeId) {
          el.data.label = title;
        }
        return el;
      })
    );
    setSelectedNodeId(null);
  };

  const handleDeleteElement = (element) => {
    setElements((els) => els.filter((el) => el.id !== element.id));
  };

  const nodeForm = selectedNodeId ? (
    <NodeForm
      nodeId={selectedNodeId}
      onSave={handleSaveNodeTitle}
      onClose={() => setSelectedNodeId(null)}
    />
  ) : null;

  return (
    <div className="graph-container">
      <div className="graph-toolbar">
        <button onClick={handleCreateNode}>Create Node</button>
      </div>
      <div className="graph">
        <ReactFlow
          elements={elements}
          onElementClick={handleNodeClick}
          onElementsRemove={handleDeleteElement}
          nodeTypes={{ default: Node }}
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>
      {nodeForm}
    </div>
  );
};

export default GraphEditor;
