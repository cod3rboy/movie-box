import React from "react";
import Layout from "../../Layout";
import MovieList from "../../Components/MovieList";
import SearchBox from "../../Components/SearchBox";
import useMovieStore from "../../Hooks/useMovieStore";
import useCurrentPage from "../../Hooks/useCurrentPage";

function Home() {
  const { movies, toggleLike } = useMovieStore();
  const { changePage } = useCurrentPage();
  return (
    <Layout>
      <SearchBox />
      <MovieList
        columns={2}
        movies={movies}
        onMovieLike={(id) => toggleLike(id)}
        onMovieDetail={(movie) => changePage("movie-detail", movie)}
      />
    </Layout>
  );
}

export default Home;
