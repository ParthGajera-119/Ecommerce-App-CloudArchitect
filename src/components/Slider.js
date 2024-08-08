// src/components/Slider.js
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


const images = [
  "./img/img1.png",
  "./img/img2.png",
  "./img/img3.png",
  "./img/img4.png"
];

function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <Slider {...settings}>
      {images.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`slide${index}`} />
        </div>
      ))}
    </Slider>
  );
}

export default ImageSlider;
