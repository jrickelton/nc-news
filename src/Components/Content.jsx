import React, { Component } from "react";
import { Router } from "@reach/router";
import ArticleList from "./ArticleList";
import FullArticle from "./FullArticle";

class Content extends Component {
  render() {
    return (
      <main className="Content">
        <Router primary={false}>
          <ArticleList path="/" />
          <ArticleList path="/:topic" sortBy="created_at" />
          <FullArticle path="/articles/:article_id" />
        </Router>
      </main>
    );
  }
}

export default Content;
