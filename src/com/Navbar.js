import React from 'react';
import './Navbar.css'; 


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={"https://images-platform.99static.com//y50FdI4Or7filffZ5qSXAn5YMTI=/0x0:2000x2000/fit-in/500x500/projects-files/71/7131/713106/ec5bd3a0-f210-4729-ae13-51241c5657eb.jpg"} alt="Logo" className="navbar-logo" /> {/* Add the logo */}
        <span className="navbar-brand-text">lightweight-charts</span> 
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a href="#" className="navbar-link">Home</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link">About</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
