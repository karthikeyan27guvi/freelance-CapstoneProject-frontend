import React from "react";
import "./Gig.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../componets/reviews/Reviews";

function Gig() {

  const {id} = useParams();   // Getting the gig ID from URL parameters

  const { isLoading, error, data } = useQuery({  // Query to fetch gig details
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res)=>{
        return res.data;
      }), 
  });
  
  const userId = data?.userId;  // Extracting userId from gig data

  // Query to fetch user details based on userId
  const { 
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res)=>{
        return res.data;
      }),
      enabled: !!userId,
  });

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
  };

  return (
    <div className="gig">
      {isLoading ? (
        "Loading"
       ) : error ? (
        "Something went wrong!"
        ) : (
        <div className="container">
        <div className="left">
          <span className="breadcrumbs">Indeed {">"} Graphics & Design {">"} </span>
          <h1>{data.title}</h1>
          {isLoadingUser ? (
          "Loading" 
          ): errorUser ? (
            "Something went wrong" 
          ) : ( 
           <div className="user">
            <img
              className="pp"
              src={dataUser.img || "/img/noavatar.jpg"}
              alt=""
            />
            <span>{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber ) && (
            <div className="stars">
              {Array(Math.round(data.totalStars / data.starNumber))
              .fill()
              .map((item,i)=>(
                <img src="/img/star.png" alt="" key={i}/>
              ))} 
              <span>{Math.round(data.totalStars / data.starNumber)}</span>
            </div>
          )}
          </div>
        )}
          <Slider {...settings} className="slide-container">
            {data.images.map((img)=>(
              <img className="gigimg" key={img} src={img} alt="" />
            ))}
          </Slider>
          <h2 className="gig-head">About This Gig</h2>
          <p>
            {data.desc}
          </p>
          
          {isLoadingUser ? (
          "Loading" 
          ): errorUser ? (
            "Something went wrong" 
          ) : (
          <div className="seller">
            <h2 className="gig-head">About The Seller</h2>
            <div className="user">
              <img src={dataUser.img || "/img/noavatar.jpg"} alt=""/>
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber ) && (
            <div className="stars">
              {Array(Math.round(data.totalStars / data.starNumber))
              .fill()
              .map((item,i)=>(
                <img src="/img/star.png" alt="" key={i}/>
              ))}
              <span>{Math.round(data.totalStars / data.starNumber)}</span>
            </div>
            )}
              <Link to={`/message/${id}`}>
              <button className="contact-me">Contact Me</button>
              </Link>
              </div>
            </div>
            <div className="box">
              <div className="box-items">
                <div className="box-item">
                  <span className="box-title">From</span>
                  <span className="box-desc">{dataUser.country}</span>
                </div>
                <div className="box-item">
                  <span className="box-title">Member since</span>
                  <span className="box-desc">Aug 2022</span>
                </div>
                <div className="box-item">
                  <span className="box-title">Avg. response time</span>
                  <span className="box-desc">4 hours</span>
                </div>
                <div className="box-item">
                  <span className="box-title">Last delivery</span>
                  <span className="box-desc">1 day</span>
                </div>
                <div className="box-item">
                  <span className="box-title">Languages</span>
                  <span className="box-desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                {dataUser.desc}
              </p>
            </div>
          </div>
          )}
          <Reviews gigId={id}/>
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>
            {data.shortDesc}
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{data.deliveryDate} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data.features.map((feature)=>(
              <div className="features-item" key={feature}>
              <img className='greencheck'src="/img/greencheck.png" alt="" />
              <span>{feature}</span>
            </div>
            ))}  
          </div>
          <Link to={`/pay/${id}`}>
          <button>Buy Now</button>
          </Link>
        </div>
      </div>
    )}
    </div>
  );
}

export default Gig;