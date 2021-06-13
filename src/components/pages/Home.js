import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";

import AuthContext from "../../context/auth/authContext";

import Pet from "../layouts/Pet";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loading, isAuthenticated, loadUser, pets, getRandomPet, clearPets } = authContext;

  const [data, setData] = useState({
    pet: null,
  });

  const { pet } = data;

  useEffect(() => {
    if (loading) {
      if (!isAuthenticated) loadUser();

      if (pets.length > 0) {
        setData({ ...data, pet: pets[0] });
      } else {
        clearPets();
        getRandomPet();
      }

      return;
    }

    // eslint-disable-next-line
  }, [pets]);

  const refreshPets = (e) => {
    setData({ ...data, pet: null });
    clearPets();
    getRandomPet();
  }

  return (
    <div className='content'>
      <div className='home-container'>
        <button className='btn' onClick={refreshPets}>Show another random pet!</button>
      </div>
      <div className='pets home'>
        {pet !== null ? <Pet key={pet.id} pet={pet} /> : <Fragment />}
      </div>
    </div>
  );
};

export default Home;
