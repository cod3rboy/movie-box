import React from "react";
import {
  Card,
  CardContent,
  Rating,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowRightIcon from "@mui/icons-material/ArrowForwardIos";

function MovieCard(props) {
  const { data, onLike, onMore } = props;
  const { name, duration, rating, release, liked, genre, languages } = data;
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        display: "flex",
        flexFlow: "column nowrap",
      }}
    >
      <Typography
        variant="body1"
        title={name}
        noWrap={true}
        sx={(theme) => ({
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.light,
          padding: "0.5rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          textAlign: "center",
          cursor: "default",
        })}
      >
        {name}
      </Typography>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Rating
          name="movie rating"
          value={Math.ceil(5 * (rating / 100))}
          readOnly
        />
        <List disablePadding>
          <ListItem disablePadding divider>
            <ListItemText>
              <Typography component="span" variant="body2">
                {genre.slice(0, Math.min(2, genre.length)).join(" | ")}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText>
              <Typography component="span" variant="body2" color="gray">
                {release}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText>
              <Typography component="span" variant="body2" color="gray">
                {duration}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText>
              <Typography component="span" variant="body2" color="gray">
                {languages.join(" | ")}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </CardContent>
      <CardActions
        disableSpacing
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[100],
          marginTop: "auto",
        })}
      >
        <IconButton
          title={liked ? "Remove favourite" : "Mark favourite"}
          onClick={() => onLike && typeof onLike === "function" && onLike(data)}
        >
          {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton
          title="More details"
          sx={{ marginLeft: "auto" }}
          onClick={() => onMore && typeof onMore === "function" && onMore(data)}
        >
          <ArrowRightIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
