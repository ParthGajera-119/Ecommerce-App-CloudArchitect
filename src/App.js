// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ContentDetails from './components/Contentdetails';
import Cart from './components/Cart';
import OrderPlaced from './components/OrderPlaced';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import ImageSlider from './components/Slider';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <ImageSlider /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contentDetails/:id" element={<ContentDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderPlaced" element={<OrderPlaced />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
