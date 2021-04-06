import React, { Component } from "react";

class ArticleList extends Component {
  state = {
    articles: ["article1", "article2", "article3"],
  };
  render() {
    return (
      <ul>
        {this.state.articles.map((article) => {
          return <li>{article}</li>;
        })}
      </ul>
    );
  }
}

export default ArticleList;
