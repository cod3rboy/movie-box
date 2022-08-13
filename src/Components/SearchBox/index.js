import React, { useState } from "react";
import {
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox(props) {
  const { sx, onSearch, hideHeading = false } = props;
  const [keyword, setKeyword] = useState("");
  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault();
        if (onSearch && typeof onSearch === "function" && keyword !== "") {
          onSearch(keyword);
        }
      }}
      component="form"
      sx={{ padding: "1rem", display: "flex", flexFlow: "column", ...sx }}
    >
      {!hideHeading && (
        <Typography variant="h6" color="primary">
          Search
        </Typography>
      )}
      <TextField
        id="search-box"
        value={keyword}
        onInput={(e) => setKeyword(e.target.value)}
        size="small"
        hiddenLabel
        placeholder="movie name or genre"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="search movie" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}

export default SearchBox;
