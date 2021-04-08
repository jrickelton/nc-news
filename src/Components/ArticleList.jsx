import React, { Component } from "react";
import { Link } from "@reach/router";
import { fetchArticles } from "../api";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: "",
  };

  componentDidMount() {
    const { topic } = this.props;
    fetchArticles(topic).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props || prevState.sortBy !== this.state.sortBy) {
      const { topic } = this.props;
      const { sortBy } = this.state;
      fetchArticles(topic, sortBy).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }
  }

  render() {
    console.log(this.state.sortBy);
    const { articles, isLoading } = this.state;
    if (isLoading) return <p>Loading</p>;
    else
      return (
        <div className="articleList">
          <ul>
            <li>Sort By:</li>
            <li>
              <button
                onClick={() => {
                  this.setState({ sortBy: "comment_count" });
                }}
              >
                Most Comments
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  this.setState({ sortBy: "created_at" });
                }}
              >
                Most Recent
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  this.setState({ sortBy: "votes" });
                }}
              >
                Votes
              </button>
            </li>
          </ul>
          <ul className="ArticleList">
            {articles.map((article) => {
              return (
                <li key={article.id} className="ArticleCard">
                  <h2>
                    <Link to={`/articles/${article.article_id}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p>{article.body}</p>
                  <p>Posted by: {article.author}</p>
                  <p>Votes: {article.votes}</p>
                  <p>Comments: {article.comment_count}</p>
                  <p>Posted: {new Date(article.created_at).toString()}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
  }
}

export default ArticleList;
