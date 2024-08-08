// src/components/OrderPlaced.js
import React from 'react';
import './css/orderPlaced.css';

function OrderPlaced() {
  return (
    <div id="orderContainer">
      <div id="check"><i className="fas fa-check-circle"></i></div>
      <div id="aboutCheck">
        <h1>Order Placed Successfully!</h1>
        <p>We've sent you an email with the Order details.</p>
      </div>
    </div>
  );
}

export default OrderPlaced;
