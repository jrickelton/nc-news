import React, { Component } from "react";
import Comments from "./Comments.jsx";
import CommentForm from "./CommentForm";
import Votes from "./Votes";
import * as api from "../api";

class FullArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    comments: [],
    username: "jessjelly",
    deletedCommentIds: [],
  };

  componentDidMount() {
    const { article_id } = this.props;
    Promise.all([
      api.fetchArticle(article_id),
      api.fetchComments(article_id),
    ]).then((data) =>
      this.setState({ article: data[0], comments: data[1], isLoading: false })
    );
  }

  updateComments = (newComment) => {
    this.setState((currState) => {
      return {
        comments: [newComment, ...currState.comments],
      };
    });
  };

  removeComment = (commentId) => {
    this.setState((currState) => {
      return { deletedCommentIds: [commentId, ...currState.deletedCommentIds] };
    });
  };

  render() {
    const {
      article,
      isLoading,
      comments,
      username,
      deletedCommentIds,
    } = this.state;
    const {
      title,
      body,
      author,
      votes,
      comment_count,
      created_at,
      article_id,
    } = article;
    if (isLoading) return <p>Loading...</p>;
    else
      return (
        <main>
          <div className="Article">
            <h2>{title}</h2>
            <p>{body}</p>
            <p>Posted by: {author}</p>
            <p>Comments: {comment_count}</p>
            <p>Posted: {new Date(created_at).toString()}</p>
          </div>
          <Votes
            votes={votes}
            articleId={article_id}
            username={username}
            author={author}
          />
          <CommentForm
            articleId={article_id}
            username={username}
            postComment={api.postComment}
            updateComments={this.updateComments}
          />
          <Comments
            articleId={article_id}
            comments={comments}
            username={username}
            removeComment={this.removeComment}
            deletedCommentIds={deletedCommentIds}
          />
        </main>
      );
  }
}

export default FullArticle;
