import React, { useEffect, useRef } from 'react'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import './Navbar.css'
import { logout } from '../../firebase'

const Navbar = () => {
  const NavRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        NavRef.current.classList.add('nav-dark')
      } else {
        NavRef.current.classList.remove('nav-dark')
      }
    })
  }, [])

  return (
    <>
      <div ref={NavRef} className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="" />
          <ul>
            <li>Home</li>
            <li>Tv Shows</li>
            <li>Movies</li>
            <li>News & Popular</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="navbar-right">
          <img src={search_icon} className='icons' alt="" />
          <p>Children</p>
          <img src={bell_icon} className='icons' alt="" />
          <div className="navbar-profile">
            <img src={profile_img} alt="" className="profile" />
            <img src={caret_icon} alt="" />
            <div className="dropdown">
              <p onClick={()=>{logout()}} >Sign Out of Netflix</p>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar