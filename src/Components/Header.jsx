import React from "react";

function Header(props) {
  return (
    <header className="Header">
      <h1>📰 NC News</h1>
      <p>Logged in as {props.username}</p>
    </header>
  );
}

export default Header;
