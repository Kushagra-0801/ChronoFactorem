import React from "react";
import "../../styles/Navbar.css";
import axios from "axios";

const logout = () => {
  axios.get("/api/logout").then(res => {
    console.log("logged out");
  });
};

const Navbar = props => {
  return (
    <div>
      <nav className='nav-wraper blue'>
        <div className='container'>
          <a href='#' className='brand-logo left'>
            ChronoFactorem
          </a>
          <ul className='right hide-on-med-and-down' onClick={props.action}>
            <li>
              <a href='#'>Dashboard</a>
            </li>
            <li>
              <a href='#'>Create TimeTable</a>
            </li>
            <li>
              <a href='#'>Share TimeTable</a>
            </li>
            <li>
              <a href='#'>About Us</a>
            </li>
            <li>
              <a href='#' onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
