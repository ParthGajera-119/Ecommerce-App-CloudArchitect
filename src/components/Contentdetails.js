// src/components/ContentDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/contentDetails.css';

function ContentDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div id="containerProduct">
      <div id="containerD">
        <div id="imageSection">
          <img src={item.preview} alt={item.name} id="imgDetails" />
        </div>
        <div id="productDetails">
          <h1>{item.name}</h1>
          <h4>{item.brand}</h4>
          <div id="details">
            <h3>Rs {item.price}</h3>
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>
          <div id="productPreview">
            <h3>Product Preview</h3>
            {item.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`preview${index}`}
                id="previewImg"
                onClick={() => document.getElementById('imgDetails').src = photo}
              />
            ))}
          </div>
          <div id="button">
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );

  function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
  }
}

export default ContentDetails;
