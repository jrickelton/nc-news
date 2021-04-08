import React from "react";

function Comments(props) {
  const { comments } = props;
  if (comments.length === 0) {
    return <p>No comments</p>;
  }
  return (
    <div className="Comments">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <p>{comment.body}</p>
              <p>{comment.author}</p>
              <p>Votes: {comment.votes}</p>
              <p>Posted: {new Date(comment.created_at).toString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Comments;
