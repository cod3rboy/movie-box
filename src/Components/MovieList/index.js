import React from "react";
import { Container, Box, Typography } from "@mui/material";
import MovieCard from "../MovieCard";
import useMuiMediaQuery from "../../Hooks/useMuiMediaQuery";

function MovieList(props) {
  const { movies, onMovieLike, onMovieDetail, hideHeading = false } = props;
  let listCols = 1;
  const { sm, md, lg } = useMuiMediaQuery();
  if (sm) listCols = 2;
  if (md) listCols = 3;
  if (lg) listCols = 4;
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
        gridTemplateColumns={"1fr ".repeat(listCols)}
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
