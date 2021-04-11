import React, { Component } from "react";
import { Router } from "@reach/router";
import ArticleList from "./ArticleList";
import FullArticle from "./FullArticle";
import Profile from "./Profile";
import Error from "./Error";

class Content extends Component {
  render() {
    return (
      <main className="Content">
        <Router primary={false}>
          <ArticleList path="/" />
          <FullArticle
            username={this.props.username}
            path="/articles/:article_id"
          />
          <ArticleList path="/:topic" />
          <Profile path="/users/:username" />
          <Error default />
        </Router>
      </main>
    );
  }
}

export default Content;
