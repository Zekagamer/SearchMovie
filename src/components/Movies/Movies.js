import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import { connect } from 'react-redux';

class Movies extends Component {
    
    render() { 
        return (
            <div>
                {this.props.movies ? <ul className="movies">
                    {this.props.movies.map((movie) => (
                        <li className="movies__item" key={movie.imdbID}>
                            <MovieItem {...movie} />
                        </li>
                    ))}
                </ul> : <p className="movies__error">Введен неверный запрос. Попробуйте еще раз.</p>}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
  };
export default connect(mapStateToProps)(Movies);