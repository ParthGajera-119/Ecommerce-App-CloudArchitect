// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import './css/cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div id="cartMainContainer">
      <h1>Checkout</h1>
      <h3 id="totalItem">Total Items: {cartItems.length}</h3>
      <div id="cartContainer">
        {cartItems.map((item, index) => (
          <div key={index} id="box">
            <img src={item.preview} alt={item.name} />
            <div>
              <h3>{item.name} × 1</h3>
              <h4>Amount: Rs {item.price}</h4>
            </div>
          </div>
        ))}
      </div>
      <div id="totalContainer">
        <div id="total">
          <h2>Total Amount</h2>
          <h4>Amount: Rs {totalAmount}</h4>
        </div>
        <div id="button">
          <button onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );

  function placeOrder() {
    localStorage.removeItem('cart');
    alert('Order placed successfully!');
    window.location.href = '/orderPlaced';
  }
}

export default Cart;
