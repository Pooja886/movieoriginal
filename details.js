document.addEventListener('DOMContentLoaded', () => {
    // Get the movie ID from the URL query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('movie_id');
  
    displayDetails(movieId);
    // Fetch the movie details, including the cast information
    function displayDetails(movieId) {
 
      // Fetch movie details
      const movieDetailsUrl = `${base_url}/movie/${movieId}?${access_key}`;
      fetch(movieDetailsUrl)
        .then(response => response.json())
        .then(movieData => {
          // Display movie details on the page
          displayMovieDetails(movieData , document.getElementById('movieDetailsContainer'));
  
          // Fetch movie credits (cast)
          const movieCreditsUrl = `${base_url}/movie/${movieId}/credits?${access_key}`;
          fetch(movieCreditsUrl)
            .then(response => response.json())
            .then(creditsData => {
              // Display cast on the page
              const sortedCast = creditsData.cast.sort((a, b) => b.popularity - a.popularity);
              displayCast(sortedCast);
            })
            .catch(error => console.error('Error fetching cast:', error));
          
          // Fetch movie videos (trailers)
          const movieVideosUrl = `${base_url}/movie/${movieId}/videos?${access_key}`;
          fetch(movieVideosUrl)
            .then(response => response.json())
            .then(videosData => {
              // Filter videos to get only trailers
              const trailers = videosData.results.filter(video => video.type === 'Trailer');
              // If there are trailers, display the first one
              if (trailers.length > 0) {
                displayTrailer(trailers[0]);
              }
            })
            .catch(error => console.error('Error fetching videos:', error));
        })
        .catch(error => console.error('Error fetching movie details:', error));
    }
  });
  
  // Function to display the movie details
  function displayMovieDetails(movie, container) {
    // Create the HTML elements for displaying movie details
    document.getElementById('header').innerHTML =  "Movie Details of "+ "" + "--" + "  " + movie.title;
  
    
    const movieDetails = document.createElement('div');
    movieDetails.innerHTML = `
    
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} max-height="200px" width="200px">
      <p>${movie.overview}</p>
      <p>Release Date: ${movie.release_date}</p>
      <p>Rating: ${movie.vote_average}/10</p>
      <p>Runtime: ${movie.runtime} minutes</p>
      <!-- Add more information here if needed -->
    `;
  
    container.appendChild(movieDetails);
  }
  
  // display cast 
  function displayCast(cast) {
    // Sort the cast array 
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
     nameElement.style.color = "white"
     nameElement.textContent = castMember.name;
     castCard.appendChild(nameElement);

    return castCard;
  }
  
  function displayTrailer(trailer) {
    // Get the trailer key (YouTube ID)
    const trailerKey = trailer.key;

    // Create the YouTube embed URL
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${trailerKey}`;

    // Create and append the iframe element to embed the YouTube video
    const trailerContainer = document.getElementById('trailerContainer');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', youtubeEmbedUrl);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '400');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');
    trailerContainer.appendChild(iframe);
  }
