import { useCallback, useState } from "react";
import Navbar from "./Navbar";
import MovieResult from "./MovieResult";
import Search from "./Search";
import MovieList from "./MovieList";
import Box from "./Box";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

export const apiKey = "2f5d395";

export default function App() {
  const [query, setQuery] = useState("Batman");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedMovieId((state) => (id === state ? null : id));
    // console.log(id);
  };

  const handleCloseMovieDetails = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  const handleAddWatchedMovie = (movie) => {
    setWatched((state) => [...state, movie]);
  };

  const handleRemoveMovie = (id) => {
    setWatched((state) => state.filter((movie) => movie.imdbID !== id));
  };

  const { movies, loading, error } = useMovies(query, handleCloseMovieDetails);
  const [watched, setWatched] = useLocalStorage([], "watched");

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />

        <MovieResult movies={movies} />
      </Navbar>
      <div className="main">
        <Box>
          {loading && <Loading />}
          {!loading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedId={selectedMovieId}
              onCloseMovieDetails={handleCloseMovieDetails}
              onAddWatchedMovie={handleAddWatchedMovie}
              watchedList={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onRemoveMovie={handleRemoveMovie}
              />
            </>
          )}
        </Box>
      </div>
    </>
  );
}
