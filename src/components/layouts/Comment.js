import React from "react";
import { Link } from "react-router-dom";

const Comment = ({ children, comment }) => {
  return (
    <div className='comment-container'>
      <div className='comment'>
        <Link to={'/user/' + comment.user.id}>{comment.user.username}</Link>
        <p>{comment.message}</p>
      </div>
    </div>
  );
};

export default Comment;
