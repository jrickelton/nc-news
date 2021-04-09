import React from "react";

const SortBy = (props) => {
  const { sortByString, setSortBy, setOrder, options } = props;
  return (
    <ul>
      <li>Sorted By {sortByString}</li>
      {options.map((option) => {
        return (
          <li key={option.string}>
            <button
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
          onClick={() => {
            setOrder("asc");
          }}
        >
          Ascending
        </button>
      </li>
      <li>
        <button
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
