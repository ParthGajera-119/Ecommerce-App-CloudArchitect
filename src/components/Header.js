// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';

function Header() {
  return (
    <header>
      <div id="container">
        <div id="shopName"><Link to="/"> <b>SHOP</b>LANE </Link></div>
        <div id="collection">
          <div id="clothing"><Link to="/clothing">CLOTHING</Link></div>
          <div id="accessories"><Link to="/accessories">ACCESSORIES</Link></div>
        </div>
        <div id="search">
          <i className="fas fa-search search"></i>
          <input type="text" id="input" name="searchBox" placeholder="Search for Clothing and Accessories" />
        </div>
        <div id="user">
          <Link to="/cart"> <i className="fas fa-shopping-cart addedToCart"><div id="badge"> 0 </div></i></Link>
          <Link to="/signin"> <i className="fas fa-user-circle userIcon"></i> </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
