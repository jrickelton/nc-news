import React, { Component } from "react";
import ArticleList from "./ArticleList";

class Content extends Component {
  render() {
    return (
      <main className="Content">
        <ArticleList />
      </main>
    );
  }
}

export default Content;
