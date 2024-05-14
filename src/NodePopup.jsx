import React, { useState } from 'react';

const NodeForm = ({ nodeId, onSave, onClose }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(nodeId, title);
  };

  return (
    <div className="node-form">
      <h3>Edit Node Title</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default NodeForm;
