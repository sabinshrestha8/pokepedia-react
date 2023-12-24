import React from "react"
import Wrapper from "../sections/Wrapper"
import avatarImage from "../assets/sabin.jpg"
import { FaGithub, FaLinkedin } from "react-icons/fa"

function About() {
  return (
    <div className="profile">
      <img src={avatarImage} alt="avatar" className="profile-image" />
      <h1 className="profile-text">Hi I am Sabin Shrestha</h1>
      <h2 className="profile-text">The creator of this awesome pokepedia</h2>
      <h4 className="profile-text">
        This project is created for learning purpose only.
      </h4>

      <div className="profile-links">
        <a href="https://github.com/sabinshrestha8" target="_blank">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/sabinshrestha8" target="_blank">
          <FaLinkedin />
        </a>
      </div>
    </div>
  )
}

export default Wrapper(About)
