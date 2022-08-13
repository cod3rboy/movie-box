import React, { useState } from "react";
import Layout from "../../Layout";
import MovieForm from "../../Components/MovieForm";
import useCurrentPage from "../../Hooks/useCurrentPage";
import { Chip, Fab, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useMovieStore from "../../Hooks/useMovieStore";

function MovieDetail() {
  const { data, changePage } = useCurrentPage();
  const store = useMovieStore();
  if (!data) changePage("home");

  const [editMode, setEditMode] = useState(false);

  return (
    <Layout>
      <Typography color="primary" variant="h4" sx={{ margin: "4vw 8vw" }}>
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
      <Paper elevation={1} sx={{ margin: "8vw 8vw", padding: "6vw 6vw" }}>
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
