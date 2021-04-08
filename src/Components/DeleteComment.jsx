import React from "react";
import * as api from "../api";

const DeleteComment = (props) => {
  const { author, username, commentId } = props;
  const handleClick = (event) => {
    api.deleteComment(commentId).then((commentId) => {
      props.removeComment(commentId);
    });
  };
  if (author === username) {
    return <button onClick={handleClick}>Delete</button>;
  } else return null;
};

export default DeleteComment;
