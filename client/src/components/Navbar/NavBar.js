import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import rightarrow from "../../Assets/rightarrow.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="navtitle">
          Image Generative AI 🤖
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/ImageGenrator" style={{ textDecoration: "none" }}>
            <Button className="navbarbtn" variant="dark">
              Generate from here{" "}
              <img className="btnarrowimg" src={rightarrow} alt="" />
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
