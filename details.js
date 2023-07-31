// // details.js

// document.addEventListener('DOMContentLoaded', () => {
//     // Retrieve the movie ID from the query parameter
//     const urlParams = new URLSearchParams(window.location.search);
//     const movieId = urlParams.get('movie_id');
  
//     // If there's a movie ID, fetch the movie details
//     if (movieId) {
//       const detailsApiUrl = `${base_url}/movie/${movieId}?${access_key}`;
  
//       // Fetch the movie details
//       fetch(detailsApiUrl, options)
//         .then(response => response.json())
//         .then(data => {
//           const movieDetailsContainer = document.getElementById('movieDetailsContainer');
//           // Clear the existing movie details in the movieDetailsContainer
//           movieDetailsContainer.innerHTML = '';
  
//           // Display the movie details
//           displayMovieDetails(data, movieDetailsContainer);
//         })
//         .catch(err => console.error(err));
//     }
//   });
  
//   // Function to display the movie details
//   function displayMovieDetails(movie, container) {
//     // Create the HTML elements for displaying movie details
//     // Customize this based on the information you want to show
//     const movieDetails = document.createElement('div');
//     movieDetails.innerHTML = `
//       <h2>${movie.title}</h2>
//       <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
//       <p>${movie.overview}</p>
//       <p>Release Date: ${movie.release_date}</p>
//       <p>Rating: ${movie.vote_average}/10</p>
//       <p>Runtime: ${movie.runtime} minutes</p>
//       <!-- Add more information here if needed -->
//     `;
  
//     container.appendChild(movieDetails);
//   }
  

// ======================================================================
// details.js

document.addEventListener('DOMContentLoaded', () => {
    // Get the movie ID from the URL query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('movie_id');
  
    // Fetch the movie details, including the cast information
    const api_key = '9e0927bbb5d6eb582982778dc711646b';
    const api_url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`;
    const credits_url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`;
  
    Promise.all([fetch(api_url), fetch(credits_url)])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(([data, creditsData]) => {
        // Process the movie data and cast data here
        // displayMovieDetails(movieData);
        const movieDetailsContainer = document.getElementById('movieDetailsContainer');
           // Clear the existing movie details in the movieDetailsContainer
           movieDetailsContainer.innerHTML = '';
  
           // Display the movie details
          displayMovieDetails(data, movieDetailsContainer);
        displayCast(creditsData.cast);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
//   function displayMovieDetails(movieData) {
//     // Display the movie details (e.g., title, overview, release date) in the container
//     const movieDetailsContainer = document.querySelector('.movie-details-container');
//     // Create and append HTML elements to show the movie details
//   }
  
  // Function to display the movie details
  function displayMovieDetails(movie, container) {
    // Create the HTML elements for displaying movie details
    // Customize this based on the information you want to show
    const movieDetails = document.createElement('div');
    movieDetails.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <p>${movie.overview}</p>
      <p>Release Date: ${movie.release_date}</p>
      <p>Rating: ${movie.vote_average}/10</p>
      <p>Runtime: ${movie.runtime} minutes</p>
      <!-- Add more information here if needed -->
    `;
  
    container.appendChild(movieDetails);
  }
  
  
  function displayCast(cast) {
    // Sort the cast array (optional)
    const sortedCast = cast.sort((a, b) => a.order - b.order);
  
    // Display the top 10 cast members in the container
    const castContainer = document.getElementById('castContainer');
    for (let i = 0; i < Math.min(10, sortedCast.length); i++) {
      const castMember = sortedCast[i];
      const castCard = createCastCard(castMember);
      castContainer.appendChild(castCard);
    }
  }
  
  function createCastCard(castMember) {
    // Create an HTML element (e.g., card) to show the cast member's name and profile image
    const castCard = document.createElement('div');
    castCard.classList.add('cast-card');

   

    // Create and append the cast member's profile image (poster)
    const profileImage = document.createElement('img');
    profileImage.classList.add('cast-poster');
    profileImage.src = `https://image.tmdb.org/t/p/w500${castMember.profile_path}`;
    profileImage.alt = castMember.name;
    castCard.appendChild(profileImage);
    
     // Create and append the cast member's name
     const nameElement = document.createElement('p');
     nameElement.textContent = castMember.name;
     castCard.appendChild(nameElement);

    return castCard;
  }
  