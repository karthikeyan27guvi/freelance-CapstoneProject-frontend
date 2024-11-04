import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [active,setActive] = useState(false);  // State to track if navbar should be active (scrolled).
    const [open,setOpen] = useState(false);  // State to manage user options dropdown.
    const {pathname} = useLocation()  // Get current path for conditional rendering.

    // Function to check if the window is scrolled to activate the navbar.
    const isActive =()=>{
      window.scrollY > 0 ? setActive(true) : setActive(false);
    }
    useEffect(()=>{
      window.addEventListener("scroll",isActive);  // Add scroll event listener.

      return()=>{
        window.removeEventListener("scroll",isActive); // Cleanup on unmount.
      }
    },[])

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));  // Get the current user from local storage.

    const navigate = useNavigate();

    const handleLogout = async ()=>{  // Handle user logout and navigation.
      try {
        await newRequest.post("/auth/logout");
        localStorage.setItem("currentUser", null);
        navigate("/");
      } catch (error) {
        console.log(err)
      }
    };
    
  return (
    <div className={active || pathname!=="/" ? "navbar active" : "navbar" }>
        <div className="navcontainer">
            <div className="logo">
                <Link className='link' to= "/">
                <span className='text'>Indeed</span>
                </Link>    
            </div>
            <div className="links">
            <span>Business</span>
            <span>Explore</span>
            <span>English</span>
            {!currentUser?.isSeller &&<Link className='link' to='/register' ><span>Become a seller</span></Link>}
            {currentUser ? (
              <div className="user" onClick={()=>setOpen(!open)}>
                <img 
                className='userimg' 
                src={currentUser.img || "/img/noavatar.jpg"} 
                alt="" />
                <span>{currentUser?.username}</span>
                {open && ( <div className="options">
                  {
                    currentUser.isSeller && (
                      <>
                      <Link className="link" to="/mygigs">Gigs</Link>
                      <Link className="link" to="/add">Add Gigs</Link>
                      </>
                    )}
                  <Link className="link" to="orders">Orders</Link>
                  <Link className="link" to="messages">Messages</Link>
                  <Link className="link" onClick={handleLogout}>Logout</Link>
                </div>
              )}
              </div>
            ):(
              <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button className='nav-btn'>Join</button>
              </Link>
            </>
            )}
            </div>
        </div>
        {(active || pathname !=="/") && (
          <>
            <hr />
            <div className="menu">
                <Link className='link menuLink' to="https://www.freepik.com/" target='_blank'> Graphics & Design</Link>
                <Link className='link menuLink' to="https://www.freepik.com/" target='_blank'>Video &Animation</Link>
                <Link className='link menuLink' to="https://www.upwork.com/services/writing-translation/" target='_blank'>Writing & Translation</Link>
                <Link className='link menuLink' to="https://chatgpt.com//" target='_blank'>AI services</Link>
                <Link className='link menuLink' to="https://advertising.amazon.com/" target='_blank'>Digital Marketing</Link>
                <Link className='link menuLink' to="https://audiojungle.net//" target='_blank'>Music & Audio</Link>
                <Link className='link menuLink' to="https://www.fiverr.com//" target='_blank'>Programming & Tech</Link>
                <Link className='link menuLink' to="https://businesstech.co.za/news//" target='_blank'>Business</Link>
                <Link className='link menuLink' to="https://www.lifestylestores.com/" target='_blank'>Lifestyle</Link>
            </div>
            <hr />
          </>
        )}
    </div>
  )
}

export default Navbar
