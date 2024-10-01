import React from 'react'

function Register() {
    return (
        <div className="register">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-left">
              <h1 className="register-heading">Create a new account</h1>
              <label htmlFor="">Username</label>
              <input className="register-input"
                name="username"
                type="text"
                placeholder="johndoe"
                onChange={handleChange}
              />
              <label htmlFor="">Email</label>
              <input className="register-input"
                name="email"
                type="email"
                placeholder="email"
                onChange={handleChange}
              />
              <label className="register-label" htmlFor="">Password</label>
              <input className="register-input" name="password" type="password" onChange={handleChange} />
              <label htmlFor="">Profile Picture</label>
              <input className="register-input" type="file" onChange={(e) => setFile(e.target.files[0])} />
              <label htmlFor="">Country</label>
              <input className="register-input"
                name="country"
                type="text"
                placeholder="Usa"
                onChange={handleChange}
              />
              <button className='register-btn'type="submit">Register</button>
            </div>
            <div className="register-right">
              <h1>I want to become a seller</h1>
              <div className="toggle">
                <label htmlFor="">Activate the seller account</label>
                <label className="switch">
                  <input className="register-input" type="checkbox" onChange={handleSeller} />
                  <span className="slider round"></span>
                </label>
              </div>
              <label htmlFor="">Phone Number</label>
              <input className="register-input"
                name="phone"
                type="text"
                placeholder="+91"
                onChange={handleChange}
              />
              <label htmlFor="">Description</label>
              <textarea
                placeholder="A short description of yourself"
                name="desc"
                id=""
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
        </div>
      );
}

export default Register
