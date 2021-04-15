import React from "react";

const SortBy = (props) => {
  const { sortByString, setSortBy, setOrder, options } = props;
  return (
    <ul className="SortBy">
      <li>Sorted By {sortByString}</li>
      {options.map((option) => {
        return (
          <li key={option.string}>
            <button
              className="button is-primary is-rounded"
              onClick={(event) => {
                setSortBy(option.query, event);
              }}
            >
              {option.string}
            </button>
          </li>
        );
      })}
      <li>
        <button
          className="button is-link is-rounded"
          onClick={() => {
            setOrder("asc");
          }}
        >
          Ascending
        </button>
      </li>
      <li>
        <button
          className="button is-link is-rounded"
          onClick={() => {
            setOrder("desc");
          }}
        >
          Descending
        </button>
      </li>
    </ul>
  );
};

export default SortBy;
