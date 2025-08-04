import React, { useState } from 'react';
import './StackVisualization.css';

const StackVisualization = () => {
    const [stack, setStack] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [lastPushed, setLastPushed] = useState('');
    const [lastPopped, setLastPopped] = useState('');
    const [message, setMessage] = useState('');

    const handlePush = () => {
        if (inputValue === '') {
            setMessage('Please enter a value.');
            return;
        }

        if (stack.length >= 5) {
            setMessage('Stack Overflow');
            setInputValue('');
            return;
        }

        setStack(prevStack => {
            const newStack = [...prevStack, inputValue];
            setLastPushed(inputValue);
            setMessage(`Item ${inputValue} is pushed.`);
            return newStack;
        });
        setInputValue('');
    };

    const handlePop = () => {
        if (stack.length === 0) {
            setMessage('Stack Underflow');
            return;
        }

        setStack(prevStack => {
            const newStack = [...prevStack];
            const poppedValue = newStack.pop(); // Pop one item
            setLastPopped(poppedValue);
            setMessage(`Item ${poppedValue} is popped.`);
            return newStack;
        });
    };

    const handleReset = () => {
        setStack([]);
        setLastPushed('');
        setLastPopped('');
        setMessage('');
    };

    return (
        <div className="stack-visualization">
            <header>
                <h1 className="stack-heading">Stack Visualization</h1>
            </header>

            <section className="stack-theory">
                <h3>Understanding Stack</h3>
                <p>
                    A stack is a linear data structure that follows the principle of Last In First Out (LIFO). 
                    This means the last element added to the stack will be the first one to be removed. 
                    Common stack operations include push, pop, and peek.
                </p>
            </section>

            <div className="stack-container">
                <div className="stack-controls">
                    <input 
                        type="number" 
                        className="stack-input" 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)} 
                        placeholder="Enter value" 
                    />
                    <button className="stack-btn push-btn" onClick={handlePush}>Push</button>
                    <button className="stack-btn pop-btn" onClick={handlePop}>Pop</button>
                    <button className="stack-btn reset-btn" onClick={handleReset}>Reset</button>
                </div>

                <div className="stack-display">
                    <div className="stack-visual">
                        {stack.map((item, index) => (
                            <div key={index} className="stack-element">
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="stack-info">
                        <div className="stack-info-item">
                            <h4>Top of the Stack:</h4>
                            <div className="info-box">{stack.length ? stack[stack.length - 1] : ''}</div>
                        </div>
                        <div className="stack-info-item">
                            <h4>Last Pushed Item:</h4>
                            <div className="info-box">{lastPushed}</div>
                        </div>
                        <div className="stack-info-item">
                            <h4>Last Popped Item:</h4>
                            <div className="info-box">{lastPopped}</div>
                        </div>
                        <div className="stack-info-item">
                            <h4>Stack Size:</h4>
                            <div className="info-box">{stack.length}</div>
                        </div>
                    </div>
                </div>
                <div className="stack-message">
                    <div className={`message-box ${message.includes('Overflow') || message.includes('Underflow') ? 'error' : ''}`}>
                        {message}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default StackVisualization;
