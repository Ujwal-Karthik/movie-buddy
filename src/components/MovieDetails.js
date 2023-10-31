import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiKey } from "./App";
import Rating from "./rating/Rating";
import Loading from "./Loading";
function MovieDetails({
  selectedId,
  onCloseMovieDetails,
  onAddWatchedMovie,
  watchedList,
}) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  const isWatched = watchedList.find((movie) => movie.imdbID === selectedId);

  const onAddMovie = () => {
    const newMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddWatchedMovie(newMovie);
    onCloseMovieDetails();
  };
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );
        setIsLoading(false);
        if (data) {
          setMovieDetails(data);
          // console.log(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    const onPressEscape = (e) => {
      if (e.code === "Escape") {
        onCloseMovieDetails();
      }
    };
    document.addEventListener("keydown", onPressEscape);
    return () => {
      document.removeEventListener("keydown", onPressEscape);
    };
  }, [onCloseMovieDetails]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="details">
      <header>
        <button onClick={onCloseMovieDetails} className="btn-back">
          ←
        </button>
        <img src={poster} alt={`poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released}&bull;{runtime}
          </p>
          <p>{genre}</p>
          <p>⭐ {imdbRating} Rating on IMDb</p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <Rating
                color="gold"
                size={24}
                maxRating={10}
                onRating={setUserRating}
              />
              {userRating > 0 ? (
                <button className="btn-add" onClick={onAddMovie}>
                  Add to Watched List
                </button>
              ) : null}
            </>
          ) : (
            <p>You rated this movie {isWatched.userRating} ⭐</p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring : {actors}</p>
        <p>Directed By : {director}</p>
      </section>
    </div>
  );
}

export default MovieDetails;
