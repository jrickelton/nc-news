import React, { Component } from "react";
import { Link } from "@reach/router";
import { fetchArticles } from "../api";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  componentDidMount() {
    const { topic } = this.props;
    fetchArticles(topic).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { topic } = this.props;
      fetchArticles(topic).then((articles) => {
        this.setState({ articles, isLoading: false });
      });
    }
  }

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <p>Loading</p>;
    else
      return (
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
      );
  }
}

export default ArticleList;
