import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; // Ensure this file includes the required styles

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <NavLink to="/" className="nav-logo">Algo Visualizer</NavLink>
        <ul>
          <li><NavLink to="/arrays" className="nav-link" activeClassName="active">Arrays</NavLink></li>
          <li><NavLink to="/strings" className="nav-link" activeClassName="active">String</NavLink></li>
          <li><NavLink to="/sorting" className="nav-link" activeClassName="active">Sorting</NavLink></li>
          <li><NavLink to="/linkedlists" className="nav-link" activeClassName="active">LinkedLists</NavLink></li>
          <li><NavLink to="/stacks" className="nav-link" activeClassName="active">Stacks</NavLink></li>
          <li><NavLink to="/queues" className="nav-link" activeClassName="active">Queues</NavLink></li>
          <li><NavLink to="/trees" className="nav-link" activeClassName="active">Trees</NavLink></li>
          <li><NavLink to="/graphs" className="nav-link" activeClassName="active">Graphs</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
