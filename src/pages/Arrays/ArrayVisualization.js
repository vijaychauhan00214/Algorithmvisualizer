import React, { useState } from 'react';
import './ArrayVisualization.css';

const MAX_SIZE = 20;

const ArrayVisualization = () => {
  const [size, setSize] = useState('');
  const [array, setArray] = useState([]);
  const [elementIndex, setElementIndex] = useState('');
  const [accessedElement, setAccessedElement] = useState(null);
  const [animationClass, setAnimationClass] = useState('');
  const [isValidSize, setIsValidSize] = useState(true);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setSize(value);
    if (value > MAX_SIZE || value < 1) {
      setIsValidSize(false);
    } else {
      setIsValidSize(true);
    }
  };

  const generateArray = () => {
    if (isValidSize && size > 0) {
      const newArray = Array.from({ length: size }, (_, i) => i + 1);
      setArray(newArray);
      setAccessedElement(null);
    }
  };

  const handleElementIndexChange = (e) => {
    setElementIndex(e.target.value);
  };

  const accessElement = () => {
    const index = parseInt(elementIndex, 10);
    if (index >= 0 && index < array.length) {
      setAnimationClass('access-animation');
      setTimeout(() => {
        setAccessedElement(index);
        setAnimationClass('');
      }, 500); // Duration should match CSS animation duration
    } else {
      setAccessedElement(null);
    }
  };

  const timeComplexity = 'O(1)'; // Constant time complexity for array access
  const spaceComplexity = `O(${array.length})`; // Space complexity is proportional to array size

  return (
    <div className="wrapper">
      <h1>Array Visualization Theory</h1>
      <div className="theory-card">
        <p>
          An array is a collection of elements identified by index or key. Arrays are a
          fundamental data structure that allows you to store multiple values in a single
          variable. They provide efficient access to elements using their index, making
          them ideal for scenarios where you need to frequently access elements by position.
          Arrays have a fixed size, which means you need to define the size when creating
          the array. They are useful for storing collections of data that are homogeneous
          in nature, such as a list of integers or strings.
        </p>
      </div>

      <div className="array-visualization">
        <div className="input-group">
          <input
            type="number"
            value={size}
            onChange={handleSizeChange}
            placeholder="Enter array size (1-20)"
            className={`cyberpunk-input ${!isValidSize ? 'error' : ''}`}
          />
          <button onClick={generateArray} className="generate-button">Generate Array</button>
          {!isValidSize && <p className="error-message">Size must be between 1 and 20.</p>}
        </div>
        {array.length > 0 && (
          <div className="card">
            <div className={`array-elements ${animationClass}`}>
              {array.map((element, index) => (
                <div key={index} className="array-item">
                  <span className={`array-element ${index === accessedElement ? 'highlight' : ''}`}>
                    {element}
                  </span>
                  <span className="array-index">{index}</span>
                </div>
              ))}
            </div>
            <input
              type="number"
              value={elementIndex}
              onChange={handleElementIndexChange}
              placeholder="Enter index to access"
              className="index-input"
            />
            <button onClick={accessElement} className="access-button">Access Element</button>
            {accessedElement !== null && (
              <div className="access-result">
                <p>Accessed Element: {array[accessedElement]}</p>
                <p>Time Complexity: {timeComplexity}</p>
                <p>Space Complexity: {spaceComplexity}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayVisualization;
