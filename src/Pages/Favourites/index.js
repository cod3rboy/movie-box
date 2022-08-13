import React, { useMemo } from "react";
import Layout from "../../Layout";
import { Box, Container, Typography } from "@mui/material";
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
      <Container component="div">
        <Typography color="primary" variant="h4" sx={{ margin: "1rem 0" }}>
          Favourites
        </Typography>
        {favMovies.length === 0 && (
          <Typography component="p" variant="body1" color="gray">
            No favourite movies
          </Typography>
        )}
      </Container>
      <Box>
        {favMovies.length > 0 && (
          <MovieList
            movies={favMovies}
            onMovieLike={(id) => store.toggleLike(id)}
            onMovieDetail={(movie) => page.changePage("movie-detail", movie)}
            hideHeading={true}
          />
        )}
      </Box>
    </Layout>
  );
}

export default Favourites;
