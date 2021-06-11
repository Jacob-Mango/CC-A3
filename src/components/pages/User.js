import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/auth/authContext";
import InputForm from "../layouts/InputForm";

const User = (props) => {
  const authContext = useContext(AuthContext);

  const {
    error,
    clearErrors,
    loading,
    isAuthenticated,
    loadUser,
    updateUser,
  } = authContext;

  useEffect(() => {
    if (loading) {
      if (!isAuthenticated) loadUser();
      return;
    }

    if (error !== "" && error !== undefined && error !== null) {
      alert(error);
      clearErrors();
    }

    // eslint-disable-next-line
  }, [isAuthenticated, error, props.history]);

  const [details, setDetails] = useState({
    twitter: "",
    email: "",
    bio: ""
  });

  const {
    twitter,
    email,
    bio
  } = details;

  const onChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      alert("Please enter in the email!");
      return;
    }

    if (bio === "") {
      alert("Please enter in the bio!");
      return;
    }

    updateUser(
      twitter,
      email,
      bio
    );
  };

  return (
    <div className='user'>
      <h3>Please add/edit your details correctly</h3>

      <form onSubmit={onSubmit}>
        <div>
          <InputForm
            style={{ display: "inline-block", width: "50%" }}
            name='twitter'
            type='text'
            header='Twitter'
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
        <div>
          <InputForm
            style={{ display: "inline-block", width: "50%" }}
            name='bio'
            type='text'
            header='Bio'
            onChange={onChange}
          />
        </div>
        <input className='done-btn' type='submit' value='Done' />
      </form>
    </div>
  );
};

export default User;
