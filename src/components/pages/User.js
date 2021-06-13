import React, { Fragment, useContext, useEffect } from "react";

import AuthContext from "../../context/auth/authContext";

import Pet from "../layouts/Pet";

const User = ({ history, match }) => {
  const authContext = useContext(AuthContext);

  const {
    loading,
    isAuthenticated,
    loadUser,
    viewingUser,
    getUser,
    getUserPets,
    getUserRatedPets,
  } = authContext;

  useEffect(() => {
    if (viewingUser === undefined || viewingUser === null || viewingUser.username !== match.params.username) {
      getUser(match.params.username);
      getUserPets(match.params.username);
      getUserRatedPets(match.params.username);
    }

    console.log(viewingUser);

    if (loading) {
      if (!isAuthenticated) loadUser();

      return;
    }

    // eslint-disable-next-line
  }, [viewingUser, history]);

  return (
    <div className='content'>
      {
        viewingUser !== undefined && viewingUser !== null
          ?
          (
            <Fragment>
              <div className='content-container'>
                <h1>User: {viewingUser.username}</h1>
              </div>
              <div className='content-container'>
                <h2>Owned Pets</h2>
              </div>
              <div className='pets'>
                {
                  viewingUser.pets !== undefined && viewingUser.pets.length > 0
                    ?
                    viewingUser.pets.map(
                      (pet) => (
                        <Pet pet={pet} key={pet.id} />
                      )
                    )
                    :
                    (
                      <span>Loading...</span>
                    )
                }
              </div>
              <div className='content-container'>
                <h2>Rated Pets</h2>
              </div>
              <div className='pets'>
                {
                  viewingUser.rated !== undefined && viewingUser.rated.length > 0
                    ?
                    viewingUser.rated.map(
                      (pet) =>
                      (
                        <Pet pet={pet} key={pet.id} />
                      )
                    )
                    :
                    (
                      <span>Loading...</span>
                    )
                }
              </div>
            </Fragment>
          )
          :
          (
            <div className='content-container'>
              <span>Loading...</span>
            </div>
          )
      }
    </div>
  );
};

export default User;
