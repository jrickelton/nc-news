import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: "",
    sortByString: "Most Recent",
  };

  componentDidMount() {
    const { topic } = this.props;
    api.fetchArticles(topic).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props || prevState.sortBy !== this.state.sortBy) {
      const { topic } = this.props;
      const { sortBy } = this.state;
      api.fetchArticles(topic, sortBy).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }
  }

  render() {
    const { articles, isLoading, sortByString } = this.state;
    const { topic } = this.props;
    if (isLoading) return <p>Loading</p>;
    else
      return (
        <div className="articleList">
          {topic ? <h2>{topic}</h2> : <h2>All Articles</h2>}
          <ul>
            <li>Sorted By {sortByString}</li>
            <li>
              <button
                onClick={() => {
                  this.setState({
                    sortBy: "comment_count",
                    sortByString: "Most Comments",
                  });
                }}
              >
                Most Comments
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  this.setState({
                    sortBy: "created_at",
                    sortByString: "Most Recent",
                  });
                }}
              >
                Most Recent
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  this.setState({
                    sortBy: "votes",
                    sortByString: "Most Votes",
                  });
                }}
              >
                Most Votes
              </button>
            </li>
          </ul>
          <ul className="ArticleList">
            {articles.map((article) => {
              return (
                <li key={article.article_id} className="ArticleCard">
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
