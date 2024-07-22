import React, { useState, useEffect, useRef } from "react";
import newsletter from "../../assets/newsletter.jpg";
import "./News.css";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function News() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);
  const [isVoucherVisible, setIsVoucherVisible] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (formRef.current) {
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbygfBMLb9Dijq4EfU2n_7ksjd_SW2niUM5YLXQWO8oIwJj28s-tHPcii4ZZuGxOR8lkIg/exec";
      const form = formRef.current;

      const handleSubmit = (e) => {
        e.preventDefault();
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) => {
            console.log("Success!", response);
            toast.success("Subscription successful!");
            setIsVoucherVisible(true);
            form.reset();
            setTimeout(() => {
              setIsVoucherVisible(false);
              closeModal();
            }, 5000); 
          })
          .catch((error) => {
            console.error("Error!", error.message);
            toast.error("Subscription failed. Please try again.");
          });
      };

      form.addEventListener("submit", handleSubmit);

      return () => {
        form.removeEventListener("submit", handleSubmit);
      };
    }
  }, [isModalOpen]);

  return (
    <div>
      {/* Toast Container */}
      <ToastContainer />

      {/* Modal structure */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "" : "closed"}`} data-modal>
          <div
            className="modal-close-overlay"
            data-modal-overlay
            onClick={closeModal}
          ></div>

          <div className="modal-content">
            <button
              className="modal-close-btn"
              data-modal-close
              onClick={closeModal}
            >
              <FaTimes name="close-outline" size={10} />
            </button>

            <div className="newsletter-img">
              <img
                src={newsletter}
                alt="Subscribe Newsletter"
                width="300"
                height="300"
              />
            </div>

            <div className="newsletter">
              <form ref={formRef} name="submit-to-google-sheet">
                <div className="newsletter-header">
                  <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
                  <p className="newsletter-desc">
                    Subscribe to get the latest products and discount updates.
                  </p>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  required
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Enter Your Phone Number"
                  required
                  minLength={10}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                  required
                />{" "}
                <br />
                <button type="submit" className="btn-newsletter">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
