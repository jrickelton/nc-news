import React, { Component } from "react";
import { fetchArticle } from "../api";
import Comments from "./Comments.jsx";

class FullArticle extends Component {
  state = { article: {}, isLoading: true };
  componentDidMount() {
    const { article_id } = this.props;
    fetchArticle(article_id).then((article) => {
      this.setState({ article, isLoading: false });
    });
  }
  render() {
    const { article, isLoading } = this.state;
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
          <Comments articleId={article_id} />
        </main>
      );
  }
}

export default FullArticle;
