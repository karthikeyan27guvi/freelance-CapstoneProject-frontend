import React, { useState } from 'react';
import './Register.css';
import upload from '../../utils/upload';
import newRequest from '../../utils/newRequest.js';
import {useNavigate} from 'react-router-dom';


function Register() {
  const [file ,setFile] = useState(null)
  const [user, setUser] = useState({
    username:"",
    emai:"",
    password:"",
    img:"",
    country:"",
    isSeller: false,
    desc:""
  });


  const navigate = useNavigate();
  
  const handleChange = (e)=>{
    setUser((prev)=>{
      return {...prev, [e.target.name]: e.target.value};
    });
  };


  const handleSeller = (e)=>{
    setUser((prev)=>{
      return {...prev, isSeller: e.target.checked };
    });
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();

    const url = await upload(file)
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img:url
      });
      navigate("/");
    } catch (err) {
      console.log(err)
    }
  };


    return (
        <div className="register">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-left">
              <h1 className="register-heading">Create a new account</h1>
              <label className="register-heading" htmlFor="">Username</label>
              <input className="register-input"
                name="username"
                type="text"
                placeholder="johndoe"
                onChange={handleChange} />

              <label className="register-heading" htmlFor="">Email</label>
              <input className="register-input"
                name="email"
                type="email"
                placeholder="email"
                onChange={handleChange} />

              <label className="register-label" htmlFor="">Password</label>
              <input className="register-input" name="password" type="password" onChange={handleChange} />

              <label className="register-heading"  htmlFor="">Profile Picture</label>
              <input className="register-input" type="file"  onChange={(e) => setFile(e.target.files[0])} />

              <label className="register-heading" htmlFor="">Country</label>
              <input className="register-input"
                name="country"
                type="text"
                placeholder="USA"
                onChange={handleChange} />

              <button className='register-btn'type="submit">Register</button>
            </div>

            <div className="register-right">
              <h1 className="register-heading">I want to become a Freelancer</h1>
              <div className="toggle">
                <label className="register-heading" htmlFor="">Activate the Freelancer account</label>
                <label className="switch">
                  <input className="register-input" type="checkbox" onChange={handleSeller} />
                  <span className="slider round"></span>
                </label>
              </div>

              <label className="register-heading" htmlFor="">Phone Number</label>
              <input className="register-input"
                name="phone"
                type="text"
                placeholder="+91"
                onChange={handleChange}/>

              <label className="register-heading" htmlFor="">Description</label>
              <textarea
                placeholder="A short description of yourself"
                name="desc"
                id=""
                cols="30"
                rows="10"
                onChange={handleChange}></textarea>
            </div>
          </form>
        </div>
      );
}

export default Register
