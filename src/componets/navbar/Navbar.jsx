import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const [active,setActive] = useState(false);
    const [open,setOpen] = useState(false);
    const {pathname} = useLocation()

    const isActive =()=>{
      window.scrollY > 0 ? setActive(true) : setActive(false);
    }
    useEffect(()=>{
      window.addEventListener("scroll",isActive);

      return()=>{
        window.removeEventListener("scroll",isActive);
      }
    },[])

    const currentUser = {
      id: 1,
      name: "John Doe",
      isSeller: true
    }
    
  return (
    <div className={active || pathname!=="/" ? "navbar active" : "navbar" }>
        <div className="navcontainer">
            <div className="logo">
                <Link to= "/" className='link'>
                <span className='text'>Indeed</span>
                </Link>
                
            </div>
            <div className="links">
            <span>Business</span>
            <span>Explore</span>
            <span>English</span>
            <span>Sign in</span>
            {!currentUser?.isSeller &&<span>Become a seller</span>}
            {!currentUser && <button className='nav-btn'>Join</button>}
            {currentUser && (
              <div className="user" onClick={()=>setOpen(!open)}>
                <img className='userimg' src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV8yN19yZWFsaXN0aWNfcGhvdG9fb2Zfc21pbGluZ19oYW5kc29tZV95b3VuZ19pbl8xNWExMTE1ZC0xZTBiLTQ4YjAtOGEyNi01ZDE1ZmE3Njg2MzYucG5n.png" alt="" />
                <span>{currentUser?.name}</span>
                {open && <div className="options">
                  {
                    currentUser.isSeller && (
                      <>
                      <Link className="link" to="/mygigs">Gigs</Link>
                      <Link className="link" to="/add">Add Gigs</Link>
                      </>
                    )
                  }
                  <Link className="link" to="orders">Orders</Link>
                  <Link className="link" to="messages">Messages</Link>
                  <Link className="link" to="/">Logout</Link>
                </div>}
              </div>
            )}
            </div>
        </div>
        {(active || pathname !=="/") && (
          <>
            <hr />
            <div className="menu">
                <Link className='link menuLink' to="/"> Graphics & Design</Link>
                <Link className='link' to="/">Video &Animation</Link>
                <Link className='link' to="/">Writing & Translation</Link>
                <Link className='link' to="/">AI services</Link>
                <Link className='link' to="/">Digital Marketing</Link>
                <Link className='link' to="/">Music & Audio</Link>
                <Link className='link' to="/">Programming & Tech</Link>
                <Link className='link' to="/">Business</Link>
                <Link className='link' to="/">Lifestyle</Link>
            </div>
            <hr />
          </>
        )}
    </div>
  )
}

export default Navbar
