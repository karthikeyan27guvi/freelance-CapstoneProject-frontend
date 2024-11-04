import React from 'react'
import './GigCard.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

// Component to display individual gig card information
const GigCard = ({item}) => {
  const { isLoading, error, data } = useQuery({  // Fetch user data based on the userId in `item`
    queryKey: [item.userId],  // Unique key for caching
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`)
        .then((res)=>{
        return res.data;
      }),
  });


  return (
    <Link to={`/gig/${item._id}`} className='link'>
    <div className='gig-card'>
      <img className='gigCard-img' src={item.cover} alt="" />
      <div className="gigCard-info">
        {isLoading ? (
          "loading"  // Display loading text while data is being fetched
         ): error ? ( 
          "Something went wrong!"  // Display error message if fetch fails
         ) : ( 
          <div className="gigCard-user">
            <img className='gigCard-user-img' src={data.img || "/img/noavatar.jpg"} alt="" />
            <span className='gig-username'>{data.username}</span>
        </div>
      )}
        <p className='gigCard-desc'>{item.desc}</p>
        <div className="gigCard-star">
            <img className='gigCard-star-img' src="/img/star.png" alt="" />
            <span className='gigCard-star-span'>
              {!isNaN(item.totalStars / item.starNumber) && 
              Math.round(item.totalStars / item.starNumber)}
            </span>
        </div>
      </div>
      <hr className='gigCard-hr'/>
      <div className="gigCard-details">
      <img className='heart-png' src="/img/heart.png" alt="" />
      <div className="price">
      <span className='price-span'>STARTING AT</span>
      <h2 className='price-h2'>${item.price}</h2> 
      </div>
      </div>  
    </div>
    </Link>
  );
};

export default GigCard;
