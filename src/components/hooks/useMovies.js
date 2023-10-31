import { useEffect, useState } from "react";
import axios from "axios";

export const apiKey = "2f5d395";
export const useMovies = (query, callback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal }
        );

        if (data.Response === "False") {
          throw new Error("Movie Not Found!");
        }
        setMovies(data.Search);
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    callback?.();
    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [query, callback]);
  return { movies, loading, error };
};
