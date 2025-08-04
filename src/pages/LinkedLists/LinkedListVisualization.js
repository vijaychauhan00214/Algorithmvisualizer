import React, { useState } from 'react';
import './LinkedListVisualization.css';

// Node component for rendering linked list nodes
const Node = ({ data, next }) => (
    <div className="node-container">
        <div className="node">
            {data}
        </div>
        {next && <div className="arrow">&#8594;</div>}
    </div>
);

// Main component for linked list visualization
const LinkedListVisualization = () => {
    const [nodes, setNodes] = useState([]);
    const [newNodeData, setNewNodeData] = useState('');
    const [index, setIndex] = useState('');

    const insertAtStart = () => {
        setNodes([{ data: newNodeData, next: nodes }, ...nodes]);
        setNewNodeData('');
    };

    const insertAtEnd = () => {
        setNodes([...nodes, { data: newNodeData, next: null }]);
        setNewNodeData('');
    };

    const insertAtIndex = () => {
        const idx = parseInt(index);
        if (idx >= 0 && idx <= nodes.length) {
            const newNodes = [...nodes];
            newNodes.splice(idx, 0, { data: newNodeData, next: null });
            setNodes(newNodes);
            setNewNodeData('');
            setIndex('');
        }
    };

    const deleteAtStart = () => {
        setNodes(nodes.slice(1));
    };

    const deleteAtEnd = () => {
        setNodes(nodes.slice(0, -1));
    };

    const deleteAtIndex = () => {
        const idx = parseInt(index);
        if (idx >= 0 && idx < nodes.length) {
            const newNodes = [...nodes];
            newNodes.splice(idx, 1);
            setNodes(newNodes);
            setIndex('');
        }
    };

    return (
        <div className="linkedlist-visualization">
            <h1>Linked List Visualization</h1>
            <div className="theory-card">
                <p>
                    A linked list is a linear data structure where each element is a
                    separate object called a node. Each node contains data and a reference
                    (or a link) to the next node in the sequence. It allows for efficient
                    insertion or removal of elements from any position in the sequence.
                </p>
            </div>
            <div className="linkedlist-container">
                {nodes.map((node, index) => (
                    <Node
                        key={index}
                        data={node.data}
                        next={index < nodes.length - 1}
                    />
                ))}
                {nodes.length > 0 && <div className="node-container arrow-to-null">&#8594; null</div>}
                {nodes.length === 0 && <div className="node-container">Empty List</div>}
            </div>
            <div className="action-buttons">
                <div>
                    <input
                        type="text"
                        value={newNodeData}
                        onChange={(e) => setNewNodeData(e.target.value)}
                        placeholder="Enter node data"
                    />
                </div>

                <div>
                    <input
                        type="number"
                        value={index}
                        onChange={(e) => setIndex(e.target.value)}
                        placeholder="Index"
                    />
                </div>
                <div className="insert-functions">
                    <button onClick={insertAtStart}>Insert at Start</button>
                    <button onClick={insertAtEnd}>Insert at End</button>
                    <button onClick={insertAtIndex}>Insert at Index</button>
                </div>
                <div className="delete-functions">
                    <button onClick={deleteAtStart}>Delete at Start</button>
                    <button onClick={deleteAtEnd}>Delete at End</button>
                    <button onClick={deleteAtIndex}>Delete at Index</button>
                </div>
            </div>
        </div>
    );
};

export default LinkedListVisualization;
