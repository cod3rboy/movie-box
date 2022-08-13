import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import MoviesIcon from "@mui/icons-material/LocalMovies";
import AddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/system";
import useCurrentPage from "../../Hooks/useCurrentPage";

const BrandName = styled(Typography)({
  flexGrow: 1,
  textTransform: "uppercase",
  letterSpacing: "0.1rem",
});

const MenuButton = styled(Button)({
  textTransform: "capitalize",
});

function Header() {
  const { changePage } = useCurrentPage();
  return (
    <AppBar component="nav" position="sticky">
      <Toolbar>
        <Container
          onClick={() => changePage("home")}
          component="span"
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            padding: 0,
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <MoviesIcon />
          <BrandName variant="h6" component="div">
            Movies Box
          </BrandName>
        </Container>
        <Box>
          <MenuButton
            variant="secondary"
            startIcon={<AddCircleIcon />}
            onClick={() => {
              changePage("new-movie");
            }}
          >
            New Movie
          </MenuButton>
          <MenuButton variant="secondary" startIcon={<FavoriteIcon />}>
            Favourites
          </MenuButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
