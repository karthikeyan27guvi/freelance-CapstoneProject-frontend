import React from 'react'
import "./CatCard.css"
import { Link } from 'react-router-dom'

const CatCard = ({item}) => {  
  return <>
  <Link to="/gigs?cat=">  
  <div className="catCard">
    <img className='card-img' src={item.img} alt="" />
    <span className='title'>{item.title}</span>
    <span className='desc'>{item.desc}</span>
  </div>
  </Link>
  </>
}

export default CatCard
