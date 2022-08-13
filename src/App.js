import PageSwitch from "./Components/PageSwitch";
import Favourites from "./Pages/Favourites";
import Home from "./Pages/Home";
import MovieDetail from "./Pages/MovieDetail";
import NewMovie from "./Pages/NewMovie";
import SearchResults from "./Pages/SearchResults";

//TODO: Make Edit Fab changed with Save Fab on edit mode. Use `render` prop in MovieForm to enable this.
//TODO: Make MovieForm responsive

function App() {
  return (
    <PageSwitch entry="home">
      <Home name="home" />
      <NewMovie name="new-movie" />
      <Favourites name="favourites" />
      <MovieDetail name="movie-detail" />
      <SearchResults name="search-results" />
    </PageSwitch>
  );
}

export default App;
