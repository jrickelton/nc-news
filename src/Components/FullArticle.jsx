import React, { Component } from "react";
import { fetchArticle } from "../api";

class FullArticle extends Component {
  state = { article: {}, isLoading: true };
  componentDidMount() {
    fetchArticle(this.props.article_id).then((res) => {
      this.setState({ article: res.article[0], isLoading: false });
    });
  }
  render() {
    const article = this.state.article;
    console.log(article);
    if (this.state.isLoading) return <p>Loading...</p>;
    else
      return (
        <main>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <p>Posted by: {article.author}</p>
          <p>Votes: {article.votes}</p>
          <p>Comments: {article.comment_count}</p>
          <p>Posted: {new Date(article.created_at).toString()}</p>
        </main>
      );
  }
}

export default FullArticle;
