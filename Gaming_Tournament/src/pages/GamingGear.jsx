import React from "react";
import { getAllGamingGear } from "./gearData.jsx"; // Import all gear data
import "bootstrap/dist/css/bootstrap.min.css";
import "./GamingGear.css";

const GamingGear = () => {
  const gearItems = getAllGamingGear(); // Use all items

  return (
    <div className="container-fluid gaming-gear-container">
      <h2 className="text-center text-light my-4">Gaming Gear</h2>
      <div className="row justify-content-center g-3">
        {gearItems.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex">
            <div className="gear-card">
              <img src={item.img} alt={item.name} className="gear-img" />
              <div className="gear-content">
                <h5 className="gear-title">{item.name}</h5>
                <p className="gear-price">{item.price}</p>
              </div>
              <button className="btn btn-primary buy-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamingGear;
