import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-container">
        <div className="top">
          <div className="top-item">
            <h2 className='footer-heading'>Categories</h2>
            <span className='social-content' >Graphics & Design</span>
            <span className='social-content' >Digital Marketing</span>
            <span className='social-content' >Writing & Translation</span>
            <span className='social-content' >Video & Animation</span>
            <span className='social-content' >Music & Audio</span>
            <span className='social-content' >Programming & Tech</span>
            <span className='social-content' >Data</span>
            <span className='social-content' >Business</span>
            <span className='social-content' >Lifestyle</span>
            <span className='social-content' >Photography</span>
            <span className='social-content' >Sitemap</span>
          </div>
          <div className="top-item">
            <h2 className='footer-heading'>About</h2>
            <span className='social-content' >Press & News</span>
            <span className='social-content' >Partnership</span>
            <span className='social-content' >Privacy Policy</span>
            <span className='social-content' >Terms of Service</span>
            <span className='social-content' >Intellectual Property Claim</span>
            <span className='social-content' >Investor Relations</span>
            <span className='social-content' >Contact Sales</span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
          </div>
          <div className="top-item">
            <h2 className='footer-heading'>Support</h2>
            <span className='social-content' >Help & Support</span>
            <span className='social-content' >Trust & Safety</span>
            <span className='social-content' >Selling on Quora</span>
            <span className='social-content' >Buying on Quora</span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
            <span className='social-content' ></span>
          </div>
          <div className="top-item">
            <h2 className='footer-heading'>Community</h2>
            <span className='social-content' >Customer Success Stories</span>
            <span className='social-content' >Community Hub</span>
            <span className='social-content' >Forum</span>
            <span className='social-content' >Events</span>
            <span className='social-content' >Blog</span>
            <span className='social-content' >Influencers</span>
            <span className='social-content' >Affiliate</span>
            <span className='social-content' >Podcast</span>
            <span className='social-content' >Invite a Friend</span>
            <span className='social-content' >Become a Seller</span>
            <span className='social-content' >Community Standards</span>
          </div>
          <div className="top-item">
            <h2 className='footer-heading'>More From Indeed</h2>
            <span className='social-content' >Indeed Business</span>
            <span className='social-content' >Indeed Pro</span>
            <span className='social-content' >Indeed Logo Maker</span>
            <span className='social-content' >Indeed Guides</span>
            <span className='social-content' >Get Inspired</span>
            <span className='social-content' >Indeed Select</span>
            <span className='social-content' >Data</span>
            <span className='social-content' >Clear Voice</span>
            <span className='social-content' >Indeed Workspace</span>
            <span className='social-content' >Learn</span>
            <span className='social-content' ></span>
          </div>
        </div>
        <hr className='bottom-line'/>
        <div className="bottom">
          <div className="bottom-left">
            <h2 className='footer-logo'>Indeed</h2>
            <span className='footer-span' >© Indeed International Ltd. 2024</span>
          </div>
          <div className="bottom-right">
            <div className="social-icons">
              <img className='socialmedia-img' src="/img/twitter.png" alt="" />
              <img className='socialmedia-img' src="/img/facebook.png" alt="" />
              <img className='socialmedia-img' src="/img/linkedin.png" alt="" />
              <img className='socialmedia-img' src="/img/pinterest.png" alt="" />
              <img className='socialmedia-img' src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img className='language' src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="./img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer