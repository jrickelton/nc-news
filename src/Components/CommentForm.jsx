import React, { Component } from "react";
import * as api from "../api";

class CommentForm extends Component {
  state = {
    body: "",
    postErrorMsg: "",
  };

  handleChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = (event) => {
    const { articleId, username, updateComments } = this.props;
    const { body } = this.state;
    event.preventDefault();
    if (!body) {
      this.setState({ postErrorMsg: "You cannot post an empty comment" });
    } else if (!username) {
      this.setState({
        postErrorMsg: "You must be logged in to post a comment",
      });
    } else {
      api.postComment(articleId, body, username).then((newComment) => {
        updateComments(newComment);
      });
    }
  };

  render() {
    const { postErrorMsg } = this.state;
    return (
      <form className="CommentForm" onSubmit={this.handleSubmit}>
        <label htmlFor="PostComment">Post Comment</label>
        <br />
        <input type="text" id="comment" onChange={this.handleChange}></input>
        <br />
        <input type="submit"></input>
        {postErrorMsg ? <p>{postErrorMsg}</p> : null}
      </form>
    );
  }
}

export default CommentForm;
