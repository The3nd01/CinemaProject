import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BuyTicketModal from "../../components/BuyTicketModal";
import Scripts from "../../services/Scripts";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState(null); // Estado para almacenar los datos de la entrada

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchMovieDetails = async () => {
   
        const data = await Scripts.fetchMovieDetails(id);
        setMovieDetails(data);

        // Verificar si la película está marcada como favorita
        const isFavorite = localStorage.getItem(`favoriteMovie_${id}`) !== null;
        setIsFavorited(isFavorite);

        // Buscar el primer tráiler de YouTube en la respuesta
        const youtubeTrailer = data?.videos?.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        // Establecer la clave del tráiler para mostrar
        if (youtubeTrailer) {
          setTrailerKey(youtubeTrailer.key);
        }
     
  };

  useEffect(() => {
    // Cargar detalles de la película al cargar la página
    fetchMovieDetails();
  }, [id]);

  // Función para manejar la compra de una entrada
  const handleBuyTicket = (ticketInfo) => {
    // Guardar los datos de la entrada en el localStorage
    localStorage.setItem(`ticket_${id}`, JSON.stringify(ticketInfo));
    // Establecer los datos de la entrada en el estado
    setTicketData(ticketInfo);
  };

  const handleToggleFavorite = () => {
    // Cambiar el estado de favorito
    setIsFavorited(!isFavorited);
  
    // Guardar la imagen en el localStorage
    if (!isFavorited) {
      // Si la película se marca como favorita
      localStorage.setItem(`favoriteMovie_${id}`, poster_path);
    } else {
      // Si la película se elimina de favoritos
      localStorage.removeItem(`favoriteMovie_${id}`);
    }
  };

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
        <button
          onClick={handleToggleFavorite}
          className={`py-2 px-4 rounded ${
            isFavorited
              ? "bg-yellow-400 text-black"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } font-bold`}
        >
          {isFavorited ? "Eliminar de favoritos" : "Marcar como favorita"}
        </button>
        <button
          onClick={openModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Comprar entrada
        </button>
      </div>
      <BuyTicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        img={`https://image.tmdb.org/t/p/w1280${poster_path}`}
        onBuyTicket={handleBuyTicket} // Pasar la función de manejo de compra al modal
      />
    </div>
  );
}

export default MovieDetails;
