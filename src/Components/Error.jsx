import React from "react";

const Error = (props) => {
  console.log(props.err);
  return (
    <div className="Error">
      <p>{props.err.toString()}</p>
    </div>
  );
};

export default Error;
