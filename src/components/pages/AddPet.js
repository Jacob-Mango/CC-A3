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

  const onImageChange = (e) => {
    if (e.target.files.length === 0) {
      setPet({ ...pet, image: null });
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setPet({ ...pet, image: reader.result });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (image === null) {
      alert("Please add an image!");
      return;
    }

    if (name === "") {
      alert("Please enter in the name!");
      return;
    }

    addPet({
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
          type='file'
          header='Image'
          onChange={onImageChange}
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
