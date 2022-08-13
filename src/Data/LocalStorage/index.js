const KEY_MOVIES = "movies";

export function getMovies() {
  return JSON.parse(localStorage.getItem(KEY_MOVIES));
}

export function saveMovies(movies) {
  localStorage.setItem(KEY_MOVIES, JSON.stringify(movies));
}
