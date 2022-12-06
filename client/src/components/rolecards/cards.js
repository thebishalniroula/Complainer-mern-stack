import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
const cards = () => {
  return (
    <div className="cards-container">
      <h2 className="heading2">Select your role</h2>
      <div className="cards">
        {["Admin", "Student", "Guardian"].map((item) => (
          <Link to={`/login/?role=${item}`} className="roleCard">
            <img src="/user.jpg" />
            <h4>{item}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default cards;
