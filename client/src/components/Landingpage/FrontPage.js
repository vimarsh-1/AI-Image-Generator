import React from "react";
import "./FrontPage.css";
import NavBar from "../Navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import rightarrow from "../../Assets/rightarrow.png";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div className="parentdiv">
      <NavBar />
      <div className="Headlinediv">
        <div className="firsttagline">Create. Imagine. Generate.</div>
        <div className="secondtagline">
          AI-powered visuals in just one click.
        </div>
        <Link to='/ImageGenrator' style={{textDecoration:'none'}}>
        <Button className="navbarbtn" variant="dark">
          Generate
          <img className="btnarrowimg" src={rightarrow} alt="" />
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
