import React, { Component } from "react";
import { Router } from "@reach/router";
import ArticleList from "./ArticleList";
import FullArticle from "./FullArticle";
import Profile from "./Profile";

class Content extends Component {
  render() {
    return (
      <main className="Content">
        <Router primary={false}>
          <ArticleList path="/" />
          <ArticleList path="/:topic" sortBy="created_at" />
          <FullArticle
            username={this.props.username}
            path="/articles/:article_id"
          />
          <Profile path="/users/:username" />
        </Router>
      </main>
    );
  }
}

export default Content;
