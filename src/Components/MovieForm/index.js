import React, { createRef, useState } from "react";
import {
  Grid,
  Container,
  Chip,
  TextField,
  Typography,
  Rating,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MobileDatePicker as DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import useMovieStore from "../../Hooks/useMovieStore";
import MovieSelect from "../MovieSelect";
import moment from "moment";

const initialState = {
  name: "",
  plot: "",
  durationHour: "",
  durationMinute: "",
  rating: 0,
  release: moment(),
  cast: [],
  genre: [],
  languages: [],
  similar: [],
};

function MovieForm(props) {
  const {
    movie,
    submitLabel = "submit",
    onSubmit,
    resetOnSubmit = true,
    readOnly = false,
  } = props;
  const { movies } = useMovieStore();

  const [formData, setFormData] = useState(
    !movie
      ? initialState
      : () => {
          const movieCopy = { ...movie };
          const duration = movieCopy.duration;
          const [durationHour, durationMinute] = duration
            .split(" ")
            .map((d) => d.slice(0, -1));
          delete movieCopy.duration;
          movieCopy.durationHour = durationHour;
          movieCopy.durationMinute = durationMinute;
          movieCopy.release = moment(movieCopy.release, "DD-MM-YYYY");
          movieCopy.similar = movieCopy.similar ?? [];
          movieCopy.rating = Math.ceil(5 * (movieCopy.rating / 100));
          return movieCopy;
        }
  );

  const resetForm = () => {
    setFormData(initialState);
  };

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const inputRefs = {
    cast: createRef(),
    genre: createRef(),
    languages: createRef(),
  };

  const handleItemAdd = (key, value) => {
    const valueSet = new Set(formData[key]);
    valueSet.add(value);
    setFormData({ ...formData, [key]: [...valueSet] });
  };

  const handleItemDelete = (key, index) => {
    const valueCopy = [...formData[key]];
    valueCopy.splice(index, 1);
    setFormData({ ...formData, [key]: valueCopy });
  };

  const removeMovie = (movie) => {
    const similarCopy = [...formData.similar];
    const movieIndex = similarCopy.findIndex((id) => id === movie.id);
    if (movieIndex >= 0) {
      similarCopy.splice(movieIndex, 1);
      setFormData({ ...formData, similar: similarCopy });
    }
  };

  const addMovie = (movie) => {
    const similarCopy = new Set(formData.similar);
    similarCopy.add(movie.id);
    setFormData({ ...formData, similar: [...similarCopy] });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formDataCopy = { ...formData };
    const duration = [];
    const { durationHour, durationMinute } = formDataCopy;
    if (durationHour) duration.push(`${durationHour}h`);
    if (durationMinute) duration.push(`${durationMinute}m`);
    delete formDataCopy.durationHour;
    delete formDataCopy.durationMinute;
    formDataCopy.duration = duration.join(" ");
    formDataCopy.release = formDataCopy.release.format("DD-MM-YYYY");
    formDataCopy.rating = Math.ceil((formDataCopy.rating * 100) / 5);
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(formDataCopy);
    }
    if (resetOnSubmit) resetForm();
  };

  const similarOptions = movies.filter(
    (movie) => !formData.similar.includes(movie.id)
  );
  const similarMovies = movies.filter((movie) =>
    formData.similar.includes(movie.id)
  );

  const activateSubmit = (() => {
    let flag = formData.name.trim() !== "";
    flag &=
      formData.durationHour.trim() !== "" ||
      formData.durationMinute.trim() !== "";
    flag &= formData.rating > 0;
    return flag;
  })();

  return (
    <Grid
      container
      component="form"
      method="GET"
      flexDirection="column"
      gap={2}
      onSubmit={handleFormSubmit}
    >
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Movie Name
        </Typography>
        <Container component="div" sx={{ padding: "0.5rem 0 0 0 !important" }}>
          <TextField
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            size="small"
            variant="standard"
            InputProps={{ readOnly }}
            fullWidth
          />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Plot Description
        </Typography>
        <Container component="div" sx={{ padding: "0.5rem 0 0 0 !important" }}>
          <TextField
            value={formData.plot}
            onChange={(e) => handleInputChange("plot", e.target.value)}
            size="small"
            variant="standard"
            rows={readOnly ? null : 4}
            InputProps={{ readOnly }}
            multiline
            fullWidth
          />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Duration
        </Typography>
        <Container component="div" sx={{ padding: "0 !important" }}>
          <TextField
            value={formData.durationHour}
            onChange={(e) => handleInputChange("durationHour", e.target.value)}
            sx={{ width: "2ch" }}
            label="h"
            size="small"
            variant="standard"
            InputProps={{ readOnly }}
          />
          <TextField
            value={formData.durationMinute}
            onChange={(e) =>
              handleInputChange("durationMinute", e.target.value)
            }
            sx={{ width: "2ch", marginLeft: "1rem" }}
            label="m"
            size="small"
            variant="standard"
            InputProps={{ readOnly }}
          />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Rating
        </Typography>
        <Container component="div" sx={{ padding: "0.5rem 0 0 0 !important" }}>
          <Rating
            value={formData.rating}
            onChange={(e, value) => handleInputChange("rating", value)}
            readOnly={readOnly}
          />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Release Date
        </Typography>
        <Container component="div" sx={{ padding: "0.5rem 0 0 0 !important" }}>
          <DatePicker
            value={formData.release}
            inputFormat="DD-MM-YYYY"
            readOnly={readOnly}
            onChange={(value) => handleInputChange("release", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="standard"
                sx={{ width: "10ch" }}
              />
            )}
          />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Cast
        </Typography>
        <Container
          component="div"
          sx={{
            padding: "0.5rem 0 0 0 !important",
          }}
        >
          {!readOnly && (
            <TextField
              inputRef={inputRefs.cast}
              size="small"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="add cast"
                      component="button"
                      size="small"
                      edge="end"
                      onClick={() => {
                        if (inputRefs.cast.current.value.trim().length > 0) {
                          handleItemAdd("cast", inputRefs.cast.current.value);
                          inputRefs.cast.current.value = "";
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "0.4rem",
              marginTop: "0.6rem",
            }}
          >
            {formData.cast.length === 0 && (
              <Typography component="span" color="gray" variant="body2">
                No cast
              </Typography>
            )}
            {formData.cast.length > 0 &&
              formData.cast.map((cast, index) => (
                <Chip
                  key={cast}
                  label={cast}
                  variant="outlined"
                  onDelete={
                    readOnly ? null : () => handleItemDelete("cast", index)
                  }
                />
              ))}
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Genre
        </Typography>
        <Container
          component="div"
          sx={{
            padding: "0.5rem 0 0 0 !important",
          }}
        >
          {!readOnly && (
            <TextField
              inputRef={inputRefs.genre}
              size="small"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="add genre"
                      component="button"
                      size="small"
                      edge="end"
                      onClick={() => {
                        if (inputRefs.genre.current.value.trim().length > 0) {
                          handleItemAdd("genre", inputRefs.genre.current.value);
                          inputRefs.genre.current.value = "";
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "0.4rem",
              marginTop: "0.6rem",
            }}
          >
            {formData.genre.length === 0 && (
              <Typography component="span" color="gray" variant="body2">
                No genre
              </Typography>
            )}
            {formData.genre.length > 0 &&
              formData.genre.map((genre, index) => (
                <Chip
                  key={genre}
                  label={genre}
                  variant="outlined"
                  onDelete={
                    readOnly ? null : () => handleItemDelete("genre", index)
                  }
                />
              ))}
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Languages
        </Typography>
        <Container
          component="div"
          sx={{
            padding: "0.5rem 0 0 0 !important",
          }}
        >
          {!readOnly && (
            <TextField
              inputRef={inputRefs.languages}
              size="small"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="add language"
                      component="button"
                      size="small"
                      edge="end"
                      onClick={() => {
                        if (
                          inputRefs.languages.current.value.trim().length > 0
                        ) {
                          handleItemAdd(
                            "languages",
                            inputRefs.languages.current.value
                          );
                          inputRefs.languages.current.value = "";
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "0.4rem",
              marginTop: "0.6rem",
            }}
          >
            {formData.languages.length === 0 && (
              <Typography component="span" color="gray" variant="body2">
                No languages
              </Typography>
            )}
            {formData.languages.length > 0 &&
              formData.languages.map((language, index) => (
                <Chip
                  key={language}
                  label={language}
                  variant="outlined"
                  onDelete={
                    readOnly ? null : () => handleItemDelete("languages", index)
                  }
                />
              ))}
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Typography
          fontWeight="bold"
          component="label"
          variant="body1"
          color="primary"
        >
          Similar Movies
        </Typography>
        <Container component="div" sx={{ padding: "0.5rem 0 0 0 !important" }}>
          {!readOnly && (
            <MovieSelect movieOptions={similarOptions} onAddClick={addMovie} />
          )}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              gap: "0.4rem",
              marginTop: "0.6rem",
            }}
          >
            {similarMovies.length === 0 && (
              <Typography component="span" color="gray" variant="body2">
                No similar movies
              </Typography>
            )}
            {similarMovies.length > 0 &&
              similarMovies.map((movie) => (
                <Chip
                  key={movie.id}
                  label={movie.name}
                  variant="outlined"
                  onDelete={readOnly ? null : () => removeMovie(movie)}
                />
              ))}
          </Box>
        </Container>
      </Grid>
      <Grid item xs={12}>
        {!readOnly && (
          <Button
            variant="contained"
            type="submit"
            sx={{
              display: "block",
              textTransform: "capitalize",
              margin: "1rem auto",
            }}
            disabled={!activateSubmit}
          >
            {submitLabel}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default MovieForm;
