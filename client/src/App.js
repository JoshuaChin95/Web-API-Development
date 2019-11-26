import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import Popup from 'react-popup';
import './Popup.css';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAllMovies = () => {
    axios
      .get('/getallmovies')
      .then(result => {
        this.setState({ movies: result.data });
        console.log(this.state.movies);
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getAllMovies();
  }

  handleSubmit(e) {
    const query = `/getmovie?title=${this.input.value}`;

    console.log(query);
    e.preventDefault();
    axios
      .get(query)
      .then(result => {
        console.log(result);
        if (result.data === 'Not found') {
          Popup.alert('Movie Not Found');
        }
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  deleteRecord = value => {
    console.log('to delete: ', value);
    const query = `/deletemovie?title=${value}`;
    axios
      .get(query)
      .then(result => {
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  //https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
  //todo add buttons to delete rows
  //https://codepen.io/aaronschwartz/pen/awOyQq?editors=0010
  //https://github.com/react-tools/react-table/issues/324
  render() {
    var data = this.state.movies;
    data = data;

    return (
      <div className="App">
        <div className="jumbotron text-center header">
          <h1>Movies Finder</h1>
          <p>Search for Movies</p>
        </div>
        <div className="container search">
          <div className="col-sm-12">
            <p />
            <form onSubmit={this.handleSubmit}>
              <label>Enter title of the Movie:</label>
              <input
                type="text"
                class="form-control"
                ref={input => (this.input = input)}
              />
              <p />
              <input type="submit" value="Search Movie" />
            </form>
            <p />
          </div>
          <div>
            <Popup />
          </div>
        </div>

        <div className="container">
          <div className="col-sm-12">
            <p />
            <ReactTable
              data={data}
              columns={[
                {
                  Header: 'Poster',
                  Poster: 'Poster',
                  Cell: row => {
                    return (
                      <div>
                        <img height={250} src={row.original.poster} />
                      </div>
                    );
                  }
                },             
                {
                  Header: 'Title',
                  accessor: 'title'
                },
                {
                  Header: 'Year',
                  accessor: 'year'
                },
                {
                  Header: 'Genre',
                  accessor: 'genre',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Actors',
                  accessor: 'actors',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Plot',
                  accessor: 'plot',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Delete',
                  accessor: 'title',
                  Cell: ({ value }) => (
                    <button
                    class="btn btn-primary"
                      onClick={() => {
                        this.deleteRecord(value);
                      }}
                    >
                      Delete Movie
                    </button>
                  )
                },
              ]}
              defaultPageSize={7}
              className="-striped -highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
