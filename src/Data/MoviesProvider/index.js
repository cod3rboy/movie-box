import React, { useEffect, useState } from "react";
import { getMovies, saveMovies } from "../LocalStorage";
import moviesJsonData from "../movies.json";

const StoreContext = React.createContext();

export const context = StoreContext;

function MoviesProvider(props) {
  const [movies, setMovies] = useState(() => {
    let moviesData = getMovies();
    if (!moviesData) {
      moviesData = moviesJsonData;
      saveMovies(moviesData);
    }
    return moviesData;
  });

  useEffect(() => {
    const onAddMovie = (event) => {
      const newMovie = event.detail;
      newMovie.id = new Date().getTime().toString();
      const updatedMovies = getMovies();
      updatedMovies.unshift(newMovie);
      saveMovies(updatedMovies);
      setMovies(updatedMovies);
    };
    const onUpdateMovie = (event) => {
      const updatedMovie = event.detail;
      const movies = getMovies();
      const movieIndex = movies.findIndex(
        (movie) => movie.id === updatedMovie.id
      );
      if (movieIndex >= 0) {
        movies[movieIndex] = updatedMovie;
      }
      saveMovies(movies);
      setMovies(movies);
    };
    const onLikeMovie = (event) => {
      const movieId = event.detail;
      const updatedMovies = getMovies();
      const targetMovieIdx = updatedMovies.findIndex(
        (movie) => movie.id === movieId
      );
      if (targetMovieIdx < 0) return;
      updatedMovies[targetMovieIdx].liked =
        !updatedMovies[targetMovieIdx].liked;
      saveMovies(updatedMovies);
      setMovies(updatedMovies);
    };
    window.addEventListener("add-movie", onAddMovie);
    window.addEventListener("like-movie", onLikeMovie);
    window.addEventListener("update-movie", onUpdateMovie);
    return () => {
      window.removeEventListener("add-movie", onAddMovie);
      window.removeEventListener("like-movie", onLikeMovie);
      window.removeEventListener("update-movie", onUpdateMovie);
    };
  }, []);

  return (
    <StoreContext.Provider value={movies}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default MoviesProvider;
