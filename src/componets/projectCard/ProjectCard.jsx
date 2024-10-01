import React from 'react'
import "./ProjectCard.css"
import { Link } from 'react-router-dom'


const ProjectCard = ({item}) => {
  return <>
  <Link to="/" className='link'>
  <div className="projectCard">
   <img className='project-img' src={item.img} alt="" />
   <div className="info">
    <img className='pp-img' src={item.pp} alt="" />
    <div className="texts">
      <h2 className='h2-text'>{item.cat}</h2>
      <span className='span-text'>{item.username}</span>
    </div>
    </div> 
  </div>
  </Link>
  </>
}

export default ProjectCard
