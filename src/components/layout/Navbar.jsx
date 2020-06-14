import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-grey.svg"

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3 nav-property">
      <div className="container">
        <Link
          to="/"
          className="brand-logo center brand-text blue-text text-lighten-3 bold"
        >
          <img src={logo} alt="logo" className="circle white"/>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;