import React from 'react';

export class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      willWatch: false,
    };
  }

  render() {
    const {
      title,
      vote_average,
      backdrop_path,
      poster_path,
      id,
    } = this.props.movie;
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
          alt={title}
        />
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="mb-2 d-flex justify-content-end">
            Rating: {vote_average}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            {this.state.willWatch ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.setState({ willWatch: false });
                  this.props.removeMovieFromWillWatch(id);
                }}
              >
                Remove Will Watch
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  this.setState({ willWatch: true });
                  this.props.addMovieToWillWatch(this.props.movie);
                }}
              >
                Will Watch
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.props.removeMovie(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
