// QueueVisualization.js
import React, { useState } from 'react';
import './QueueVisualization.css';

const QueueVisualization = () => {
    const [queue, setQueue] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [lastEnqueued, setLastEnqueued] = useState('');
    const [lastDequeued, setLastDequeued] = useState('');
    const [message, setMessage] = useState('');

    const handleEnqueue = () => {
        if (inputValue === '') {
            setMessage('Please enter a value.');
            return;
        }

        if (queue.length >= 5) {
            setMessage('Queue Overflow');
            setInputValue('');
            return;
        }

        setQueue(prevQueue => {
            const newQueue = [...prevQueue, inputValue];
            setLastEnqueued(inputValue);
            setMessage(`Item ${inputValue} is enqueued.`);
            return newQueue;
        });
        setInputValue('');
    };

    const handleDequeue = () => {
        if (queue.length === 0) {
            setMessage('Queue Underflow');
            return;
        }

        setQueue(prevQueue => {
            const dequeuedValue = prevQueue.shift();
            setLastDequeued(dequeuedValue);
            setMessage(`Item ${dequeuedValue} is dequeued.`);
            return [...prevQueue];
        });
    };

    const handleReset = () => {
        setQueue([]);
        setLastEnqueued('');
        setLastDequeued('');
        setMessage('');
    };

    return (
        <div className="queue-visualization">
            <header>
                <h1 className="queue-heading">Queue Visualization</h1>
            </header>

            <section className="queue-theory">
                <h3>Understanding Queue</h3>
                <p>
                    A queue is a linear data structure that follows the principle of First In First Out (FIFO). 
                    This means the first element added to the queue will be the first one to be removed. 
                    Common queue operations include enqueue, dequeue, and peek.
                </p>
            </section>

            <div className="queue-container">
                <div className="queue-controls">
                    <input 
                        type="number" 
                        className="queue-input" 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)} 
                        placeholder="Enter value" 
                    />
                    <button className="queue-btn enqueue-btn" onClick={handleEnqueue}>Enqueue</button>
                    <button className="queue-btn dequeue-btn" onClick={handleDequeue}>Dequeue</button>
                    <button className="queue-btn reset-btn" onClick={handleReset}>Reset</button>
                </div>

                <div className="queue-display-container">
                    <div className="queue-display">
                        <div className="queue-visual">
                            {queue.map((item, index) => (
                                <div key={index} className="queue-element">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="queue-info">
                        <div className="queue-info-item">
                            <h4>Front of the Queue:</h4>
                            <div className="info-box">{queue.length ? queue[0] : ''}</div>
                        </div>
                        <div className="queue-info-item">
                            <h4>Last Enqueued Item:</h4>
                            <div className="info-box">{lastEnqueued}</div>
                        </div>
                        <div className="queue-info-item">
                            <h4>Last Dequeued Item:</h4>
                            <div className="info-box">{lastDequeued}</div>
                        </div>
                        <div className="queue-info-item">
                            <h4>Queue Size:</h4>
                            <div className="info-box">{queue.length}</div>
                        </div>
                    </div>
                </div>

                <div className="queue-message">
                    <h4>Message Box:</h4>
                    <div className={`message-box ${message.includes('Overflow') || message.includes('Underflow') ? 'error' : ''}`}>
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueueVisualization;
