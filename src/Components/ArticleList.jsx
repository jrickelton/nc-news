import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import SortBy from "./SortBy";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: "created_at",
    sortByString: "Most Recent",
  };

  componentDidMount() {
    const { topic, username } = this.props;
    const { sortBy } = this.state;
    api.fetchArticles(topic, sortBy, username).then((articles) => {
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

  setOrder = (sortBy, event) => {
    console.log(sortBy, this.state);
    const string = event.target.innerHTML;
    this.setState({ sortBy, sortByString: string });
  };

  render() {
    const { articles, isLoading, sortByString } = this.state;
    const { topic } = this.props;
    const { username } = this.props;
    if (isLoading) return <p>Loading</p>;
    else
      return (
        <div className="articleList">
          {topic ? (
            <h2>{topic}</h2>
          ) : username ? (
            <h2>Posted By {username}</h2>
          ) : (
            <h2>All Articles</h2>
          )}
          <SortBy
            sortByString={sortByString}
            setOrder={this.setOrder}
            options={[
              { query: "created_at", string: "Date" },
              { query: "votes", string: "Votes" },
              { query: "comment_count", string: "Comment Count" },
            ]}
          />
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
                  <p>
                    Posted by:{" "}
                    <Link to={`/users/${article.author}`}>
                      {article.author}
                    </Link>
                  </p>
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
