import React, { Component } from "react";
import * as api from "../api";

class Votes extends Component {
  state = {
    votes: 0,
  };

  componentDidMount() {
    const { votes } = this.props;
    this.setState({ votes });
  }

  handleClick(vote) {
    const { articleId, commentId } = this.props;
    if (articleId) {
      api.patchArticleVotes(articleId, vote).then(() => {
        this.setState((prevState) => {
          return { votes: prevState.votes + parseInt(vote) };
        });
      });
    }
    if (commentId) {
      api.patchCommentVotes(commentId, vote).then(() => {
        this.setState((prevState) => {
          return { votes: prevState.votes + parseInt(vote) };
        });
      });
    }
  }

  render() {
    const { username, author } = this.props;
    const { votes } = this.state;
    if (username === author) return <p>Votes: {votes}</p>;
    else
      return (
        <div>
          <button
            onClick={() => {
              this.handleClick(1);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              this.handleClick(-1);
            }}
          >
            -
          </button>
          <p>Votes: {this.state.votes}</p>
        </div>
      );
  }
}

export default Votes;
