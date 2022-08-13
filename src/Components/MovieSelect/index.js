import React, { useState } from "react";
import { Select, IconButton, MenuItem, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function MovieSelect(props) {
  const { movieOptions, onAddClick } = props;
  const [selected, setSelected] = useState("");
  const handleAddClick = () => {
    if (selected && onAddClick && typeof onAddClick === "function") {
      onAddClick(movieOptions.find((m) => m.id === selected));
    }
    setSelected("");
  };
  return (
    <Box sx={{ display: "flex", flexFlow: "row nowrap", gap: "0.4rem" }}>
      <Select
        displayEmpty
        value={selected}
        size="small"
        onChange={(e) => {
          setSelected(e.target.value);
        }}
        sx={{
          width: 196,
        }}
        variant="standard"
        renderValue={(val) => {
          if (val === "") {
            return "Select Movie";
          }
          return movieOptions.find((m) => m.id === val)?.name;
        }}
      >
        <MenuItem disabled value="">
          Select Movie
        </MenuItem>
        {movieOptions.map((movie) => (
          <MenuItem key={movie.id} value={movie.id}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
      <IconButton
        color="primary"
        aria-label="add similar movie"
        component="button"
        size="small"
        edge="end"
        onClick={handleAddClick}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default MovieSelect;
