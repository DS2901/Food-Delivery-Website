import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbarr from "../components/Navbarr";
import Card from "../components/Card";

export default function Home() {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", // Prevent caching
        },
      });

      let data = await response.json();

      // Check the data received
      console.log("Fetched Data:", data);

      // Update state with the fetched data
      setFoodCategory(data.food_category || []);
      setFoodItem(data.food_items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []); // Run this effect only once on component mount

  // Handle option change for a particular item
  const handleOptionChange = (itemId, option) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [itemId]: option,
    }));
  };

  return (
    <div>
      <Navbarr />
      <div id="carouselExampleControls" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center bg-dark text-white p-3 rounded shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              style={{ height: "600px", objectFit: "cover" }}
              src="https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              style={{ height: "600px", objectFit: "cover" }}
              src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              style={{ height: "600px", objectFit: "cover" }}
              src="https://plus.unsplash.com/premium_photo-1674106347866-8282d8c19f84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Third slide"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-slide="prev"
          data-bs-target="#carouselExampleControls"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-slide="next"
          data-bs-target="#carouselExampleControls"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container" style={{ paddingBottom: '60px' }}>
        {foodCategory.length > 0 ? (
          foodCategory.map((category) => (
            <div className="row mb-3" key={category._id}>
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              {foodItem
                .filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map((filteredItem) => {
                  const selectedOption = selectedOptions[filteredItem._id];
                  return (
                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                      <Card
                        item={filteredItem.name}
                        options={filteredItem.options}
                        image={filteredItem.img}
                        description={filteredItem.description}
                        onOptionChange={(option) => handleOptionChange(filteredItem._id, option)}
                      />
                      <div>
                        {selectedOption && (
                          <p>Selected Amount: {filteredItem.options.find(option => option.type === selectedOption)?.amount}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
