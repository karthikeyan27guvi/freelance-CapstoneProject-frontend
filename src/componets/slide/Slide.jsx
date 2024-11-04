import React from 'react'
import "./Slide.css";
import Slider from 'infinite-react-carousel';  // Importing the infinite-react-carousel component for creating a slider


const Slide = ({children,slidesToShow,arrowsScroll}) => {  // Slide component takes children, slidesToShow, and arrowsScroll as props
  return <>
  <div className="slide">
    <div className="slide-container">
    <Slider slidesToShow = {slidesToShow} arrowsScroll ={arrowsScroll} >
      {children}  
    </Slider>
    </div>
  </div>
  </>
}

export default Slide
