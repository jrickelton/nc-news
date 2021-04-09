import React from "react";
import DeleteComment from "./DeleteComment";
import Votes from "./Votes";

function Comments(props) {
  const { comments, username, deleteComment, removeComment } = props;
  if (comments.length === 0) {
    return <p>No comments</p>;
  }

  return (
    <div className="Comments">
      <ul>
        {comments.map((comment) => {
          if (props.deletedCommentIds.some((id) => id === comment.comment_id)) {
            return null;
          } else
            return (
              <li key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>{comment.author}</p>

                <p>Posted: {new Date(comment.created_at).toString()}</p>
                <DeleteComment
                  author={comment.author}
                  username={username}
                  deleteComment={deleteComment}
                  commentId={comment.comment_id}
                  removeComment={removeComment}
                />
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
