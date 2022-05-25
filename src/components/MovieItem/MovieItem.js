import React, { Component } from 'react';
import './MovieItem.css';
import { connect } from 'react-redux';
import { addMovieToFavorites } from '../../redux/actions';

class MovieItem extends Component {

    ifIdInFavorites = (imdbID) => {
        const selected = this.props.favorites.find((item) => {
            return item.imdbID === imdbID
        });
        if (selected) {
            return true;
        }
    }
    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button"
                        className="movie-item__add-button"
                        disabled={this.ifIdInFavorites(imdbID)}
                        onClick={() => this.props.addMovieToFavorites(imdbID)}
                        >{this.ifIdInFavorites(imdbID) ? 'Добавлено' : 'Добавить в список'}</button>
                </div>
            </article>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    addMovieToFavorites: (imdbID) => dispatch(addMovieToFavorites(imdbID))
  });
const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);