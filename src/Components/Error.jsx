import React, { Component } from "react";

class Error extends Component {
  state = {
    err: "",
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ err: this.props.err, isLoading: false });
  }
  render() {
    const { err } = this.state;
    if (err) {
      return <p>{err.toString()}</p>;
    } else return <p>Error: Request failed with status code 404</p>;
  }
}

export default Error;
