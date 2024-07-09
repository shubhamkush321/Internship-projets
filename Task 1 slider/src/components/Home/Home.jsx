import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Image1 from "../../assets/Images 1.png";
import Image2 from "../../assets/Images 2.png";
import Image3 from "../../assets/Images 3.png";
import Image4 from "../../assets/Images 4.png";
import Image5 from "../../assets/Images 5.png";
import "./home.css";
import Review from "../Review/Review";
import News from "../News/News";

export default function Home() {
  const { reviewRef } = useOutletContext();
  const carouselRef = useRef(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    const backButton = document.getElementById("back");

    const showSlider = (type) => {
      nextButton.style.pointerEvents = "none";
      prevButton.style.pointerEvents = "none";

      const carousel = carouselRef.current;
      carousel.classList.remove("prev", "next");

      const items = carousel.querySelectorAll(".item");
      if (type === "next") {
        carousel.appendChild(items[0]);
        carousel.classList.add("next");
      } else {
        const positionLast = items.length - 1;
        carousel.insertBefore(items[positionLast], items[0]);
        carousel.classList.add("prev");
      }

      setTimeout(() => {
        nextButton.style.pointerEvents = "auto";
        prevButton.style.pointerEvents = "auto";
      });
    };

    nextButton.onclick = () => showSlider("next");
    prevButton.onclick = () => showSlider("prev");

    backButton.onclick = () => {
      setShowDetail(false);
    };

    return () => {
      nextButton.onclick = null;
      prevButton.onclick = null;
      backButton.onclick = null;
    };
  }, []);

  const handleSeeMoreClick = () => {
    setShowDetail(true);
  };

  return (
    <div>
      <div className={`carousel ${showDetail ? "showDetail" : ""}`}>
        <div className="list" ref={carouselRef}>
          <div className="item">
            <img src={Image1} alt="Image1" />
            <div className="intro">
              <div className="title">Go Beyond</div>
              <div className="topic">Beauty Product</div>
              <div className="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo obcaecati esse earum vero, velit temporibus nihil atque vel sequi, soluta ipsum eius similique a voluptate ullam voluptatibus fugiat quia officiis?
              </div>
              <button className="seeMore" onClick={handleSeeMoreClick}>
                See More &#8599;
              </button>
            </div>
            <div className="detail">
              <div className="title">Beauty Product</div>
              <div className="des">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
                natus.
              </div>
              <div className="specifications">
                <div>
                  <p>Address</p>
                  <p>XYZ zip </p>
                </div>
                <div>
                  <p>Price :</p>
                  <p>15 $</p>
                </div>
                <div>
                  <p>Discount :</p>
                  <p>5 $</p>
                </div>
              </div>
              <div className="checkout">
                <button className="btn">ADD CART</button>&nbsp;&nbsp;&nbsp;
                <button className="btn">Order</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src={Image2} alt="Image2" />
            <div className="intro">
              <div className="title">Go Beyond</div>
              <div className="topic">Beauty Product</div>
              <div className="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo obcaecati esse earum vero, velit temporibus nihil atque vel sequi, soluta ipsum eius similique a voluptate ullam voluptatibus fugiat quia officiis?
              </div>
              <button className="seeMore" onClick={handleSeeMoreClick}>
                See More &#8599;
              </button>
            </div>
            <div className="detail">
              <div className="title">Beauty Product</div>
              <div className="des">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
                natus.
              </div>
              <div className="specifications">
                <div>
                  <p>Address</p>
                  <p>XYZ zip </p>
                </div>
                <div>
                  <p>Price :</p>
                  <p>15 $</p>
                </div>
                <div>
                  <p>Discount :</p>
                  <p>5 $</p>
                </div>
              </div>
              <div className="checkout">
                <button className="btn">ADD CART</button>&nbsp;&nbsp;&nbsp;
                <button className="btn">Order</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src={Image3} alt="Image3" />
            <div className="intro">
              <div className="title">Go Beyond</div>
              <div className="topic">Beauty Product</div>
              <div className="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo obcaecati esse earum vero, velit temporibus nihil atque vel sequi, soluta ipsum eius similique a voluptate ullam voluptatibus fugiat quia officiis?
              </div>
              <button className="seeMore" onClick={handleSeeMoreClick}>
                See More &#8599;
              </button>
            </div>
            <div className="detail">
              <div className="title">Beauty Product</div>
              <div className="des">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
                natus.
              </div>
              <div className="specifications">
                <div>
                  <p>Address</p>
                  <p>XYZ zip </p>
                </div>
                <div>
                  <p>Price :</p>
                  <p>15 $</p>
                </div>
                <div>
                  <p>Discount :</p>
                  <p>5 $</p>
                </div>
              </div>
              <div className="checkout">
                <button className="btn">ADD CART</button>&nbsp;&nbsp;&nbsp;
                <button className="btn">Order</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src={Image4} alt="Image4" />
            <div className="intro">
              <div className="title">Go Beyond</div>
              <div className="topic">Beauty Product</div>
              <div className="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo obcaecati esse earum vero, velit temporibus nihil atque vel sequi, soluta ipsum eius similique a voluptate ullam voluptatibus fugiat quia officiis?
              </div>
              <button className="seeMore" onClick={handleSeeMoreClick}>
                See More &#8599;
              </button>
            </div>
            <div className="detail">
              <div className="title">Beauty Product</div>
              <div className="des">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
                natus.
              </div>
              <div className="specifications">
                <div>
                  <p>Address</p>
                  <p>XYZ zip </p>
                </div>
                <div>
                  <p>Price :</p>
                  <p>15 $</p>
                </div>
                <div>
                  <p>Discount :</p>
                  <p>5 $</p>
                </div>
              </div>
              <div className="checkout">
                <button className="btn">ADD CART</button>&nbsp;&nbsp;&nbsp;
                <button className="btn">Order</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src={Image5} alt="Image5" />
            <div className="intro">
              <div className="title">Go Beyond</div>
              <div className="topic">Beauty Product</div>
              <div className="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo obcaecati esse earum vero, velit temporibus nihil atque vel sequi, soluta ipsum eius similique a voluptate ullam voluptatibus fugiat quia officiis?
              </div>
              <button className="seeMore" onClick={handleSeeMoreClick}>
                See More &#8599;
              </button>
            </div>
            <div className="detail">
              <div className="title">Beauty Product</div>
              <div className="des">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
                natus.
              </div>
              <div className="specifications">
                <div>
                  <p>Address</p>
                  <p>XYZ zip </p>
                </div>
                <div>
                  <p>Price :</p>
                  <p>15 $</p>
                </div>
                <div>
                  <p>Discount :</p>
                  <p>5 $</p>
                </div>
              </div>
              <div className="checkout">
                <button className="btn">ADD CART</button>&nbsp;&nbsp;&nbsp;
                <button className="btn">Order</button>
              </div>
            </div>
          </div>
        </div>
        <div className="arrows">
          <button id="prev">&lt;</button>
          <button id="back">Go Back &#8599;</button>
          <button id="next">&gt;</button>
        </div>
      </div>
      <div id="reviewSection" ref={reviewRef}>
        <Review />
      </div>
      <News/>
    </div>
  );
}
