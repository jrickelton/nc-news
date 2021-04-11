import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import SortBy from "./SortBy";
import Error from "./Error";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: "created_at",
    sortByString: "Most Recent",
    order: "desc",
    err: "",
  };

  componentDidMount() {
    const { topic, username } = this.props;
    const { sortBy, order } = this.state;
    api
      .fetchArticles(topic, sortBy, order, username)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      prevProps.username !== this.props.username ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.order !== this.state.order
    ) {
      const { topic } = this.props;
      const { sortBy, order } = this.state;
      api
        .fetchArticles(topic, sortBy, order)
        .then((articles) => {
          this.setState({ articles, isLoading: false, err: "" });
        })
        .catch((err) => {
          this.setState({ err, isLoading: false });
        });
    }
  }

  setSortBy = (sortBy, event) => {
    const string = event.target.innerHTML;
    this.setState({ sortBy, sortByString: string });
  };

  setOrder = (order) => {
    this.setState({ order });
  };

  render() {
    const { articles, isLoading, sortByString, err } = this.state;
    const { topic } = this.props;
    const { username } = this.props;
    console.log(err);
    if (err) return <Error err={err} />;
    if (isLoading) return <p>Loading</p>;
    else
      return (
        <div className="ArticleList">
          {topic ? (
            <h2>{topic}</h2>
          ) : username ? (
            <h2>Posted By {username}</h2>
          ) : (
            <h2>All Articles</h2>
          )}
          <SortBy
            sortByString={sortByString}
            setSortBy={this.setSortBy}
            setOrder={this.setOrder}
            options={[
              { query: "created_at", string: "Date" },
              { query: "votes", string: "Votes" },
              { query: "comment_count", string: "Comment Count" },
            ]}
          />
          <ul>
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
