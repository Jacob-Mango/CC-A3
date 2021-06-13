import React, { Fragment, useContext, useEffect, useState } from "react";

import AuthContext from "../../context/auth/authContext";
import Star from './Star';
import InputForm from "./InputForm";
import Comment from './Comment';

const Pet = ({ children, pet }) => {
  const authContext = useContext(AuthContext);

  const {
    loading,
    loadUser,
    isAuthenticated,
    addComment,
    updatePetRating,
  } = authContext;

  const [data, setData] = useState({
    commentsVisible: false,
    commentInputVisisble: true,
    comment: ""
  });

  const { commentsVisible, commentInputVisisble, comment } = data;

  useEffect(() => {
    if (loading) {
      if (!isAuthenticated) loadUser();
      return;
    }

    setData({ ...data, commentInputVisisble: isAuthenticated });

    // eslint-disable-next-line
  }, [pet, commentsVisible]);

  const showComments = (e) => setData({ ...data, commentsVisible: !commentsVisible });

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (comment === "") {
      alert("Please enter in a comment!");
      return;
    }

    addComment({
      pet: pet.id,
      comment,
    });
  };

  const onUpdateRating = (i) => {
    updatePetRating({
      pet: pet.id,
      rating: i
    });
  };

  return (
    <div className={'pet ' + (commentsVisible ? (commentInputVisisble ? "pet-comments-input " : "pet-comments ") : "") }>
      <div className="pet-top-container">
        <div className='pet-header' >
          <h3>Name: {pet.name}</h3>
          <Star rating={pet.average} onClick={onUpdateRating} />
        </div>
        <img className='pet-image' src={pet.image} alt=''></img>
        <div className='data'>
          <button className="btn" onClick={showComments}>Comments {commentsVisible ? "▲" : "▼"}</button>
        </div>
      </div>
      {commentsVisible ? (
        <div className="pet-bottom-container">
          <div className='comments-container'>
            <div className='comments'>
              {pet.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
            {commentInputVisisble ? (
              <form className='comment-form' onSubmit={onSubmit}>
                <InputForm
                  name='comment'
                  type='text'
                  header='Comment'
                  onChange={onChange}
                />
                <input className='btn comment-form-add' type='submit' value='Add Comment' />
              </form>
            ) : <Fragment />}
          </div>
        </div>
      ) : <Fragment />}
    </div>
  );
};

export default Pet;
