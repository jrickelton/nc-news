import React, { Component } from "react";
import * as api from "../api";
import ArticleList from "./ArticleList";
import Error from "./Error";

class Profile extends Component {
  state = {
    username: "",
    avatar_url: "",
    name: "",
    isLoading: true,
    err: "",
  };

  componentDidMount() {
    const { username } = this.props;
    api
      .fetchUser(username)
      .then((userdata) => {
        const { username, avatar_url, name } = userdata;
        console.log(username, avatar_url, name);
        this.setState({ username, avatar_url, name, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  render() {
    const { username, avatar_url, name, isLoading, err } = this.state;
    if (isLoading) return <p>Loading...</p>;
    if (err) return <Error err={err} />;
    else
      return (
        <div className="Profile">
          <h2>{username}</h2>
          <p>{name}</p>
          <img src={avatar_url} alt={`${username}'s avatar`} />
          <ArticleList sort_by="created_at" username={username} />
        </div>
      );
  }
}

export default Profile;
