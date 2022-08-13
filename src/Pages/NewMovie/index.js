import { Paper, Typography } from "@mui/material";
import React from "react";
import MovieForm from "../../Components/MovieForm";
import useCurrentPage from "../../Hooks/useCurrentPage";
import useMovieStore from "../../Hooks/useMovieStore";
import Layout from "../../Layout";

function NewMovie() {
  const { add } = useMovieStore();
  const { changePage } = useCurrentPage();
  return (
    <Layout>
      <Typography color="primary" variant="h4" sx={{ margin: "4vw 8vw" }}>
        Add new movie
      </Typography>
      <Paper
        elevation={1}
        sx={{
          margin: "8vw 8vw",
          padding: "6vw 6vw",
        }}
      >
        <MovieForm
          onSubmit={(movie) => {
            add(movie);
            changePage("home", {
              message: {
                type: "success",
                text: "New movie added!",
              },
            });
          }}
        />
      </Paper>
    </Layout>
  );
}

export default NewMovie;
