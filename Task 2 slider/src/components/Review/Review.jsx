import React from "react";
import "./Review.css";
import Image6 from "../../assets/Images 6.jpg";
import { FaStar } from "react-icons/fa";



let cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.onmousemove =function(e){
  let x = e.pageX - card.offsetLeft;
  let y = e.pageY - card.offsetTop;

  card.style.setProperty('--x', x +'px');
  card.style.setProperty('--y', y +'px');
  }
})

function Review() {
  return (
    <div className="pb-16">
      <h3 className="client">TESTIMONIALS</h3>
      <h1 class="client">What our clients say about us.</h1>
      <div className="container">
        <div className="card" id="card1">
          <img src={Image6} alt="Reviewer" className="size" />
          <h3>John Doe</h3>
          <p className="para">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
            laudantium veritatis quis assumenda esse possimus earum nihil
            voluptatem.
          </p>
          <div className="stars">
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
          </div>
        </div>
        <div className="card" id="card1">
          <img src={Image6} alt="Reviewer" className="size" />
          <h3>John Doe</h3>
          <p className="para">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
            laudantium veritatis quis assumenda esse possimus earum nihil
            voluptatem.
          </p>
          <div className="stars">
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
          </div>
        </div>
        <div className="card" id="card1">
          <img src={Image6} alt="Reviewer" className="size" />
          <h3>John Doe</h3>
          <p className="para">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
            laudantium veritatis quis assumenda esse possimus earum nihil
            voluptatem.
          </p>
          <div className="stars">
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
            <FaStar size={20} className="text-yellow-400" />
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Review;