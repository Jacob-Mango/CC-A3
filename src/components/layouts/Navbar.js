import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, loading } = authContext;

  const onLogout = () => {
    logout();
  };

  const linksAuthenticated = (
    <Fragment>
      <li className='border'>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      <li className='border'>
        <Link to='/user'>User</Link>
      </li>
    </Fragment>
  );

  const linksNotAuthenticated = (
    <Fragment>
      <li className='border'>
        <Link to='/register'>Register</Link>
      </li>
      <li className='border'>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <ul>
        <li className='border'>
          <Link to='/'>Home</Link>
        </li>
        <li className='border'>
          <Link to='/search'>Search</Link>
        </li>
        <li className='border'>
          <Link to='/add_pet'>Add Pet</Link>
        </li>
      </ul>
      <Link to='/'>
        <h1>{title}</h1>
      </Link>
      <ul>
        {loading ? (
          <Fragment />
        ) : isAuthenticated ? (
          linksAuthenticated
        ) : (
          linksNotAuthenticated
        )}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Pet Ratings",
};

export default Navbar;
