import React, { Component } from "react";
import { fetchComments } from "../api";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
  };
  componentDidMount() {
    const { articleId } = this.props;
    fetchComments(articleId).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }
  render() {
    const { isLoading, comments } = this.state;
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className="Comments">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => {
            return (
              <li>
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
}

export default Comments;
