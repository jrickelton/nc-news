import React from "react";
import { Link } from "@reach/router";

function Header(props) {
  return (
    <header className="Header">
      <h1>
        <Link to="/">📰 NC News</Link>
      </h1>
      <p>Logged in as {props.username}</p>
    </header>
  );
}

export default Header;
