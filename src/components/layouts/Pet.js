import React, { useContext, useEffect, useState } from "react";

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
    updatePet,
  } = authContext;

  const [data, setData] = useState({
    commentsVisible: false,
    commentInputVisisble: false,
    comment: ""
  });

  const { commentsVisible, commentInputVisisble, comment } = data;

  useEffect(() => {
    if (loading) {
      if (!isAuthenticated) loadUser();
      return;
    }

    if (commentInputVisisble && !commentsVisible) {
      setData({ ...data, commentsVisible: true });
    }

    // eslint-disable-next-line
  }, [pet, commentInputVisisble]);

  const showComments = (e) => setData({ ...data, commentsVisible: !commentsVisible });
  const showCommentInput = (e) => setData({ ...data, commentInputVisisble: !commentInputVisisble });

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
    updatePet({
      id: pet.id,
      rating: i
    });
  };

  return (
    <div className={'pet ' + (commentsVisible ? "pet-wide" : "")}>
      <div className="pet-left-container">
        <div className='pet-header' >
          <h3>Name: {pet.name}</h3>
          <Star rating={pet.rating} onClick={onUpdateRating} />
        </div>
        <img className='pet-image' src={pet.image} alt=''></img>
        <div className='data'>
          <ul className='data-left'>
            <button onClick={showComments}>Comments</button>
          </ul>
          <ul className='data-right'>
            <button onClick={showCommentInput}>Leave A Comment</button>
          </ul>
        </div>
      </div>
      {commentsVisible === false || (
        <div className="pet-right-container">
          <div className='comments-container'>
            {commentInputVisisble === false || (
              <form className='comment-form' onSubmit={onSubmit}>
                <InputForm
                  name='comment'
                  type='text'
                  header='Comment'
                  onChange={onChange}
                />
                <input className='comment-form-add' type='submit' value='Add Comment' />
              </form>
            )}
            <div className='comments'>
              {pet.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pet;
