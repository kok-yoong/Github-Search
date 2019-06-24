import React from "react";
import styles from "./App.css";
import axios from "axios";

import SearchResult from "./components/SearchResult";
import Paginations from "./components/Pagination";

class App extends React.Component {
  state = {
    error: null,
    errorMsg: "",
    isLoading: true,
    isSearch: false,
    query: null,
    items: [],
    total: 0,
    isEmpty: false,
    current_page: null,
    per_page: 10
  };

  getData(pg) {
    let q = this.state.query;

    let qs = "";
    this.setState({ error: false, errorMsg: null });

    {pg === "" || pg === null? this.setState({ current_page: 1 }): this.setState({ current_page: pg });}
    {q === ""? this.setState({ isEmpty: true, total: 0 }): this.setState({ isEmpty: false });}

    qs = `https://api.github.com/search/repositories?per_page=${this.state.per_page}&q=${this.state.query}&page=${pg}`;
console.log(qs)
    if (q !== "") {
      axios
        .get(qs)
        .then(res => {
          //console.log(res)
          this.setState({
           isSearch: true,
            isLoaded: true,
            items: res.data.items,
            total: res.data.total_count,
            error: false,
            errorMsg: null
          });
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          this.setState({ error: true, errorMsg: error.response.data.message });
          console.log(error.response.data.message);
        });
    } else {
      this.state.isEmpty = true;
    }
  }
  handleKeyPress(event) {
    if (event.key === "Enter") {
     
      this.state.query = event.target.value;
      this.state.current_page=1;
      this.getData(this.state.current_page);
    }
  }

  componentDidMount() {
    
    // document.addEventListener("keydown", e => this.handleKeyPress(e), false);
  }

  render() {
    const { total } = this.state;
    return (
      <div className="card">
        <h5 className="card-header">Github Search</h5>

        <div className="card-body">
          <div>
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback" />
              <input
                id="txtSearch"
                type="text"
                className="form-control"
                placeholder="Search"
                onKeyDown={this.handleKeyPress.bind(this)}
              />
            </div>
          </div>

          <h4>Total Count : {total.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h4>
          <SearchResult
            items={this.state.items}
            error={this.state.error}
            errorMsg={this.state.errorMsg}
            total={this.state.total}
            isEmpty={this.state.isEmpty}
            isSearch={this.state.isSearch}
          />
        </div>

        <br />

        <div className="col-lg-12 text-center">
          {total > 0 ? (
            <Paginations
              getData={this.getData.bind(this)}
              total={this.state.total}
              current_page={this.state.current_page}
              per_page={this.state.per_page}
            />
          ) : (
            <div />
          )}
        </div>

        <br />
      </div>
    );
  }
}

export default App;
