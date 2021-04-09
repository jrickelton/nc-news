import React from "react";

const SortBy = (props) => {
  const { sortByString, setOrder } = props;
  return (
    <ul>
      <li>Sorted By {sortByString}</li>
      <li>
        <button
          onClick={(event) => {
            setOrder("comment_count", event);
          }}
        >
          Comments
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            setOrder("created_at", event);
          }}
        >
          Date
        </button>
      </li>
      <li>
        <button
          onClick={(event) => {
            setOrder("votes", event);
          }}
        >
          Votes
        </button>
      </li>
    </ul>
  );
};

export default SortBy;
