import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/auth/authContext";
import InputForm from "../layouts/InputForm";
import InputDropdownForm from "../layouts/InputDropdownForm";
import Pet from "../layouts/Pet";

const Search = (props) => {
  const authContext = useContext(AuthContext);

  const {
    error,
    clearErrors,
    loading,
    loadingPets,
    isAuthenticated,
    loadUser,
    pets,
    numPages,
    searchPets,
    clearPets
  } = authContext;

  const searchTypes = [
    {
      'id': 'asc',
      'name': 'Ascending'
    },
    {
      'id': 'dec',
      'name': 'Descending'
    }
  ];

  const [data, setData] = useState({
    search: "",
    type: searchTypes[0].id,
    page: 1
  });

  const { search, type, page } = data;

  useEffect(() => {
    if (loading) {
      if (!isAuthenticated) loadUser();
      return;
    }

    if (error !== "" && error !== undefined && error !== null) {
      alert(error);
      clearErrors();
    }

    clearPets();
    searchPets({
      search,
      type,
      page,
    });

    // eslint-disable-next-line
  }, [page, props.history]);

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const setPage = (p) => {
    let pp = p;
    if (pp > numPages)
      pp = numPages;
    if (pp < 1)
      pp = 1;

    setData({ ...data, page: pp });
  };

  const nextPage = (e) => setPage(page + 1);
  const previousPage = (e) => setPage(page - 1);

  const onSubmit = (e) => {
    e.preventDefault();

    if (type === "") {
      alert("Please select a sort!");
      return;
    }

    setData({ ...data, page: 0 });

    clearPets();
    searchPets({
      search,
      type,
      page,
    });
  };

  return (
    <div className='content'>
      <div className='search-container'>
        <form onSubmit={onSubmit}>
          <div>
            <InputForm
              style={{ display: "inline-block", width: "70%" }}
              name='search'
              type='text'
              header='Input'
              onChange={onChange}
            />
            <InputDropdownForm
              style={{ display: "inline-block", width: "30%" }}
              name='type'
              type='text'
              header='Sort By'
              options={searchTypes}
              onChange={onChange}
            />
          </div>
          <input className='btn' type='submit' value='Search' />
        </form>
      </div>
      <div className='pets'>
        {
          pets !== undefined && pets.length > 0
            ? pets.map((pet) => (
              <Pet pet={pet} key={pet.id} />
            ))
            :
            (
              loadingPets
                ?
                <span>Loading...</span>
                :
                <span>No results found...</span>
            )
        }
      </div>
      <div className='page-container'>
        <button className="btn left" onClick={previousPage}>Previous Page</button>
        <span className="center">Page: {page}</span>
        <button className="btn right" onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default Search;
