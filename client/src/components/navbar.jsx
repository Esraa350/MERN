import React from "react";
import { NavLink } from "react-router-dom";
import "./css/Form.css";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <ul className="navbar-nav">
      <NavLink className="navbar-brand" to="/">
        MERN 
      </NavLink>
        {/* <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/category">
            Category
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/product">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="cart">
            Cart
          </NavLink>
        </li> */}
        
          <NavLink className="nav-link" aria-current="page" to="/login">
              <button className="btnlogin ml-auto">Login</button>
          </NavLink>
       
      </ul>
    </nav>
  );
};
export default NavBar;
