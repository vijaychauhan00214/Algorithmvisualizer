 import React, { useState } from 'react';
import './StringVisualization.css';

const MAX_LENGTH = 30;

const StringVisualization = () => {
  const [inputString, setInputString] = useState('');
  const [charIndex, setCharIndex] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [animationClass, setAnimationClass] = useState('');
  const [isValidLength, setIsValidLength] = useState(true);

  const handleStringChange = (e) => {
    const value = e.target.value;
    setInputString(value);
    setHighlightIndex(null);
    setIsValidLength(value.length <= MAX_LENGTH);
  };

  const handleIndexChange = (e) => {
    setCharIndex(e.target.value);
  };

  const accessCharacter = () => {
    const index = parseInt(charIndex, 10);
    if (index >= 0 && index < inputString.length) {
      setAnimationClass('access-animation');
      setTimeout(() => {
        setHighlightIndex(index);
        setAnimationClass('');
      }, 500); // match with CSS animation time
    } else {
      setHighlightIndex(null);
    }
  };

  const timeComplexity = 'O(1)'; // accessing character by index
  const spaceComplexity = `O(${inputString.length})`;

  return (
    <div className="wrapper">
      <h1>String Visualization Theory</h1>
      <div className="theory-card">
        <p>
          A string is a sequence of characters, commonly used to represent text. In most programming
          languages, strings are immutable, indexed collections. This means you can access individual
          characters using an index (just like arrays), but you can't modify them directly.
          Strings are useful for handling and manipulating textual data.
        </p>
      </div>

      <div className="array-visualization">
        <div className="input-group">
          <input
            type="text"
            value={inputString}
            onChange={handleStringChange}
            placeholder="Enter a string (max 30 chars)"
            className={`cyberpunk-input ${!isValidLength ? 'error' : ''}`}
          />
          {!isValidLength && (
            <p className="error-message">String length must be 30 characters or less.</p>
          )}
        </div>

        {inputString && (
          <div className="card">
            <div className={`array-elements ${animationClass}`}>
              {[...inputString].map((char, index) => (
                <div key={index} className="array-item">
                  <span className={`array-element ${index === highlightIndex ? 'highlight' : ''}`}>
                    {char}
                  </span>
                  <span className="array-index">{index}</span>
                </div>
              ))}
            </div>
            <input
              type="number"
              value={charIndex}
              onChange={handleIndexChange}
              placeholder="Enter index to access"
              className="index-input"
            />
            <button onClick={accessCharacter} className="access-button">
              Access Character
            </button>
            {highlightIndex !== null && (
              <div className="access-result">
                <p>Accessed Character: {inputString[highlightIndex]}</p>
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

export default StringVisualization;
