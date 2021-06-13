import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/auth/authContext";
import InputForm from "../layouts/InputForm";

const AddPet = (props) => {
  const authContext = useContext(AuthContext);

  const {
    error,
    clearErrors,
    loading,
    loadUser,
    isAuthenticated,
    user,
    addPet
  } = authContext;

  useEffect(() => {
    if (loading) {
      if (!isAuthenticated) loadUser();
      return;
    }

    if (!isAuthenticated) {
      props.history.push("/login");
    }

    if (error !== "" && error !== undefined && error !== null) {
      alert(error);
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [pet, setPet] = useState({
    image: "",
    name: ""
  });

  const { image, name } = pet;

  const onChange = (e) => setPet({ ...pet, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (image === "") {
      alert("Please enter in the username!");
      return;
    }

    if (name === "") {
      alert("Please enter in the password!");
      return;
    }

    addPet({
      owner: user.id,
      image,
      name,
    });
  };

  return (
    <div className='pets'>
      <h3>Add Pet</h3>

      <form onSubmit={onSubmit}>
        <InputForm
          name='image'
          type='text'
          header='Image'
          onChange={onChange}
        />
        <InputForm
          name='name'
          type='text'
          header='Name'
          onChange={onChange}
        />
        <input className='btn' type='submit' value='AddPet' />
      </form>
    </div>
  );
};

export default AddPet;
