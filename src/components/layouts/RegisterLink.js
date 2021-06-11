import React from "react";
import { Link } from "react-router-dom";

const RegisterLink = ({ image, link, text }) => {
  return (
    <Link to={link} className='register-link'>
      <div className='image'>
        <img src={image} alt=''></img>
      </div>
      <div className='link'>
        <span >{text}</span>
      </div>
    </Link>
  );
};

export default RegisterLink;
