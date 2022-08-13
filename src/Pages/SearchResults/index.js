import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../Layout";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import SearchBox from "../../Components/SearchBox";
import useCurrentPage from "../../Hooks/useCurrentPage";
import useMovieStore from "../../Hooks/useMovieStore";
import MovieList from "../../Components/MovieList";

function SearchResults() {
  const page = useCurrentPage();
  const keyword = page.query.q?.toLowerCase();
  useEffect(() => {
    if (!page.query.q) {
      page.changePage("home");
    }
  }, [page]);

  const store = useMovieStore();
  const [lang, setLang] = useState("any");

  const results = useMemo(() => {
    let results = store.movies.filter((movie) => {
      const ignoreCaseName = movie.name.toLowerCase();
      if (ignoreCaseName.includes(keyword)) return true;
      const genres = movie.genre;
      for (let i = 0; i < genres.length; i++) {
        const ignoreCaseGenre = genres[i].toLowerCase();
        if (ignoreCaseGenre.includes(keyword)) return true;
      }
      return false;
    });
    if (lang !== "any") {
      results = results.filter((movie) => {
        const ignoreCaseLangs = movie.languages.map((lang) =>
          lang.toLowerCase()
        );
        return ignoreCaseLangs.includes(lang.toLowerCase());
      });
    }
    return results;
  }, [keyword, store.movies, lang]);

  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(0);
  const pageCount = Math.ceil(results.length / limit);
  const end = Math.min(offset + limit, results.length);
  const pageResults = results.slice(offset, end);

  return (
    <Layout>
      <SearchBox />
      <Typography color="primary" variant="h4" sx={{ margin: "4vw 8vw" }}>
        Search Results
      </Typography>
      <Paper
        elevation={1}
        sx={{
          margin: "8vw 8vw",
          padding: "6vw 6vw",
        }}
      >
        <Container>
          <Typography component="small" variant="body2" color="gray">
            Displaying results {offset + 1} - {end} of {results.length}
          </Typography>
        </Container>
        <Container>
          <FormControl
            sx={{ margin: "1rem 0.5rem 0 0", minWidth: 100 }}
            size="small"
          >
            <InputLabel id="per-page-control">Per Page</InputLabel>
            <Select
              id="per-page-control"
              labelId="per-page-control"
              value={limit}
              label="Per Page"
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
              }}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{ margin: "1rem 0 0 0.5rem", minWidth: 120 }}
            size="small"
          >
            <InputLabel id="lang-filter-control">Language</InputLabel>
            <Select
              id="lang-filter-control"
              labelId="lang-filter-control"
              value={lang}
              label="Langauge"
              onChange={(e) => {
                setLang(e.target.value);
              }}
            >
              <MenuItem value="any">Any</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
            </Select>
          </FormControl>
        </Container>
        <MovieList
          columns={2}
          movies={pageResults}
          onMovieLike={(id) => store.toggleLike(id)}
          onMovieDetail={(movie) => page.changePage("movie-detail", movie)}
          hideHeading={true}
        />
        {pageCount > 1 && (
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              sx={{
                marginTop: "2rem",
              }}
              onChange={(e, value) => setOffset((value - 1) * limit)}
              count={pageCount}
              color="primary"
              variant="outlined"
            />
          </Container>
        )}
      </Paper>
    </Layout>
  );
}

export default SearchResults;
