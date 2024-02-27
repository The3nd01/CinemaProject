const Scripts = {

    fetchPopularMovies: async () => {
        try {
          const apiKey = "fc34ec9e32f4eac02ad17849d5298c80"; 
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
          );
    
          if (response.ok) {
            const data = await response.json();
            return data.results
          } else {
            console.error("Error fetching popular movies:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        }
      },


    fetchSearchMovies: async(searchTerm)=>{
      try {
        const apiKey = "fc34ec9e32f4eac02ad17849d5298c80"; // Reemplaza con tu propia clave de API TMDb
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
        );
  
        if (response.ok) {
          const data = await response.json();
          return data.results;
        } else {
          console.error("Error fetching filtered movies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching filtered movies:", error);
      }
    },

    fetchMovieDetails: async(id)=>{
      try {
        const apiKey = "fc34ec9e32f4eac02ad17849d5298c80";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
        );
  
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (error) {
        console.error("Error fetching filtered movies:", error);
      }
    },

}



  export default Scripts