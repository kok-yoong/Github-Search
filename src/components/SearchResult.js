import React from "react";
import Moment from "moment";

export default class SearchResult extends React.Component {
  render() {
    let items = this.props.items;
    let error = this.props.error;
    let errorMsg = this.props.errorMsg;
    let isEmpty = this.props.isEmpty;
    let isSearch = this.props.isSearch;
    let total = this.props.total;

    if (error) {
      return <div>Error: {errorMsg}</div>;
    }

    if (isEmpty === true) {
      return <div></div>;
    }

    if (isSearch && total === 0) {
      return <div>No Result Found</div>;
    }

    if (isEmpty === true) {
      if (isSearch) {

        return <div>No Result Found</div>;
      } else {
        return <div></div>;
      }
    } else {
      return (
        <div>
          {items.map(item => (
            <div className="card" key={item.id}>
              <div className="row card-body">
                <div className="col-sm-8">
                  <h5>
                    <a href={item.html_url} target="_blank">
                      {item.full_name}
                    </a>
                  </h5>
                  <p>{item.description}</p>
                  <p>
                    <small className="text-muted">
                      Updated on{" "}
                      {Moment(item.updated_at).format("ddd MMM DD YYYY")}{" "}
                    </small>
                  </p>
                </div>
                <div className="col-sm-2">
                  <span className="card-title">{item.language}</span>
                </div>
                <div className="col-sm-2">{item.stargazers_count.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}
