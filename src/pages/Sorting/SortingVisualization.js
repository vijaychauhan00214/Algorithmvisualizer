import React, { useState } from 'react';
import VisualizationComponent from './components/VisualizationComponent';
import './SortingVisualization.css';

const generateRandomData = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const SortingVisualization = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [data, setData] = useState(generateRandomData(10));

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setData(generateRandomData(10)); // Regenerate data when changing algorithm
    
    // Scroll to the selected algorithm section
    const sectionId = algorithm.toLowerCase().replace(/ /g, '-');
    const section = document.getElementById(sectionId);
    //console.log("Nahi chalra bhai")
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error(`Section with ID ${sectionId} not found`);
    }
  };

  return (
    <div className="sorting-visualization">
      <div className="algorithm-buttons">
        {['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Counting Sort', 'Merge Sort', 'Quick Sort'].map(algorithm => (
          <button
            key={algorithm}
            onClick={() => handleAlgorithmChange(algorithm)}
            className={selectedAlgorithm === algorithm ? 'active' : ''}
          >
            {algorithm}
          </button>
        ))}
      </div>

      <div style={{
        width: "80%", // Reduced width for better content alignment
        margin: "2rem auto", // Center the card with some spacing
        padding: "2rem", // Increased padding for better spacing
        border: "1px solid #ccc",
        borderRadius: "8px", // Slightly more rounded corners
        backgroundColor: "#f9f9f9",
        textAlign: "left", // Align text to the left for better readability
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" // Added subtle shadow for depth
      }}>
        <h1 style={{ 
          fontSize: "2rem", // Larger font for the title
          marginBottom: "1.5rem", 
          color: "#333" // Darker color for better contrast
        }}>
          Sorting Algorithms Theory
        </h1>
        <p style={{ 
          fontSize: "1.1rem", // Slightly larger text for readability
          marginBottom: "1.5rem", 
          lineHeight: "1.6", // Better line spacing for readability
          color: "#555" // Softer text color for a modern look
        }}>
          Sorting algorithms are fundamental in computer science and are used to arrange elements
          in a specific order, typically in ascending or descending order. Different algorithms 
          have different performance characteristics and are suited to different kinds of tasks.
          Here are some common sorting algorithms:
        </p>
        <ul style={{ 
          listStyleType: "disc", // Added list bullets for clarity
          paddingLeft: "1.5rem" // Indent list items for better structure
        }}>
          <li style={{ 
            fontSize: "1.1rem", 
            marginBottom: "0.75rem", 
            color: "#444" // Consistent text color for list items
          }}>
            <strong>Bubble Sort:</strong> Repeatedly compares adjacent elements and swaps them 
            if they are in the wrong order.
          </li>
          <li style={{ 
            fontSize: "1.1rem", 
            marginBottom: "0.75rem", 
            color: "#444" 
          }}>
            <strong>Selection Sort:</strong> Repeatedly selects the smallest (or largest) element 
            from the unsorted portion and moves it to the end of the sorted portion.
          </li>
          <li style={{ 
            fontSize: "1.1rem", 
            marginBottom: "0.75rem", 
            color: "#444" 
          }}>
            <strong>Insertion Sort:</strong> Builds the sorted array one item at a time by inserting 
            each new element into its proper place within the already-sorted portion.
          </li>
          <li style={{ 
            fontSize: "1.1rem", 
            marginBottom: "0.75rem", 
            color: "#444" 
          }}>
            <strong>Counting Sort:</strong> Uses an auxiliary array to count occurrences of each 
            value and then calculates the position of each value in the sorted output.
          </li>
          <li style={{ 
            fontSize: "1.1rem", 
            marginBottom: "0.75rem", 
            color: "#444" 
          }}>
            <strong>Merge Sort:</strong> Divides the array into halves, recursively sorts each half, 
            and then merges the sorted halves.
          </li>
          <li style={{ 
            fontSize: "1.1rem", 
            marginBottom: "0.75rem", 
            color: "#444" 
          }}>
            <strong>Quick Sort:</strong> Selects a 'pivot' element and partitions the array into elements 
            less than and greater than the pivot, then recursively sorts the partitions.
          </li>
        </ul>
      </div>

      

      <div className="visualization-sections">
        {/* Sections for different sorting algorithms */}
        <section id="bubble-sort" className={selectedAlgorithm === 'Bubble Sort' ? 'active' : ''}>
          <h2>Bubble Sort</h2>
          {selectedAlgorithm === 'Bubble Sort' && (
            <VisualizationComponent data={data} algorithm={selectedAlgorithm} />
          )}
        </section>
        <section id="selection-sort" className={selectedAlgorithm === 'Selection Sort' ? 'active' : ''}>
          <h2>Selection Sort</h2>
          {selectedAlgorithm === 'Selection Sort' && (
            <VisualizationComponent data={data} algorithm={selectedAlgorithm} />
          )}
        </section>
        <section id="insertion-sort" className={selectedAlgorithm === 'Insertion Sort' ? 'active' : ''}>
          <h2>Insertion Sort</h2>
          {selectedAlgorithm === 'Insertion Sort' && (
            <VisualizationComponent data={data} algorithm={selectedAlgorithm} />
          )}
        </section>
        <section id="counting-sort" className={selectedAlgorithm === 'Counting Sort' ? 'active' : ''}>
          <h2>Counting Sort</h2>
          {selectedAlgorithm === 'Counting Sort' && (
            <VisualizationComponent data={data} algorithm={selectedAlgorithm} />
          )}
        </section>
        <section id="merge-sort" className={selectedAlgorithm === 'Merge Sort' ? 'active' : ''}>
          <h2>Merge Sort</h2>
          {selectedAlgorithm === 'Merge Sort' && (
            <VisualizationComponent data={data} algorithm={selectedAlgorithm} />
          )}
        </section>
        <section id="quick-sort" className={selectedAlgorithm === 'Quick Sort' ? 'active' : ''}>
          <h2>Quick Sort</h2>
          {selectedAlgorithm === 'Quick Sort' && (
            <VisualizationComponent data={data} algorithm={selectedAlgorithm} />
          )}
        </section>
      </div>
    </div>
  );
};

export default SortingVisualization;
