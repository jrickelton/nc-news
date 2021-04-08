import React, { Component } from "react";
import Comments from "./Comments.jsx";
import CommentForm from "./CommentForm";
import * as api from "../api";

class FullArticle extends Component {
  state = { article: {}, isLoading: true, comments: [] };

  componentDidMount() {
    const { article_id } = this.props;
    Promise.all([
      api.fetchArticle(article_id),
      api.fetchComments(article_id),
    ]).then((data) =>
      this.setState({ article: data[0], comments: data[1], isLoading: false })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.comments !== prevState.comments) {
      // console.log(this.state);
    }
  }

  updateComments = (newComment) => {
    this.setState((currState) => {
      return {
        comments: [newComment, ...currState.comments],
      };
    });
  };

  render() {
    const { article, isLoading, comments } = this.state;
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
            <p>Votes: {votes}</p>
            <p>Comments: {comment_count}</p>
            <p>Posted: {new Date(created_at).toString()}</p>
          </div>
          <CommentForm
            articleId={article_id}
            postComment={api.postComment}
            updateComments={this.updateComments}
          />
          <Comments articleId={article_id} comments={comments} />
        </main>
      );
  }
}

export default FullArticle;
