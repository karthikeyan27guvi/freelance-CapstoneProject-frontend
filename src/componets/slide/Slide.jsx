import React from 'react'
import "./Slide.css";
import Slider from 'react-slick';  // Importing the infinite-react-carousel component for creating a slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = ({children,slidesToShow,arrowsScroll}) => {  // Slide component takes children, slidesToShow, and arrowsScroll as props
  const settings = {
    slidesToShow: slidesToShow,
    slidesToScroll: arrowsScroll,
    infinite: true,
    arrows: true,
  };
  return <> 
  <div className="slide">
    <div className="slide-container">
    <Slider {...settings} >
      {children}  
    </Slider>
    </div>
  </div>
  </>
}

export default Slide
