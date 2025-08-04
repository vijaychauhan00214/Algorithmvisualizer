// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';                                                                                 
import ArrayVisualization from './pages/Arrays/ArrayVisualization';
import StringVisualization from './pages/Strings/StringVisualization';
import SortingVisualization from './pages/Sorting/SortingVisualization';
import LinkedListVisualization from './pages/LinkedLists/LinkedListVisualization';
import StackVisualization from './pages/Stacks/StackVisualization';
import QueueVisualization from './pages/Queues/QueueVisualization';
import TreeVisualization from './pages/Trees/TreeVisualization';
import GraphVisualization from './pages/Graphs/GraphVisualization';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { Helmet } from 'react-helmet';
import './styles/globals.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Helmet>
          <title>Algorithm Visualizations</title>
          <meta name="description" content="Visualize algorithms and data structures interactively" />
        </Helmet>
        <div className="content-wrapper">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/arrays" element={<ArrayVisualization />} />
            <Route path="/strings" element={<StringVisualization />} />
            <Route path="/sorting" element={<SortingVisualization />} />
            <Route path="/linkedlists" element={<LinkedListVisualization />} />
            <Route path="/stacks" element={<StackVisualization />} />
            <Route path="/queues" element={<QueueVisualization />} />
            <Route path="/trees" element={<TreeVisualization/>} />
            <Route path="/graphs" element={<GraphVisualization />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
