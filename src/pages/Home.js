import React from 'react';
import '../styles/Home.css';

const Home = () => {
  const handleGetStarted = () => {
    // You can implement a navigation to the algorithms page or any other action
    console.log("Get Started button clicked!");
  };

  return (
    <div className="home-container">
      <h2>Welcome to Algorithm Visualizer</h2>
      
      <p>Select an algorithm or data structure to visualize from the menu.</p>

      <h3>About This Project</h3>
      <p>
        This project is designed to help you understand and visualize different algorithms and data structures through interactive visualizations. 
        Whether you are a beginner learning about data structures or an experienced developer looking to brush up on your knowledge, this platform is for you!
        It aims to demystify the complex workings of algorithms, providing a user-friendly interface for hands-on experimentation.
        By engaging with the visualizations, users can gain a deeper understanding of how algorithms operate under the hood.
      </p>

      <h3>Features</h3>
      <ul>
        <li>
          <strong>Interactive Visualizations:</strong> Experience algorithms in action with engaging visuals. Each algorithm is represented through clear animations that illustrate the steps taken to reach the final result.
        </li>
        <li>
          <strong>Multiple Data Structures:</strong> Explore arrays, linked lists, trees, stacks, queues, and more. Each data structure has its own unique properties and use cases, making them essential building blocks in computer science.
        </li>
        <li>
          <strong>Sorting Algorithms:</strong> Visualize popular sorting algorithms like Bubble Sort, Quick Sort, and Merge Sort. Understand the efficiency and behavior of each sorting method with real-time examples.
        </li>
        <li>
          <strong>Dynamic Interaction:</strong> Input your own data and see how different algorithms process it in real-time. This feature encourages experimentation, allowing users to see how changes in input affect algorithm performance.
        </li>
        <li>
          <strong>Educational Resources:</strong> Access detailed explanations and tutorials on each algorithm and data structure. This provides users with additional context and knowledge to reinforce their understanding.
        </li>
        <li>
          <strong>Responsive Design:</strong> The application is designed to work seamlessly on various devices, ensuring a smooth experience whether you're using a desktop, tablet, or smartphone.
        </li>
      </ul>

      <h3>Data Structures Used in This Project</h3>
      <p>
        The following data structures are implemented and visualized in this project, each with its unique characteristics and applications:
      </p>
      <ul>
        <li>
          <strong>Arrays:</strong> A collection of elements identified by index or key, allowing for efficient access and manipulation. Used for various algorithms, especially sorting.
        </li>
        <li>
          <strong>Linked Lists:</strong> A linear collection of data elements, where each element points to the next. Linked lists allow for efficient insertion and deletion of elements.
        </li>
        <li>
          <strong>Stacks:</strong> A collection of elements that follows the Last In, First Out (LIFO) principle. Stacks are useful for problems like backtracking and parsing expressions.
        </li>
        <li>
          <strong>Queues:</strong> A collection of elements that follows the First In, First Out (FIFO) principle. Queues are commonly used in scheduling and breadth-first search algorithms.
        </li>
        <li>
          <strong>Trees:</strong> A hierarchical structure that consists of nodes connected by edges. Trees are used to represent hierarchical data and facilitate efficient searching and sorting (e.g., Binary Trees, AVL Trees).
        </li>
        <li>
          <strong>Graphs:</strong> A collection of nodes (or vertices) connected by edges, used to represent relationships and connections between data. Graphs are essential in network routing and social network analysis.
        </li>
      </ul>

      <h3>How to Use</h3>
      <p>
        To get started, simply select a data structure or algorithm from the navigation menu. 
        You can then input your own data or use the provided examples to see how the algorithms work.
      </p>

      <h3>Get Involved</h3>
      <p>
        If you have suggestions for improvements or additional features, feel free to reach out! 
        We welcome contributions and feedback to make this tool even better.
      </p>

      <button className="get-started-button" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default Home;
