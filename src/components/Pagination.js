import React from "react";


export default class Pagination extends React.Component {

  render() {
    let renderPageNumbers;
    let totalPage, selectedPage, fromPage, toPage, lastPage;
    let toFirst,
      toLast = "";

    const pageNumbers = [];
    if (this.props.total !== null) {
      totalPage = Math.ceil(this.props.total / this.props.per_page);
      {
        this.props.current_page === null
          ? (selectedPage = 1)
          : (selectedPage = this.props.current_page);
      }

      lastPage = totalPage;

      if (totalPage <= 5) {
        fromPage = 1;
        toPage = lastPage;
      } else if (selectedPage - 2 <= 0) {
        fromPage = 1;
        toPage = 5;
      } else if (selectedPage + 2 >= totalPage) {
        fromPage = selectedPage - 5;
        toPage = lastPage;
      } else {
        fromPage = selectedPage - 2;
        toPage = selectedPage + 2;
      }

      if (totalPage !== 0 && selectedPage - 5 > 1) {
        toFirst = <a onClick={() => this.props.getData(1)}>1</a>;
      }

      for (let i = fromPage; i <= toPage; i++) {
        pageNumbers.push(i);
      }

      if (lastPage !== 0 && selectedPage + 2 < lastPage) {
        toLast = <a onClick={() => this.props.getData(lastPage)}>{lastPage}</a>;
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.props.current_page === number ? "active" : "";
        return (
          <a
            key={number}
            className={classes}
            onClick={() => this.props.getData(number)}
          >
            {number}
          </a>
        );
      });
    }

    return (
      <div className="pagination">
        {selectedPage !== 1 ? (
          <a onClick={() => this.props.getData(selectedPage - 1)}>&laquo;</a>
        ) : (
          <a href="#" className="inactive">
            &laquo;
          </a>
        )}

        {toFirst !== "" ? toFirst : null}
        {totalPage !== 0 && selectedPage - 5 > 1 ? <span>...</span> : null}
        {renderPageNumbers}
        {lastPage !== 0 && selectedPage + 2 < lastPage ? <span>...</span> : null}
        {toLast !== "" ? toLast : null}

        {selectedPage !== lastPage ? (
          <a onClick={() => this.props.getData(lastPage + 1)}>&raquo;</a>
        ) : (
          <a href="#" className="inactive">
            &raquo;
          </a>
        )}
      </div>
    )

    
  }
}
