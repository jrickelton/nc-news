import React from "react";

const DeleteComment = (props) => {
  const { author, username, deleteComment, commentId } = props;
  const handleClick = (event) => {
    deleteComment(commentId).then((commentId) => {
      props.removeComment(commentId);
    });
  };
  if (author === username) {
    return <button onClick={handleClick}>Delete</button>;
  } else return null;
};

export default DeleteComment;
