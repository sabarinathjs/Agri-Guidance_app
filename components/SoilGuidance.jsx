import React from 'react';
import { Link } from 'react-router-dom';
import './SoilGuidance.css';

const SoilGuidance = () => {
  const soilTypes = [
    { icon: "🌱", name: "Clay Soil", description: "Dense and heavy, holds moisture well.", path: "/ClayCrops" },
    { icon: "🪨", name: "Sandy Soil", description: "Light and drains quickly, low nutrients.", path: "/SandySoil" },
    { icon: "🌿", name: "Loamy Soil", description: "Fertile and well-drained, ideal for plants.", path: "/LoamySoil" },
    { icon: "🌾", name: "Silty Soil", description: "Smooth texture, holds moisture, fertile.", path: "/SiltySoil" },
    { icon: "🪵", name: "Peaty Soil", description: "High organic matter, retains water, acidic.", path: "/PeatySoil" },
    { icon: "🧱", name: "Chalky Soil", description: "Alkaline, drains quickly, stony texture.", path: "/ChalkySoil" }
  ];

  return (
    <div>
      <h1 className='soil-guidance-heading'>Soil Guidance</h1> {/* Heading at the top */}
      <div className="soil-guidance-container">
        <div className="soil-grid">
          {soilTypes.map((soil, index) => (
            <Link to={soil.path} key={index} className="soil-link">
              <div className="soil-card">
                <div className="soil-icon">{soil.icon}</div>
                <h2 className="soil-name">{soil.name}</h2>
                {/* <p className="soil-description">{soil.description}</p> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoilGuidance;
