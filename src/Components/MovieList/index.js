import React from "react";
import { Container, Box, Typography } from "@mui/material";
import MovieCard from "../MovieCard";

function MovieList(props) {
  const {
    movies,
    onMovieLike,
    onMovieDetail,
    columns = 1,
    hideHeading = false,
  } = props;
  return (
    <Container>
      {!hideHeading && (
        <Typography variant="h6" color="primary">
          All Movies
        </Typography>
      )}
      <Box
        display="grid"
        sx={{ padding: "1rem 0" }}
        gridTemplateRows="repeat(1fr)"
        gridTemplateColumns={"1fr ".repeat(columns)}
        gap={1}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            data={movie}
            onLike={onMovieLike}
            onMore={onMovieDetail}
          />
        ))}
      </Box>
    </Container>
  );
}

export default MovieList;
