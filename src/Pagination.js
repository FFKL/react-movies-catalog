import React from "react";
import classNames from "classnames";

export class Pagination extends React.Component {
  calculateStartPageButton() {
    const { currentPage, totalPages } = this.props;

    if (currentPage === 1) {
      return currentPage;
    } else if (currentPage === totalPages) {
      return currentPage - 2;
    } else {
      return currentPage - 1;
    }
  }

  calculateEndPageButton() {
    const { currentPage, totalPages } = this.props;

    if (currentPage === totalPages) {
      return totalPages;
    } else if (currentPage === 1) {
      return currentPage + 2;
    } else {
      return currentPage + 1;
    }
  }

  createPageButtonsRange(from, to) {
    const pages = [];
    for (let i = from; i <= to; i++) pages.push(i);

    return pages;
  }

  createPageButtons() {
    const { totalPages } = this.props;

    const from = this.calculateStartPageButton();
    const to = this.calculateEndPageButton();

    return this.createPageButtonsRange(from, to).filter(
      (p) => p >= 1 && p <= totalPages
    );
  }

  render() {
    const { currentPage, totalPages, updateCurrentPage } = this.props;

    return (
      <ul className="pagination justify-content-end">
        <li
          className={classNames({
            "page-item": true,
            disabled: currentPage === 1,
          })}
        >
          <button
            className="page-link"
            onClick={() => updateCurrentPage(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {this.createPageButtons().map((page) => (
          <li
            className={classNames({
              "page-item": true,
              active: currentPage === page,
            })}
          >
            <button
              className="page-link"
              onClick={() => updateCurrentPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={classNames({
            "page-item": true,
            disabled: currentPage === totalPages,
          })}
        >
          <button
            className="page-link"
            onClick={() => updateCurrentPage(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    );
  }
}
