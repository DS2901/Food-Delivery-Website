import React from "react";

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{zIndex:"10"}}>
          <form className="d-flex bg-dark text-white p-3 rounded shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success text-white" type="submit">
                Search
              </button>
            </form>
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
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-slide="next"
          data-bs-target="#carouselExampleControls"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
