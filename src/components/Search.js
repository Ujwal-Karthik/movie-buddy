import { useEffect, useRef } from "react";

const Search = ({ query, setQuery }) => {
  const focusRef = useRef(null);

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.code === "Enter") {
        focusRef.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleEnterPress);

    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, []);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={focusRef}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
