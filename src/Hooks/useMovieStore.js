import { useContext } from "react";
import { context } from "../Data/MoviesProvider";

function useMovieStore() {
  const movies = useContext(context);

  const add = (newMovie) => {
    window.dispatchEvent(
      new CustomEvent("add-movie", {
        detail: newMovie,
      })
    );
  };

  const update = (updatedMovie) => {
    window.dispatchEvent(
      new CustomEvent("update-movie", {
        detail: updatedMovie,
      })
    );
  };

  const toggleLike = (movie) => {
    window.dispatchEvent(
      new CustomEvent("like-movie", {
        detail: movie.id,
      })
    );
  };

  return {
    movies,
    add,
    update,
    toggleLike,
  };
}

export default useMovieStore;
