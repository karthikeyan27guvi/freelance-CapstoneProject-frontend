import React from 'react'
import './GigCard.css'
import { Link } from 'react-router-dom'

const GigCard = ({item}) => {
  return (
    <Link to='/gig/123' className='link'>
    <div className='gig-card'>
      <img className='gigCard-img' src={item.img} alt="" />
      <div className="gigCard-info">
        <div className="gigCard-user">
            <img className='gigCard-user-img' src={item.pp} alt="" />
            <span className='gig-username'>{item.username}</span>
        </div>
        <p className='gigCard-desc'>{item.desc}</p>
        <div className="gigCard-star">
            <img className='gigCard-star-img' src="./img/star.png" alt="" />
            <span className='gigCard-star-span'>{item.star}</span>
        </div>
      </div>
      <hr className='gigCard-hr'/>
      <div className="gigCard-details">
      <img className='heart-png' src="./img/heart.png" alt="" />
      <div className="price">
      <span className='price-span'>STARTING AT</span>
      <h2 className='price-h2'>${item.price}</h2> 
      </div>
      </div>  
    </div>
    </Link>
  )
}

export default GigCard
