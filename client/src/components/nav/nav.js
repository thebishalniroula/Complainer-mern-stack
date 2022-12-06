import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
const nav = () => {
  return (
    <nav className="navigation">
      <Link to={"/"} className="logo">
        Complains portal
      </Link>
      <ul className="links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default nav;
