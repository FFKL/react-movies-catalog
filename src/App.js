import React from "react";
import MovieTabs from "./MovieTabs";
import { MovieItem } from "./MovieItem";
import { Pagination } from "./Pagination";
import { API_URL, API_KEY_3 } from "./api";

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      willWatch: [],
      sort_by: "popularity.desc",
      currentPage: 1,
      total_pages: null,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.sort_by !== this.state.sort_by ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchMovies();
    }
  }

  fetchMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.currentPage}`
    )
      .then((res) => res.json())
      .then(({ results: movies, total_pages }) =>
        this.setState({ movies, total_pages })
      );
  };

  addMovieToWillWatch = (movie) => {
    this.setState({
      willWatch: [...this.state.willWatch, movie],
    });
  };

  removeMovieFromWillWatch = (movieId) => {
    this.setState({
      willWatch: this.state.willWatch.filter((item) => item.id !== movieId),
    });
  };

  removeMovie = (movieId) => {
    this.removeMovieFromWillWatch(movieId);
    this.setState({
      movies: this.state.movies.filter((item) => item.id !== movieId),
    });
  };

  updateSortBy = (sort_by) => {
    this.setState({ sort_by, currentPage: 1 });
  };

  updateCurrentPage = (currentPage) => {
    this.setState({ currentPage });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-10">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-7">
                Всего страниц: {this.state.total_pages}
              </div>
              <div className="col-5">
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPages={this.state.total_pages}
                  updateCurrentPage={this.updateCurrentPage}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map((m) => (
                <div className="col-4 mb-4" key={m.id}>
                  <MovieItem
                    movie={m}
                    removeMovie={this.removeMovie}
                    addMovieToWillWatch={this.addMovieToWillWatch}
                    removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-2">
            <h4>Will Watch: {this.state.willWatch.length}</h4>
            <ul className="list-group">
              {this.state.willWatch.map((m) => (
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    {m.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
