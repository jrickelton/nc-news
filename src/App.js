import "./App.scss";
import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Content from "./Components/Content";

import React, { Component } from "react";

class App extends Component {
  state = {
    username: "jessjelly",
  };

  render() {
    return (
      <div className="App">
        <Header username={this.state.username} />

        <Nav />

        <Content username={this.state.username} />
      </div>
    );
  }
}

export default App;
