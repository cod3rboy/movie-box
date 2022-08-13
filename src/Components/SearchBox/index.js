import React from "react";
import {
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox(props) {
  return (
    <Container sx={{ padding: "1rem", display: "flex", flexFlow: "column" }}>
      <Typography variant="h6" color="primary">
        Search
      </Typography>
      <TextField
        id="search-box"
        size="small"
        hiddenLabel
        placeholder="movie name or genre"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search movie" edge="end">
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
