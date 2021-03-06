import React, { Component } from "react";
import { Link } from "@reach/router";
import { fetchTopics } from "../api";

class Nav extends Component {
  state = {
    topics: [],
    isLoading: true,
  };
  componentDidMount() {
    fetchTopics()
      .then((topics) => {
        this.setState({ topics, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }
  render() {
    const { isLoading, topics, err } = this.state;
    if (isLoading) return <p>Loading...</p>;
    if (err) return <p>Error: {err}</p>;
    else
      return (
        <nav className="Nav">
          <ul>
            <li>
              <Link to="/">All topics</Link>
            </li>
            {topics.map((topic) => {
              return (
                <li key={topic.slug}>
                  <Link to={`/${topic.slug}`}>{topic.slug}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      );
  }
}

export default Nav;
