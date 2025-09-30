import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Digital Library
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Books</Link></li>
          <li><Link to="/find">Search</Link></li>
          <li><Link to="/add">Add Book</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;