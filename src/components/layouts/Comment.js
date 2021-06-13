import React from "react";
import { Link } from "react-router-dom";

const Comment = ({ children, comment }) => {
  return (
    <div className='comment-container'>
      <div className='comment'>
        <Link to={'/user/' + comment.username}>{comment.username}</Link>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
