import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../store/reducers/movie-reducer.js";
import { Link } from "react-router-dom";
import "./styles.css";
import { Header } from "../layout/header.jsx";
import {
  addItemToList,
  addListToBasket,
  clearList,
  removeItemFromList,
  setIsLoading,
  setListId,
  setListName,
} from "../store/reducers/basket-reducer.js";
import { saveListToServerMock } from "../utils/save-list-to-server-mock.js";

export const Index = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
  const isLoading = useSelector((state) => state.basket.isLoading);
  const basketList = useSelector((state) => state.basket.list);
  const [movieName, setMovieName] = useState("");
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (query) => {
    try {
      const response = await fetch(
        `https://omdbapi.com/?apikey=3558bcba&s=${query}`,
      );
      const data = await response.json();
      if (data.Response === "True") {
        return data.Search;
      } else {
        setError(data.Error);
        return [];
      }
    } catch (error) {
      setError("Failed to fetch movies.");
      return [];
    }
  }, []);

  const onMovieChange = useCallback((event) => {
    setMovieName(event.target.value?.trim());
  }, []);

  const searchMovies = useCallback(() => {
    if (movieName.trim() !== "") {
      fetchMovies(movieName.trim()).then((movies) =>
        dispatch(setMovies(movies)),
      );
    }
  }, [dispatch, fetchMovies, movieName]);

  const randomizeMovie = useCallback(async () => {
    const variants = [
      "the dark knight",
      "inception",
      "interstellar",
      "tenet",
      "avatar",
      "gladiator",
      "titanic",
      "matrix",
      "godfather",
    ];
    const promises = variants.map((variant) => fetchMovies(variant));
    const results = await Promise.all(promises);
    const combinedMovies = results.flat().slice(0, 20); // Fetch 20 movies
    dispatch(setMovies(combinedMovies));
    setMovieName("");
  }, [dispatch, fetchMovies]);

  useEffect(() => {
    randomizeMovie();
  }, [randomizeMovie]);

  const handleRedirect = useCallback(() => {
    // Reset movies to default
    randomizeMovie();
  }, [randomizeMovie]);

  const addToList = (id) => {
    return () => {
      if (basketList.id) dispatch(clearList());
      dispatch(addItemToList(id));
    };
  };

  const changeListName = (event) => {
    dispatch(setListName(event.target.value));
  };

  const removeFromList = (id) => {
    return () => {
      dispatch(removeItemFromList(id));
    };
  };

  const saveListToBasket = async () => {
    dispatch(setIsLoading(true));
    const newList = await saveListToServerMock(basketList);
    dispatch(setListId(newList.id));
    dispatch(addListToBasket(newList));
    dispatch(setIsLoading(false));
  };

  return (
    <>
      <Header onRedirect={handleRedirect}>
        <input
          type="text"
          value={movieName}
          onChange={onMovieChange}
          placeholder="Search for a movie..."
          className="navbar-search-input"
        />
        <button onClick={searchMovies} className="search-button">
          Search
        </button>
      </Header>

      <div className="main-container">
        <div className="movies-container">
          <h1 className="page-title">Movies</h1>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <ul className="movie-list">
              {movies.map((movie) => (
                <li key={movie.imdbID} className="movie-item">
                  <Link to={`/movie/${movie.imdbID}`}>
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="movie-poster"
                    />
                  </Link>

                  <Link to={`/movie/${movie.imdbID}`}>
                    <h2 className="movie-title">{movie.Title}</h2>
                  </Link>
                  <p>Year: {movie.Year}</p>

                  <button onClick={addToList(movie)}>Add to list</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="list-container"
          style={{ backgroundColor: "white", color: "black" }}
        >
          {basketList.id ? (
            <Link to={`/list/${basketList.id}`}>
              Go to list {basketList.name}
            </Link>
          ) : (
            <input
              type="text"
              placeholder="Enter list name"
              className="list-name"
              disabled={isLoading}
              onChange={changeListName}
              value={basketList.name}
            />
          )}
          <button
            onClick={saveListToBasket}
            disabled={isLoading || basketList.id}
          >
            Save to basket
          </button>

          <ul className="list">
            {basketList.items.map((item) => (
              <li key={item.imdbID} className="list-item">
                <h2 className="list-title">{item.Title}</h2>
                <button onClick={removeFromList(item.imdbID)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
