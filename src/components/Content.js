// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/content.css';

const s3BaseUrl = 'https://ecommerce-website-images.s3.amazonaws.com';
const imageNames = ['img2.jpg', 'img3.jpg', 'img4.jpg']; // Array of available image names

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getImageUrl = (index) => {
    // Use modulo operator to cycle through the available images
    return `${s3BaseUrl}/${imageNames[index % imageNames.length]}`;
  };

  return (
    <div id="mainContainer" style={{ paddingTop: '40em' }}>
      <div className="auth-buttons">
        <Link to="/signin" className="auth-button">Sign In</Link>
        <Link to="/signup" className="auth-button">Sign Up</Link>
      </div>
      <h1>Clothing for Men and Women</h1>
      <div id="containerClothing" className="container">
        {items.filter(item => !item.isAccessory).map((item, index) => (
          <div key={item.id} className="box">
            <Link to={`/contentDetails/${item.id}`}>
              <img src={getImageUrl(index)} alt={item.name} />
              <div className="details">
                <h3>{item.name}</h3>
                <h4>{item.brand}</h4>
                <h2>Rs {item.price}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <h1>Accessories for Men and Women</h1>
      <div id="containerAccessories" className="container">
        {items.filter(item => item.isAccessory).map((item, index) => (
          <div key={item.id} className="box">
            <Link to={`/contentDetails/${item.id}`}>
              <img src={getImageUrl(index)} alt={item.name} />
              <div className="details">
                <h3>{item.name}</h3>
                <h4>{item.brand}</h4>
                <h2>Rs {item.price}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
