import React, { Component } from "react";
import * as api from "../api";

class Votes extends Component {
  state = {
    votes: 0,
    voted: false,
  };

  componentDidMount() {
    const { votes } = this.props;
    this.setState({ votes });
  }

  handleClick(vote, event) {
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
    this.setState({ voted: true });
  }

  render() {
    const { username, author } = this.props;
    const { votes, voted } = this.state;
    if (username === author) return <p>Votes: {votes}</p>;
    else
      return (
        <div className="Votes">
          <button
            onClick={(event) => {
              this.handleClick(1, event);
            }}
            disabled={voted}
          >
            +
          </button>
          <button
            onClick={(event) => {
              this.handleClick(-1, event);
            }}
            disabled={voted}
          >
            -
          </button>
          <p>Votes: {this.state.votes}</p>
        </div>
      );
  }
}

export default Votes;
