import React, { Component } from "react";
import { Link } from "@reach/router";
import Comments from "./Comments.jsx";
import CommentForm from "./CommentForm";
import Votes from "./Votes";
import SortBy from "./SortBy";
import ErrorPage from "./ErrorPage";
import * as api from "../api";

class FullArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    comments: [],
    username: "",
    deletedCommentIds: [],
    commentSortBy: "",
    commentSortByString: "Date",
    err: "",
  };

  componentDidMount() {
    const { article_id, username } = this.props;
    Promise.all([api.fetchArticle(article_id), api.fetchComments(article_id)])
      .then((data) =>
        this.setState({
          article: data[0],
          comments: data[1],
          username: username,
          isLoading: false,
        })
      )
      .catch((err) => {
        this.setState({ err, isLoading: false });
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { commentSortBy } = this.state;
    const { article_id } = this.props;
    if (this.state.commentSortBy !== prevState.commentSortBy) {
      api
        .fetchComments(article_id, commentSortBy)
        .then((comments) => {
          this.setState({ comments });
        })
        .catch((err) => {
          this.setState({ err });
        });
    }
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

  setOrder = (commentSortBy, event) => {
    const string = event.target.innerHTML;
    this.setState({ commentSortBy, commentSortByString: string });
  };

  render() {
    const {
      article,
      isLoading,
      comments,
      username,
      deletedCommentIds,
      err,
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
    if (err) return <ErrorPage err={err} />;
    else
      return (
        <main>
          <div className="Article">
            <h2>{title}</h2>
            <p>{body}</p>
            <p>
              Posted by: <Link to={`/users/${author}`}>{author}</Link>
            </p>
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
            updateComments={this.updateComments}
          />
          <h3>Comments</h3>
          <SortBy
            sortByString={this.state.commentSortByString}
            setOrder={this.setOrder}
            options={[
              { query: "created_at", string: "Date" },
              { query: "votes", string: "Votes" },
            ]}
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
