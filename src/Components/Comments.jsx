import React from "react";
import DeleteComment from "./DeleteComment";

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
          if (props.deletedCommentIds.some((id) => id === comment.comment_id)) {
            return null;
          } else
            return (
              <li key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>{comment.author}</p>
                <p>Votes: {comment.votes}</p>
                <p>Posted: {new Date(comment.created_at).toString()}</p>
                <DeleteComment
                  author={comment.author}
                  username={props.username}
                  deleteComment={props.deleteComment}
                  commentId={comment.comment_id}
                  removeComment={props.removeComment}
                />
              </li>
            );
        })}
      </ul>
    </div>
  );
}

export default Comments;
