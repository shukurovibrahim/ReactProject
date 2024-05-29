import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../layout/header.jsx";
import "./movie.css";

export const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://omdbapi.com/?apikey=3558bcba&i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
        } else {
          console.error(data.Error);
          setError(data.Error);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        setError("Failed to fetch movie details.");
      });
  }, [id]);

  console.log("movie", movie);

  if (error) {
    return (
      <div className="movie-page-container">
        <Header />
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!movie) return <Header />;

  return (
    <div className="movie-page-container">
      <Header />
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <h2 className="movie-title">{movie.Title}</h2>
      <div className="movie-details">
        <div className="detail-item"><strong>Year:</strong> {movie.Year}</div>
        <div className="detail-item"><strong>Genre:</strong> {movie.Genre}</div>
        <div className="detail-item"><strong>Director:</strong> {movie.Director}</div>
        <div className="detail-item"><strong>Actors:</strong> {movie.Actors}</div>
        <div className="detail-item"><strong>Plot:</strong> {movie.Plot}</div>
      </div>
      <a
        href={`https://www.imdb.com/title/${movie.imdbID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="imdb-link"
      >
        View on IMDb
      </a>
    </div>
  );
};
