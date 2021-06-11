import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/auth/authContext";
import InputForm from "../layouts/InputForm";
import { Link } from "react-router-dom";

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const {
    error,
    clearErrors,
    loading,
    loadUser,
    isAuthenticated,
    login,
  } = authContext;

  useEffect(() => {
    if (loading) {
      if (!isAuthenticated) loadUser();
      return;
    }

    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error !== "" && error !== undefined && error !== null) {
      alert(error);
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "") {
      alert("Please enter in the username!");
      return;
    }

    if (password === "") {
      alert("Please enter in the password!");
      return;
    }

    login({
      username,
      password,
    });
  };

  return (
    <div className='login'>
      <h3>Login</h3>

      <form onSubmit={onSubmit}>
        <InputForm
          name='username'
          type='text'
          header='Username'
          onChange={onChange}
        />
        <InputForm
          name='password'
          type='password'
          header='Password'
          onChange={onChange}
        />
        <div className="bottom-buttons">
          <Link className='right' to='/'>
            Forgot?
          </Link>
          <Link className='left' to='/register'>
            Create Account
          </Link>
        </div>
        <input className='btn' type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;
