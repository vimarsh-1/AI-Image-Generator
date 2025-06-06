import React, { useEffect } from "react";
import "./FrontPage.css";
import NavBar from "../Navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import rightarrow from "../../Assets/rightarrow.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const FrontPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  });
  return (
    <div className="parentdiv">
      <NavBar />
      <div className="Headlinediv">
        <div className="firsttagline" data-aos="zoom-in" data-aos-delay={700}>
          Create. Imagine. Generate.
        </div>
        <div className="secondtagline" data-aos="zoom-in" data-aos-delay={800}>
          AI-powered visuals in just one click.
        </div>
        <Link to="/ImageGenrator" style={{ textDecoration: "none" }}>
          <Button
            className="navbarbtn"
            variant="dark"
            data-aos="flip-down"
            data-aos-delay={900}
          >
            Generate
            <img className="btnarrowimg" src={rightarrow} alt="" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
