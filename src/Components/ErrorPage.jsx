import React from "react";

const ErrorPage = (props) => {
  console.log(props.err);
  return (
    <div>
      <p>{props.err.toString()}</p>
    </div>
  );
};

export default ErrorPage;
