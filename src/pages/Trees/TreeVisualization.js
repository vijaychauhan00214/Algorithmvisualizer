import React, { useState, useCallback, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import './TreeVisualization.css'; // Updated path



// TreeNode class definition
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1; // AVL Tree specific
  }
}

// Binary Search Tree class
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  toTreeData(node) {
    if (!node) return null;
    return {
      name: node.value,
      children: [this.toTreeData(node.left), this.toTreeData(node.right)].filter(Boolean)
    };
  }
}

// AVL Tree class
class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(node, value) {
    if (!node) return new TreeNode(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    } else {
      return node;
    }

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  toTreeData(node) {
    if (!node) return null;
    return {
      name: node.value,
      children: [this.toTreeData(node.left), this.toTreeData(node.right)].filter(Boolean)
    };
  }
}

const initialTreeData = {
  name: 'Root',
  children: [],
};

// Helper functions for Binary Tree
const addNodeInLevelOrder = (root, value) => {
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (!node.children || node.children.length < 2) {
      if (!node.children) {
        node.children = [];
      }
      node.children.push({ name: value, children: [] });
      return; // Exit after adding
    }
    queue.push(...node.children);
  }
};

// Traversal Functions
const preorderTraversal = async (node, result) => {
  if (!node) return;
  result.push(node.name);
  if (node.children) {
    for (const child of node.children) {
      await preorderTraversal(child, result);
    }
  }
};

const inorderTraversal = async (node, result) => {
  if (!node) return;
  if (node.children && node.children[0]) {
    await inorderTraversal(node.children[0], result);
  }
  result.push(node.name);
  if (node.children && node.children[1]) {
    await inorderTraversal(node.children[1], result);
  }
};

const postorderTraversal = async (node, result) => {
  if (!node) return;
  if (node.children) {
    for (const child of node.children) {
      await postorderTraversal(child, result);
    }
  }
  result.push(node.name);
};

const levelOrderTraversal = async (root, result) => {
  if (!root) return;
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.name);
    if (node.children) {
      for (const child of node.children) {
        queue.push(child);
      }
    }
  }
};

const TreeVisualization = () => {
  const [btData, setBTData] = useState(initialTreeData);
  const [bst] = useState(new BinarySearchTree());
  const [avl] = useState(new AVLTree());
  const [treeData, setTreeData] = useState(null);
  const [avlTreeData, setAvlTreeData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [usedNumbers, setUsedNumbers] = useState(new Set());
  const treeContainerRef = useRef(null);

  // Generate a unique random number
  const generateUniqueRandomNumber = () => {
    let randomValue;
    do {
      randomValue = Math.floor(Math.random() * 1000); // Adjust the range as needed
    } while (usedNumbers.has(randomValue));
    return randomValue;
  };

  // Binary Tree Functions
  const handleAddNodeToBT = () => {
    const randomValue = generateUniqueRandomNumber();
    setUsedNumbers(prev => new Set(prev).add(randomValue));

    if (selectedNode) {
      if (!selectedNode.children) {
        selectedNode.children = [];
      }
      selectedNode.children.push({ name: randomValue.toString(), children: [] });
      setBTData({ ...btData });
    } else {
      addNodeInLevelOrder(btData, randomValue.toString());
      setBTData({ ...btData });
    }
  };

  // Binary Search Tree Functions
  const handleAddNodeToBST = () => {
    const randomValue = generateUniqueRandomNumber();
    setUsedNumbers(prev => new Set(prev).add(randomValue));

    bst.insert(randomValue.toString());
    setTreeData(bst.toTreeData(bst.root));
  };

  // AVL Tree Functions
  const handleAddNodeToAVL = () => {
    const randomValue = generateUniqueRandomNumber();
    setUsedNumbers(prev => new Set(prev).add(randomValue));

    avl.insert(randomValue.toString());
    setAvlTreeData(avl.toTreeData(avl.root));
  };

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
  };

  // Sleep function for animations
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Handle traversal with highlighting
  const traverseWithHighlight = async (traversalFunc, data) => {
    setHighlightedNodes([]);
    const nodes = [];
    await traversalFunc(data, nodes);
    for (const nodeName of nodes) {
      setHighlightedNodes((prev) => [...prev, nodeName]);
      await sleep(550); // Adjust the speed by changing the duration
    }
    setHighlightedNodes([]);
  };

  const handleTraversal = (type, data) => {
    if (data) {
      switch (type) {
        case 'preorder':
          traverseWithHighlight(preorderTraversal, data);
          break;
        case 'inorder':
          traverseWithHighlight(inorderTraversal, data);
          break;
        case 'postorder':
          traverseWithHighlight(postorderTraversal, data);
          break;
        case 'levelorder':
          traverseWithHighlight(levelOrderTraversal, data);
          break;
        default:
          break;
      }
    }
  };

  // Custom render function for Tree component
  const renderCustomNodeElement = useCallback(
    ({ nodeDatum }) => (
      <g>
        <circle
          r="13"
          fill={highlightedNodes.includes(nodeDatum.name) ? '#ff6347' : '#007bff'}
          stroke="black"
          strokeWidth="2"
          onClick={() => handleNodeClick(nodeDatum)}
        />
        <text fill="grey" strokeWidth="0.5" x="20" y="5">
          {nodeDatum.name}
        </text>
      </g>
    ),
    [highlightedNodes]
  );

  useEffect(() => {
    if (treeContainerRef.current) {
      treeContainerRef.current.focus();
    }
  }, []);

  return (
    <div className="container">
      <h1>Tree Visualization</h1>
      
      {/* Binary Tree Section */}
      <div className="binary-tree-section">
        <h2>Binary Tree</h2>
        <p>
          A Binary Tree is a tree data structure in which each node has at most two children, 
          referred to as the left child and the right child. Binary Trees are used in various 
          applications like expression parsing and binary search.
        </p>
        <div className="controls">
          <button onClick={handleAddNodeToBT}>Add  Node</button>
          <button onClick={() => handleTraversal('preorder', btData)}>Preorder</button>
          <button onClick={() => handleTraversal('inorder', btData)}>Inorder</button>
          <button onClick={() => handleTraversal('postorder', btData)}>Postorder</button>
          <button onClick={() => handleTraversal('levelorder', btData)}>Level Order</button>
        </div>
        <div className="tree-container" style={{ height: `${Math.max(500, 160  + (btData ? btData.children.length * 50 : 0))}px`, transition: 'height 0.3s ease' }} ref={treeContainerRef} tabIndex={-1}>
          {btData && (
            <Tree
              data={btData}
              orientation="vertical"
              renderCustomNodeElement={renderCustomNodeElement}
              translate={{ x: 750, y: 50 }}
              zoomable={true}
              shouldCollapseNeighborNodes={true}
            />
          )}
        </div>
      </div>

      {/* Binary Search Tree Section */}
      <div className="bst-section">
        <h2>Binary Search Tree</h2>
        <p>
          A Binary Search Tree (BST) is a binary tree where each node follows the property that 
          its left child is less than the node and its right child is greater than the node. 
          BSTs are used for efficient searching, insertion, and deletion operations.
        </p>
        <div className="controls">
          <button onClick={handleAddNodeToBST}>Add  Node</button>
          <button onClick={() => handleTraversal('preorder', treeData)}>Preorder</button>
          <button onClick={() => handleTraversal('inorder', treeData)}>Inorder</button>
          <button onClick={() => handleTraversal('postorder', treeData)}>Postorder</button>
          <button onClick={() => handleTraversal('levelorder', treeData)}>Level Order</button>
        </div>
        <div className="tree-container" style={{ height: `${Math.max(500, 170 + (treeData ? treeData.children.length * 59 : 0))}px`, transition: 'height 0.3s ease' }} ref={treeContainerRef} tabIndex={-1}>
          {treeData && (
            <Tree
              data={treeData}
              orientation="vertical"
              renderCustomNodeElement={renderCustomNodeElement}
              translate={{ x: 750, y: 50  }}
              zoomable={true}
              shouldCollapseNeighborNodes={true}
            />
          )}
        </div>
      </div>

      {/* AVL Tree Section */}
      <div className="avl-tree-section">
        <h2>AVL Tree</h2>
        <p>
          An AVL Tree is a self-balancing binary search tree where the difference in heights 
          between the left and right subtrees (balance factor) is at most one. AVL Trees ensure 
          O(log n) time complexity for search, insertion, and deletion operations.
        </p>
        <div className="controls">
          <button onClick={handleAddNodeToAVL}>Add Node</button>
          <button onClick={() => handleTraversal('preorder', avlTreeData)}>Preorder</button>
          <button onClick={() => handleTraversal('inorder', avlTreeData)}>Inorder</button>
          <button onClick={() => handleTraversal('postorder', avlTreeData)}>Postorder</button>
          <button onClick={() => handleTraversal('levelorder', avlTreeData)}>Level Order</button>
        </div>
        <div className="tree-container" style={{ height: `${Math.max(500, 170 + (avlTreeData ? avlTreeData.children.length * 50 : 0))}px`, transition: 'height 0.3s ease' }} ref={treeContainerRef} tabIndex={-1}>
          {avlTreeData && (
            <Tree
              data={avlTreeData}
              orientation="vertical"
              renderCustomNodeElement={renderCustomNodeElement}
              translate={{ x: 750, y: 50 }}
              zoomable={true}
              shouldCollapseNeighborNodes={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};


 

export default TreeVisualization;
