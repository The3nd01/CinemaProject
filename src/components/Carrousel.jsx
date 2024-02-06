import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const CarouselPeliculas = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const apiKey = "fc34ec9e32f4eac02ad17849d5298c80"; 
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          console.error("Error fetching popular movies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    focusOnSelect:true,

  };
  
  return (
    <Slider {...settings}>
    {movies.map((movie) => (
      <div key={movie.id} className="relative p-4 rounded shadow bg-transparent m-4">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto rounded overflow-hidden transition-transform transform-gpu hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded">
          <p className="text-white text-center">{movie.overview}</p>
          <Link to={`/pelicula/${movie.id}`} key={movie.id} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Detalles</Link>
        </div>
      </div>
    ))}
  </Slider>
  );
};

export default CarouselPeliculas;
