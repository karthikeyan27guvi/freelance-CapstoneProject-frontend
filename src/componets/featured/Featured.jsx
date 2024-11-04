import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import './Featured.css';


const Featured = () => {

    const [input, setInput] = useState("")
    const navigate = useNavigate();
    const handleSubmit = ()=>{
        navigate(`/gigs?search=${input}`);
    }
  return (
    <div className="featured">
        <div className="featured-container">
            <div className="left">
                <h1 className='main-text'>Find the perfect Freelance service for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img className='search-img' src="./img/search.png" alt="" />
                        <input className='inputField' type="text" placeholder='Try "build your own application"' onChange={(e)=> setInput(e.target.value)}/>
                    </div>
                        <button className='search-btn' onClick={handleSubmit}>Search</button>
                </div>
                    <div className="popular">
                        <span>Popular:</span>
                        <button className='popular-btn'>Web Design</button>
                        <button className='popular-btn'>Wordpress</button>
                        <button className='popular-btn'>Logo Design</button>
                        <button className='popular-btn'>AI services</button>
                    </div>
            </div>
            <div className="right"></div>
            <img className="man-png" src="./img/image.png" alt="" />
        </div>
    </div>
  )
}

export default Featured
