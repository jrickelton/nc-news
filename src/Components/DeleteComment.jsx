import React from "react";
import * as api from "../api";

const DeleteComment = (props) => {
  const { commentId } = props;
  const handleClick = (event) => {
    api.deleteComment(commentId).then((commentId) => {
      props.removeComment(commentId);
    });
  };
  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteComment;
