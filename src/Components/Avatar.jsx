import React, { Component } from "react";
import * as api from "../api";

class Avatar extends Component {
  state = {
    avatarURL: "",
    isLoading: true,
  };

  componentDidMount() {
    const { username } = this.props;
    api.fetchUser(username).then((userData) => {
      this.setState({ avatarURL: userData.avatar_url, isLoading: false });
    });
  }
  render() {
    const { username } = this.props;
    const { avatarURL, isLoading } = this.state;
    if (isLoading) {
      return null;
    }
    return (
      <div>
        <img src={avatarURL} alt={`${username}'s Avatar`} className="Avatar" />
      </div>
    );
  }
}

export default Avatar;
