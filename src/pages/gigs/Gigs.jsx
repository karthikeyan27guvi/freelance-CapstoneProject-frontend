import React, { useState } from 'react'
import './Gigs.css'
import {gigs} from '../../Data'
import GigCard from '../../componets/gigCard/GigCard'

const Gigs = () => {

  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState("sales")

  const reSort = (type) =>{
    setSort (type)
    setOpen (false)
  }

  return (
    <div className='gigs'>
        <div className="gigs-container">
          <span className="breadcrumbs"> Graphics & Design  </span>
          <h1>AI Artists</h1>
          <p className='gigs-p'>Explore the boundaries of art and technology with Quora's AI artists</p>
          <div className="gigs-menu">
            <div className="gigs-left-menu">
              <span className='gigs-left-span'>Budget</span>
              <input className='gigs-left-input' type="text" placeholder='min' />
              <input className='gigs-left-input' type="text" placeholder='max' />
              <button className='apply-btn'>Apply</button>
            </div>
            <div className="gigs-right-menu">
              <span className="sortBy" >SortBy</span>
              <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
              <img  className='arrow-down-png' src="./img/down.png" alt="" onClick={()=>setOpen(!open)} />
              {open && (
                <div className="rightmenu">
                {sort === "sales" ? (<span className='right-menu-span'onClick={()=>reSort("createdAt")}>Newest</span>)
                :(
                <span className='right-menu-span'onClick={()=>reSort("sales")}>Best Selling</span>)}
              </div>)}
            </div>
          </div>
          <div className="cards">
                {gigs.map(gig=>(
                  <GigCard key = {gig.id} item = {gig} />
                ))}
          </div>
        </div>
    </div>
  )
}

export default Gigs
