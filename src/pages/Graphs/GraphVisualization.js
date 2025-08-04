 import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState
} from 'react-flow-renderer';
import './GraphVisualization.css';

const initialNodes = [
  { id: '1', data: { label: '1' }, position: { x: 0, y: 50 } },
  { id: '2', data: { label: '2' }, position: { x: 150, y: 0 } },
  { id: '3', data: { label: '3' }, position: { x: 150, y: 100 } },
  { id: '4', data: { label: '4' }, position: { x: 300, y: 0 } },
  { id: '5', data: { label: '5' }, position: { x: 300, y: 100 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: '2', data: { weight: 2 } },
  { id: 'e1-3', source: '1', target: '3', label: '4', data: { weight: 4 } },
  { id: 'e2-4', source: '2', target: '4', label: '3', data: { weight: 3 } },
  { id: 'e3-5', source: '3', target: '5', label: '1', data: { weight: 1 } },
  { id: 'e4-5', source: '4', target: '5', label: '2', data: { weight: 2 } },
];

const GraphVisualization = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [visited, setVisited] = useState([]);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const bfs = async () => {
    const queue = ['1'];
    const visitedSet = new Set();

    while (queue.length > 0) {
      const current = queue.shift();
      if (!visitedSet.has(current)) {
        visitedSet.add(current);
        setVisited([...visitedSet]);
        await sleep(700);

        edges.forEach((edge) => {
          if (edge.source === current && !visitedSet.has(edge.target)) {
            queue.push(edge.target);
          }
        });
      }
    }
  };

  const dfs = async () => {
    const stack = ['1'];
    const visitedSet = new Set();

    while (stack.length > 0) {
      const current = stack.pop();
      if (!visitedSet.has(current)) {
        visitedSet.add(current);
        setVisited([...visitedSet]);
        await sleep(700);

        const neighbors = edges
          .filter((edge) => edge.source === current)
          .map((edge) => edge.target);
        stack.push(...neighbors.reverse());
      }
    }
  };

  const kruskal = async () => {
    const parent = {};
    const find = (x) => {
      if (parent[x] !== x) parent[x] = find(parent[x]);
      return parent[x];
    };
    const union = (a, b) => (parent[find(a)] = find(b));

    initialNodes.forEach((node) => (parent[node.id] = node.id));

    const sortedEdges = [...initialEdges].sort(
      (a, b) => (a.data?.weight || 1) - (b.data?.weight || 1)
    );
    const mstEdges = [];

    for (let edge of sortedEdges) {
      if (find(edge.source) !== find(edge.target)) {
        union(edge.source, edge.target);
        mstEdges.push(edge);
        setEdges([...mstEdges]);
        await sleep(700);
      }
    }
  };

  const dijkstra = async () => {
    const start = '1';
    const dist = {};
    const visitedSet = new Set();
    const edgeMap = {};

    initialNodes.forEach((node) => {
      dist[node.id] = Infinity;
    });
    dist[start] = 0;

    edges.forEach((edge) => {
      const key = `${edge.source}-${edge.target}`;
      edgeMap[key] = edge.data?.weight || 1;
    });

    const unvisited = [...initialNodes.map((n) => n.id)];

    while (unvisited.length > 0) {
      unvisited.sort((a, b) => dist[a] - dist[b]);
      const current = unvisited.shift();
      if (dist[current] === Infinity) break;

      visitedSet.add(current);
      setVisited([...visitedSet]);
      await sleep(700);

      const neighbors = edges.filter((e) => e.source === current);

      for (const edge of neighbors) {
        const weight = edge.data?.weight || 1;
        if (dist[current] + weight < dist[edge.target]) {
          dist[edge.target] = dist[current] + weight;
        }
      }
    }
  };

  return (
    <div className="graph-container">
      <h2>Graph Algorithms Visualizer</h2>
      <div className="graph-buttons">
        <button onClick={dfs}>Visualize DFS</button>
        <button onClick={bfs}>Visualize BFS</button>
        <button onClick={kruskal}>Kruskal's MST</button>
        <button onClick={dijkstra}>Dijkstra's Shortest Path</button>
      </div>

      <div className="graph-flow">
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            style: {
              background: visited.includes(node.id) ? '#ffa500' : '#90ee90',
              color: 'black',
              border: '2px solid black',
            },
          }))}
          edges={edges.map((edge) => ({
            ...edge,
            label: edge.label || String(edge.data?.weight || 1),
          }))}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GraphVisualization;
