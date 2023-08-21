// import React from "react";
import { Link } from "react-router-dom";

// import "../../styles/_header.scss";

import logo from "../../assets/images/header/logo.png";



const Header = () => {
  return (
    <div className="header">
      <div className="header-wrapper">
        <Link className="logo" to="/">
          <img className="logo-element" src={logo} alt="" />
        </Link>
        <div className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/voting">Voting</Link>
            </li>
            <li>
              <Link to="/breeds">Breeds</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
