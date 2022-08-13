import { Paper, Typography } from "@mui/material";
import React from "react";
import MovieForm from "../../Components/MovieForm";
import useCurrentPage from "../../Hooks/useCurrentPage";
import useMovieStore from "../../Hooks/useMovieStore";
import useMuiMediaQuery from "../../Hooks/useMuiMediaQuery";
import Layout from "../../Layout";

function NewMovie() {
  const { add } = useMovieStore();
  const { changePage } = useCurrentPage();

  const { sm, md, lg, xl } = useMuiMediaQuery();
  let headingStyles = { margin: "4vw 8vw" };
  let paperStyles = { margin: "2rem 8vw", padding: "2rem" };
  if (sm) {
    headingStyles.margin = "2rem 16vw";
    paperStyles.margin = "2rem 16vw";
  }
  if (md) {
    headingStyles.margin = "2rem 26vw";
    paperStyles.margin = "2rem 26vw";
  }
  if (lg) {
    headingStyles.margin = "2rem 30vw";
    paperStyles.margin = "2rem 30vw";
  }
  if (xl) {
    headingStyles.margin = "2rem 34vw";
    paperStyles.margin = "2rem 34vw";
  }

  return (
    <Layout>
      <Typography color="primary" variant="h4" sx={headingStyles}>
        Add new movie
      </Typography>
      <Paper elevation={1} sx={paperStyles}>
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
