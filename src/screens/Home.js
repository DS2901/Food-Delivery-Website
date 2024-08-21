import React from "react";
import Footer from "../components/Footer";
import Navbarr from "../components/Navbarr";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <div>
      <div><Navbarr /></div>
      <div><Carousel/></div>
      <div className="m-3 "><Card/></div>
      <div className="m-3"><Card/></div>
      <div className="m-3"><Card/></div>
      <div className="m-3"><Card/></div>
      <div className="m-3"><Card/></div>
      <div><Footer/></div> 
    </div>
  );
}
