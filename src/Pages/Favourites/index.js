import React, { useMemo } from "react";
import Layout from "../../Layout";
import { Paper, Typography } from "@mui/material";
import useCurrentPage from "../../Hooks/useCurrentPage";
import useMovieStore from "../../Hooks/useMovieStore";
import MovieList from "../../Components/MovieList";

function Favourites() {
  const page = useCurrentPage();
  const store = useMovieStore();
  const favMovies = useMemo(
    () => store.movies.filter((movie) => movie.liked),
    [store.movies]
  );

  return (
    <Layout>
      <Typography color="primary" variant="h4" sx={{ margin: "4vw 8vw" }}>
        Favourites
      </Typography>
      <Paper
        elevation={1}
        sx={{
          margin: "8vw 8vw",
          padding: "6vw 6vw",
        }}
      >
        {favMovies.length === 0 && (
          <Typography component="p" variant="body2" color="gray">
            No favourite movies
          </Typography>
        )}
        {favMovies.length > 0 && (
          <MovieList
            columns={2}
            movies={favMovies}
            onMovieLike={(id) => store.toggleLike(id)}
            onMovieDetail={(movie) => page.changePage("movie-detail", movie)}
            hideHeading={true}
          />
        )}
      </Paper>
    </Layout>
  );
}

export default Favourites;
