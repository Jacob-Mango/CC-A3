import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/auth/authContext";
import InputForm from "../layouts/InputForm";

const Register = (props) => {
  const authContext = useContext(AuthContext);

  const {
    error,
    clearErrors,
    loading,
    loadUser,
    isAuthenticated,
    register,
  } = authContext;

  useEffect(() => {
    if (loading) {
      if (!isAuthenticated) loadUser();
      return;
    }

    if (isAuthenticated) {
      props.history.push("/");
      return;
    }

    if (error !== "" && error !== undefined && error !== null) {
      alert(error);
      clearErrors();
      return;
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const {
    username,
    password,
    email,
  } = user;

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
    if (email === "") {
      alert("Please enter in the email!");
      return;
    }

    register({
      username,
      password,
      email,
    });
  };

  return (
    <div className='register'>
      <h3>Please fill in the form</h3>

      <form onSubmit={onSubmit}>
        <div>
          <InputForm
            style={{ display: "inline-block", width: "50%" }}
            name='username'
            type='text'
            header='Username'
            onChange={onChange}
          />
        </div>
        <div>
          <InputForm
            style={{ display: "inline-block", width: "50%" }}
            name='password'
            type='password'
            header='Password'
            onChange={onChange}
          />
        </div>
        <div>
          <InputForm
            style={{ display: "inline-block", width: "50%" }}
            name='email'
            type='email'
            header='Email'
            onChange={onChange}
          />
        </div>
        <input className='btn' type='submit' value='Sign up' />
      </form>
    </div>
  );
};

export default Register;
