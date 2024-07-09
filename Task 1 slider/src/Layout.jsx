import React, { useRef } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  const reviewRef = useRef(null);

  const handleShowReview = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header onShowReview={handleShowReview} />
      <Outlet context={{ reviewRef }} />
      <Footer />
    </>
  );
}

export default Layout;
