import React from "react";
import classNames from "classnames";

export default class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.sort_by !== nextProps.sort_by
  }

  render() {
    const { sort_by, updateSortBy } = this.props;
    const makeClasses = (value) =>
      classNames({
        btn: true,
        "nav-link": true,
        active: value === sort_by,
      });
    const handleClick = (value) => () => updateSortBy(value);
    return (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <button
            className={makeClasses("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            Popularity
          </button>
        </li>
        <li className="nav-item">
          <button
            className={makeClasses("revenue.desc")}
            onClick={handleClick("revenue.desc")}
          >
            Revenue
          </button>
        </li>
        <li className="nav-item">
          <button
            className={makeClasses("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            Vote average
          </button>
        </li>
      </ul>
    );
  }
}
