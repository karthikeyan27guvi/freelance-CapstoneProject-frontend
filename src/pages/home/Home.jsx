import React from 'react'
import Featured from '../../componets/featured/Featured'
import TrustedBy from '../../componets/trustedBy/TrustedBy'
import Slide from '../../componets/slide/Slide'
import {cards} from  '../../Data'
import { projects } from '../../Data'
import CatCard from '../../componets/catCard/CatCard';
import './Home.css'
import ProjectCard from '../../componets/projectCard/ProjectCard'

const Home = () => {
  return (
    <div className='home'>
      <Featured/>
      <TrustedBy/>
      <Slide slidesToShow= {5} arrowsScroll={5}>
        {cards.map(card=>(
          <CatCard key = {card.id} item = {card}/>
        ))}
      </Slide>
      <div className="home-features ">
        <div className="home-container">
          <div className="item">
          <h1 className='home-text'>Today is your opportunity to build the tomorrow you want</h1>
          <div className="home-title">
            <img className='png-img' src="./img/check.png" alt="" />
            The best for every budget
          </div>
          <p className='home-para'>Find high-quality serivces at every price point. No hourly rate,just project-based pricing</p>
          <div className="home-title">
            <img className='png-img' src="./img/check.png" alt="" />
            The best for every budget
          </div>
          <p className='home-para'>Find high-quality serivces at every price point. No hourly rate,just project-based pricing</p>
          <div className="home-title">
            <img className='png-img' src="./img/check.png" alt="" />
            The best for every budget
          </div>
          <p className='home-para'>Find high-quality serivces at every price point. No hourly rate,just project-based pricing</p>
          <div className="home-title">
            <img className='png-img' src="./img/check.png" alt="" />
            The best for every budget
          </div>
          <p className='home-para'>Find high-quality serivces at every price point. No hourly rate,just project-based pricing</p>
          </div>
          <div className="item">
            <video src="./img/Freelancer.mp4" controls></video>
          </div>
        </div>
      </div>
      {/* /---------------------------------/ */}
      <div className="home-features dark">
        <div className="home-container">
          <div className="item">
          <h1 className='first-text'>Indeed Pro</h1>
          <h1 className='second-text'>A business solution designed for teams</h1>
          <p className='first-para'>New e-Commerce
          project management service made for your business</p>
          <div className="home2title">
            <img className='.png-img' src="./img/check.png" alt="" />
            Connect to freelancer with proven business experience
          </div>
          <div className="home2title">
            <img className='.png-img' src="./img/check.png" alt="" />
            Get matched with the perfect talent by a customer success manager
          </div>
          <div className="home2title">
            <img className='.png-img' src="./img/check.png" alt="" />
            Manage teamwork and boost productivity with one powerful workplace
          </div>
          <button className='explore-btn'>Click here to explore</button>
          </div>
          <div className="item">
            <img className='home2img' src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d85c8f7113e7f18d6fca144840de5afa-1718619183018/X1.png" alt="" />
          </div>
        </div>
      </div>
      <Slide slidesToShow= {4} arrowsScroll={1}>
        {projects.map(card=>(
          <ProjectCard key = {card.id} item = {card}/>
        ))}
      </Slide>
    </div>
  )
}

export default Home
