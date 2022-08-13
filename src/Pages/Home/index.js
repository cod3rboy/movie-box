import React from "react";
import Layout from "../../Layout";
import MovieList from "../../Components/MovieList";
import SearchBox from "../../Components/SearchBox";
import useMovieStore from "../../Hooks/useMovieStore";
import useCurrentPage from "../../Hooks/useCurrentPage";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Home() {
  const { movies, toggleLike } = useMovieStore();
  const { changePage } = useCurrentPage();
  const handleSearch = (keyword) => {
    changePage("search-results", null, { q: keyword });
  };

  return (
    <Layout>
      <SearchBox onSearch={handleSearch} />
      <MovieList
        movies={movies}
        onMovieLike={(id) => toggleLike(id)}
        onMovieDetail={(movie) => changePage("movie-detail", movie)}
      />
      <Fab
        onClick={() => changePage("new-movie")}
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          marginRight: "1rem",
          marginBottom: "1rem",
        }}
        color="primary"
        aria-label="add movie"
      >
        <AddIcon />
      </Fab>
    </Layout>
  );
}

export default Home;
