import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Searcher from "../../components/Searcher";
import Scripts from "../../services/Scripts";

function Movies() {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const fetchPopularMovies = async () => {
    try {
      const popularMovies = await Scripts.fetchPopularMovies();
      setPopularMovies(popularMovies);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
        const filteredMovies = await Scripts.fetchSearchMovies(searchTerm);
        setFilteredMovies(filteredMovies);
    } catch (error) {
      console.error("Error fetching filtered movies:", error);
    }
  };

  useEffect(() => {
    // Cargar las películas más populares al cargar la página
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    // Lógica adicional, si es necesario, al cambiar las películas filtradas
  }, [filteredMovies]);

  return (
    <div className="bg-black h-full w-full font-mono">
      {/* Pasa la función de búsqueda al Searcher */}
      <Searcher onSearch={handleSearch} />
      <div className="mt-8 mx-auto w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.length > 0
          ? filteredMovies.map((movie) => (
              <Link to={`/pelicula/${movie.id}`} key={movie.id}>
                <div className="pelicula-card hover:opacity-80 transition-opacity">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded"
                    />
                  ) : (
                    <p className="text-white">No hay imagen disponible</p>
                  )}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                  </div>
                </div>
              </Link>
            ))
          : popularMovies.map((movie) => (
              <Link to={`/pelicula/${movie.id}`} key={movie.id}>
                <div className="pelicula-card hover:opacity-80 transition-opacity">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto rounded"
                    />
                  ) : (
                    <p className="text-white">No hay imagen disponible</p>
                  )}
                  <div className="mt-4 text-center">
                    <h3 className="text-white text-lg font-bold mb-2">{movie.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default Movies;
  