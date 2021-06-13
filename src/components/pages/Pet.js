import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";

import Pet from "../layouts/Pet";

const PetPage = ({ history, match }) => {
  const authContext = useContext(AuthContext);

  const { loading, loadingPets, isAuthenticated, loadUser, pets, getPet, clearPets } = authContext;

  useEffect(() => {
    clearPets();
    getPet(match.params.petId);

    if (loading) {
      if (!isAuthenticated) loadUser();

      return;
    }

    // eslint-disable-next-line
  }, [history]);

  return (
    <div className='content'>
      <div className='pets'>
        {
          pets !== undefined && pets.length === 1
            ?
            <Pet key={pets[0].id} pet={pets[0]} />
            :
            (loadingPets
              ?
              <span>Loading...</span>
              :
              <span>Failed to load pet.</span>
            )
        }
      </div>
    </div>
  );
};

export default PetPage;
