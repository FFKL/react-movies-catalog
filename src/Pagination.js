import React from 'react';
import classNames from 'classnames';

export class Pagination extends React.Component {
  calculateStartPage() {
    const { page, totalPages } = this.props;

    if (page === 1) return page;
    if (page === totalPages) return page - 2;
    return page - 1;
  }

  calculateEndPage() {
    const { page, totalPages } = this.props;

    if (page === totalPages) return totalPages;
    if (page === 1) return page + 2;
    return page + 1;
  }

  createPageRange(from, to) {
    return Array(to - from + 1)
      .fill(null)
      .map((_, idx) => from + idx);
  }

  createPageButtons() {
    const { totalPages } = this.props;

    const from = this.calculateStartPage();
    const to = this.calculateEndPage();

    return this.createPageRange(from, to).filter(
      (p) => p >= 1 && p <= totalPages
    );
  }

  render() {
    const { page, totalPages, updatePage } = this.props;

    return (
      <ul className="pagination justify-content-end">
        <li className={classNames('page-item', { disabled: page === 1 })}>
          <button className="page-link" onClick={() => updatePage(page - 1)}>
            &laquo;
          </button>
        </li>
        {this.createPageButtons().map((pageBtn) => (
          <li
            key={pageBtn}
            className={classNames('page-item', { active: pageBtn === page })}
          >
            <button className="page-link" onClick={() => updatePage(pageBtn)}>
              {pageBtn}
            </button>
          </li>
        ))}
        <li
          className={classNames('page-item', { disabled: page === totalPages })}
        >
          <button className="page-link" onClick={() => updatePage(page + 1)}>
            &raquo;
          </button>
        </li>
      </ul>
    );
  }
}
