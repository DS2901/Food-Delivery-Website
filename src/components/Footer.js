import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-3 border-top fixed-bottom">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="text-white text-decoration-none lh-1 me-3"
          >
            {/* Add content here if needed */}
          </Link>
          <span>© 2022 Company, Inc</span>
        </div>
      </div>
    </footer>
  );
}
