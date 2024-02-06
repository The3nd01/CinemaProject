import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BuyTicketModal from "../../components/BuyTicketModal";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchMovieDetails = async () => {
    try {
      const apiKey = "fc34ec9e32f4eac02ad17849d5298c80";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
      );

      if (response.ok) {
        const data = await response.json();
        setMovieDetails(data);

        // Buscar el primer tráiler de YouTube en la respuesta
        const youtubeTrailer = data?.videos?.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        // Establecer la clave del tráiler para mostrar
        if (youtubeTrailer) {
          setTrailerKey(youtubeTrailer.key);
        }
      } else {
        console.error("Error fetching movie details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    // Cargar detalles de la película al cargar la página
    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <p>Cargando detalles de la película...</p>;
  }

  const {
    title,
    genres,
    overview,
    release_date,
    vote_average,
    poster_path,
  } = movieDetails;

  const FavButton = document.querySelector('#Fav')

  

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-black h-full w-full font-mono text-white pr-40 pl-40 pb-20 pt-11">
      
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg font-semibold mb-2">
        Géneros: {genres.map((genre) => genre.name).join(", ")}
      </p>
      <p className="text-lg mb-2">Fecha de Estreno: {release_date}</p>
      <p className="text-lg mb-2">Valoración: {vote_average}</p>
      <div className="flex justify-center gap-24">
      <img
                      src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
                      alt={title}
                      className="w-96 h-3/5 rounded"
                    />

      {/* Mostrar el tráiler si hay una clave */}
      {trailerKey && (
        <div className="mb-4 w-3/5">
          <iframe
            title={`${title} Trailer`}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      </div>
      

      <p className="text-lg mb-8">{overview}</p>

      {/* Botones de acción (favorita, comprar entrada, etc.) */}
      <div className="flex justify-between">
        <button onClick={handleToggleFavorite} id="Fav" className={`py-2 px-4 rounded ${isFavorited ? 'bg-yellow-400 text-black': 'bg-blue-500 hover:bg-blue-600 text-white'}  font-bold`}
>
          Marcar como favorita
          
        </button>
        <button id="Compra"  onClick={openModal} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Comprar entrada
        </button>
      </div>
      <BuyTicketModal isOpen={isModalOpen} onClose={closeModal} img={`https://image.tmdb.org/t/p/w1280${poster_path}`} />
    </div>
  );
}

export default MovieDetails;
