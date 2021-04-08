import React, { Component } from "react";

class CommentForm extends Component {
  state = {
    body: "",
    username: "jessjelly",
  };

  handleChange = (event) => {
    this.setState({ body: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props
      .postComment(this.props.articleId, this.state.body, this.state.username)
      .then((newComment) => {
        this.props.updateComments(newComment);
      });
  };
  render() {
    return (
      <form className="CommentForm" onSubmit={this.handleSubmit}>
        <label htmlFor="PostComment">Post Comment</label>
        <br />
        <input type="text" id="comment" onChange={this.handleChange}></input>
        <br />
        <input type="submit"></input>
      </form>
    );
  }
}

export default CommentForm;
