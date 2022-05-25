import React, { Component } from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { removeMovieFromFavorites, postFavorites } from '../../redux/actions';
import { Link } from 'react-router-dom';

class Favorites extends Component {
    state = {
        listName: '',
        isClicked: false
    }
    listNameChangeHandler = (event) => {
        this.setState({ listName: event.target.value });
    }
    getImdbIDArray = () => {
        let favouritesIDArray = this.props.favorites.map((item) => {
            return item.imdbID;
        })
        return favouritesIDArray;
    }

    saveListHandler = () => {
        this.setState({ isClicked: true });
        this.props.postFavorites(this.state.listName, this.getImdbIDArray());
    }

    render() { 
        return (
            <div className="favorites">
                <input 
                    placeholder="Новый список" 
                    className="favorites__name"
                    disabled={this.state.isClicked}
                    onChange={this.listNameChangeHandler} 
                    />
                <ul className="favorites__list">
                    {this.props.favorites.map((item) => {
                        return <li key={item.imdbID}>
                            <button 
                                className="favorites__delete"
                                onClick={() => this.props.removeMovieFromFavorites(item.imdbID)}>
                                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                            </button>
                            {item.Title} ({item.Year})
                            </li>;
                    })}
                </ul>
                {!this.state.isClicked ? <button type="button" className="favorites__save" onClick={this.saveListHandler}>Сохранить список</button> 
                : <Link to={'/list/' + this.props.listID} target="_blank">Перейти к выбранным фильмам</Link>}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    removeMovieFromFavorites: (imdbID) => dispatch(removeMovieFromFavorites(imdbID)),
    postFavorites: (listName, favouritesIDArray) => dispatch(postFavorites(listName, favouritesIDArray))
  });
const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
        listID: state.listID
    }
  };
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);