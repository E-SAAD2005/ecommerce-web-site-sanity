import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter,FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2024 ShopMate All rights reserved</p>
      <p className='icons'>
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaGithub />
      </p>
    </div>
  )
}

export default Footer