import React, { useState, useEffect } from "react";

function FavPage() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Obtener todas las claves del localStorage
    const localStorageKeys = Object.keys(localStorage);

    // Filtrar las claves que corresponden a películas favoritas
    const favMovieKeys = localStorageKeys.filter((key) =>
      key.startsWith("favoriteMovie_")
    );

    // Obtener las imágenes de la cartelera de las películas favoritas
    const favMovies = favMovieKeys.map((key) => localStorage.getItem(key));

    // Actualizar el estado con las imágenes de la cartelera de las películas favoritas
    setFavoriteMovies(favMovies);
  }, []);

  return (
    <div className="bg-black h-full w-full font-mono text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Películas Favoritas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteMovies.map((posterPath, index) => (
          <div key={index} className=" hover:opacity-80 transition-opacity">
            {posterPath ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={`Movie ${index}`}
                className="w-full h-auto rounded"
              />
            ) : (
              <p className="text-white">No hay imagen disponible</p>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavPage;
