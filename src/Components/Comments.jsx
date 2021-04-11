import React from "react";
import DeleteComment from "./DeleteComment";
import Votes from "./Votes";
import { Link } from "@reach/router";

function Comments(props) {
  const { comments, username, deleteComment, removeComment } = props;
  if (comments.length === 0) {
    return <p>No comments</p>;
  }

  return (
    <div className="Comments">
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <p>{comment.body}</p>
              <Link to={`/users/${comment.author}`}>
                <p>{comment.author}</p>
              </Link>

              <p>Posted: {new Date(comment.created_at).toString()}</p>
              {comment.author === username ? (
                <DeleteComment
                  author={comment.author}
                  username={username}
                  deleteComment={deleteComment}
                  commentId={comment.comment_id}
                  removeComment={removeComment}
                />
              ) : null}

              <Votes
                votes={comment.votes}
                commentId={comment.comment_id}
                username={username}
                author={comment.author}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Comments;
