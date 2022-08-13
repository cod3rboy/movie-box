import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import MoviesIcon from "@mui/icons-material/LocalMovies";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/system";
import useCurrentPage from "../../Hooks/useCurrentPage";
import useMuiMediaQuery from "../../Hooks/useMuiMediaQuery";

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
  const { sm } = useMuiMediaQuery();
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
          {sm && (
            <MenuButton
              onClick={() => changePage("favourites")}
              variant="secondary"
              startIcon={<FavoriteIcon />}
            >
              Favourites
            </MenuButton>
          )}
          {!sm && (
            <IconButton
              onClick={() => changePage("favourites")}
              title="Favourites"
              sx={{ color: "#fff" }}
            >
              <FavoriteIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
