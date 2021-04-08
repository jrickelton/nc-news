import React, { Component } from "react";

class CommentForm extends Component {
  state = {
    body: "",
  };

  handleChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = (event) => {
    const { articleId, username, postComment, updateComments } = this.props;
    const { body } = this.state;
    event.preventDefault();
    postComment(articleId, body, username).then((newComment) => {
      updateComments(newComment);
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
