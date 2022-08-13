import React, { useState } from "react";
import Layout from "../../Layout";
import MovieForm from "../../Components/MovieForm";
import useCurrentPage from "../../Hooks/useCurrentPage";
import { Chip, Fab, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useMovieStore from "../../Hooks/useMovieStore";
import useMuiMediaQuery from "../../Hooks/useMuiMediaQuery";

function MovieDetail() {
  const { data, changePage } = useCurrentPage();
  const store = useMovieStore();
  if (!data) changePage("home");
  const [editMode, setEditMode] = useState(false);

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
        Movie Details
        {editMode && (
          <Chip
            sx={{ marginLeft: "1em" }}
            component="span"
            label="Editing"
            color="warning"
            size="small"
          />
        )}
      </Typography>
      <Paper elevation={1} sx={paperStyles}>
        <MovieForm
          movie={data}
          readOnly={!editMode}
          resetOnSubmit={false}
          onSubmit={(movie) => {
            store.update(movie);
            setEditMode(false);
          }}
        />
      </Paper>
      {!editMode && (
        <Fab
          onClick={() => setEditMode(true)}
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            marginRight: "1rem",
            marginBottom: "1rem",
          }}
          color="primary"
          aria-label="edit movie"
        >
          <EditIcon />
        </Fab>
      )}
    </Layout>
  );
}

export default MovieDetail;
