import React, { Component } from "react";
import { Link } from "@reach/router";
import { fetchTopics } from "../api";

class Nav extends Component {
  state = {
    topics: [],
    isLoading: true,
  };
  componentDidMount() {
    fetchTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }
  render() {
    const { isLoading, topics } = this.state;
    if (isLoading) return <p>Loading...</p>;
    else
      return (
        <nav>
          <ul>
            <li>
              <Link to="/">All topics</Link>
            </li>
            {topics.map((topic) => {
              return (
                <li>
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
