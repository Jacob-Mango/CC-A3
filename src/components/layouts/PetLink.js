import React from "react";

const PetLink = ({ children, pet }) => {
  return (
    <div className='pet-link-container'>
      <img src={pet.image} alt=''></img>
      <div className='pet-link-data'>
        <ul className='pet-link-data-list'>
          <li>{pet.name} </li>
          <li>{pet.rating}</li>
        </ul>
      </div>
    </div>
  );
};

export default PetLink;
