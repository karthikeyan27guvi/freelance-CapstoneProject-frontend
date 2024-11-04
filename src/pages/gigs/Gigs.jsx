import React, { useEffect, useRef, useState } from 'react';
import './Gigs.css';
import GigCard from '../../componets/gigCard/GigCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';

function Gigs() {

  const [sort, setSort] = useState("sales")
  const [open, setOpen] = useState(false)
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation()
  
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`)
        .then((res)=>{
        return res.data;
      }),
  });

  console.log(data);
  

  const reSort = (type) =>{
    setSort (type);
    setOpen (false);
  };

  useEffect(()=>{
    refetch()
  }, [sort])

  const apply = () => {
    refetch()
  };

  return (
    <div className='gigs'>
        <div className="gigs-container">
          <span className="breadcrumbs"> Graphics & Design  </span>
          <h1>AI Artists</h1>
          <p className='gigs-p'>
            Explore the boundaries of art and technology with Indeed's AI artists
          </p>
          <div className="gigs-menu">
            <div className="gigs-left-menu">
              <span className='gigs-left-span'>Budget</span>
              <input ref={minRef} className='gigs-left-input' type="number" placeholder='min' />
              <input ref={maxRef} className='gigs-left-input' type="number" placeholder='max' />
              <button onClick={apply}className='apply-btn'>Apply</button>
            </div>
            <div className="gigs-right-menu">
              <span className="sortBy" >SortBy</span>
              <span className="sortType">
                {sort === "sales" ? "Best Selling" : "Newest"}
              </span>
              <img  className='arrow-down-png' src="/img/down.png" alt="" onClick={()=>setOpen(!open)} />
              {open && (
                <div className="rightmenu">
                {sort === "sales" ? (
                  <span className='right-menu-span' onClick={()=>reSort("createdAt")}>Newest</span>
                ):(
                <span className='right-menu-span' onClick={()=>reSort("sales")}>Best Selling</span>
                )}
                <span  onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
            </div>
          </div>
          <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
          </div>
        </div>
    </div>  
  )
}

export default Gigs
