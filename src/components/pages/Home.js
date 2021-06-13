import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";

import AuthContext from "../../context/auth/authContext";

import Pet from "../layouts/Pet";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loading, loadingPets, isAuthenticated, loadUser, pets, getRandomPet, clearPets } = authContext;

  useEffect(() => {
    clearPets();
    getRandomPet();

    if (loading) {
      if (!isAuthenticated) loadUser();

      return;
    }

    // eslint-disable-next-line
  }, []);

  const refreshPets = (e) => {
    clearPets();
    getRandomPet();
  }

  return (
    <div className='content'>
      <div className='home-container'>
        <button className='btn' onClick={refreshPets}>Show another random pet!</button>
      </div>
      <div className='pets home'>
        {
          pets !== undefined && pets.length === 1
            ?
            <Pet key={pets[0].id} pet={pets[0]} />
            :
            (loadingPets
              ?
              <span>Loading...</span>
              :
              <Fragment />
            )
        }
      </div>
    </div>
  );
};

export default Home;
