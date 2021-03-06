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
    updateUserBio,
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
    bio: ""
  });

  const {
    bio
  } = details;

  const onChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });


  const onSubmitBio = (e) => {
    e.preventDefault();

    if (bio === "") {
      alert("Please enter in the bio!");
      return;
    }

    updateUserBio({ bio });
  };

  return (
    <div className='user'>
      <h3>Please add/edit your details correctly</h3>

      <form onSubmit={onSubmitBio}>
        <div>
          <InputForm
            style={{ display: "inline-block", width: "50%" }}
            name='bio'
            type='text'
            header='Bio'
            onChange={onChange}
          />
        </div>
        <input className='done-btn' type='submit' value='Update' />
      </form>
    </div>
  );
};

export default User;
