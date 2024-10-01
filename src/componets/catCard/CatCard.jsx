import React from 'react'
import "./CatCard.css"
import { Link } from 'react-router-dom'

const CatCard = ({item}) => {  // The component expects an 'item' prop, which should contain the data for the cat card //
  return <>
  <Link to="/gigs?cat=design">  

  {/* Use the Link component from react-router-dom to create a link to the '/gigs?cat=design' route  */}
  <div className="catCard">
    <img className='card-img' src={item.img} alt="" />
    <span className='title'>{item.title}</span>
    <span className='desc'>{item.desc}</span>
  </div>
  </Link>
  </>
}

export default CatCard
