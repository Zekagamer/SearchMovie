import React, { Component } from 'react';
import './ListPage.css';
import { connect } from 'react-redux';
import { getList, getMovieInfoByImdbID } from '../../redux/actions';

class ListPage extends Component {
   
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        this.props.getList(id);
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.props.title}</h1>
                <ul>
                    {this.props.listMovieDetails.map((item) => {
                        return (
                            <li key={item.imdbID} className="list-page__movie">
                                <img src={item.Poster} className="list-page__poster" alt="wrong"/>
                                <div>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} rel="noopener noreferrer" target="_blank" className="list-page__name">{item.Title}</a>
                                <p className="list-page__details">{item.Country} / {item.Year}</p>
                                <p className="list-page__details">{item.Genre}</p>
                                <p className="list-page__text">{item.Plot}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getList: (id) => dispatch(getList(id)),
    getMovieInfoByImdbID: (listMovies) => dispatch(getMovieInfoByImdbID(listMovies))
  });
const mapStateToProps = (state) => {
    return {
        title: state.title,
        // listMovies: state.listMovies,
        listMovieDetails: state.listMovieDetails
    }
  };
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);