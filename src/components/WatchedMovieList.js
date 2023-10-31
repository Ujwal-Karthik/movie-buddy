import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watched, onRemoveMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onRemoveMovie={onRemoveMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
