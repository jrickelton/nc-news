import React from "react";

const SortBy = (props) => {
  const { sortByString, setOrder, options } = props;
  return (
    <ul>
      <li>Sorted By {sortByString}</li>
      {options.map((option) => {
        return (
          <li key={option.string}>
            <button
              onClick={(event) => {
                setOrder(option.query, event);
              }}
            >
              {option.string}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default SortBy;
