import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../layout/header.jsx";

export const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://omdbapi.com/?apikey=3558bcba&i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
        } else {
          console.error(data.Error);
        }
      });
  }, [id]);

  console.log("movie", movie);

  if (!movie) return <Header />;

  return (
    <div>
      <Header />

      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />

      <h2 className="movie-title">{movie.Title}</h2>

      <p>Year: {movie.Year}</p>
    </div>
  );
};
