import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import SortBy from "./SortBy";
import Error from "./Error";
import Avatar from "./Avatar";

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
      this.setState({ isLoading: true });
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

  setLoading = () => {
    this.setState({ isLoading: true });
  };

  render() {
    const { articles, isLoading, sortByString, err } = this.state;
    const { topic } = this.props;
    const { username } = this.props;
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
            onClick={this.setLoading}
          />
          <div className="cards is-flex">
            {articles.map((article) => {
              return (
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <Avatar username={article.author} />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">
                          <Link to={`/articles/${article.article_id}`}>
                            {article.title}
                          </Link>
                        </p>
                        <p className="subtitle is-6">
                          <Link to={`/users/${article.author}`}>
                            @{article.author}
                          </Link>
                        </p>
                      </div>
                    </div>

                    <div className="content">
                      {article.body.slice(
                        0,
                        article.body.slice(0, 300).lastIndexOf(" ")
                      )}
                      ...{" "}
                      <Link to={`/articles/${article.article_id}`}>
                        Read more
                      </Link>
                      <br />
                      {new Date(article.created_at).toString()}
                    </div>
                  </div>
                  <footer className="card-footer">
                    <p className="card-footer-item">Votes: {article.votes}</p>
                    <p className="card-footer-item">
                      Comments: {article.comment_count}
                    </p>
                  </footer>
                </div>
              );
            })}
          </div>
        </div>
      );
  }
}

export default ArticleList;
