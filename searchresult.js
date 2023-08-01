document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the search term from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('query');
  
    // If there's a search term, fetch the search results
    if (searchTerm) {
      const searchApiUrl = `${base_url}/search/movie?${access_key}&query=${encodeURIComponent(searchTerm)}`;
  
      // Fetch the search results
      fetch(searchApiUrl, options)
        .then(response => response.json())
        .then(data => {
          const searchResultContainer = document.getElementById('searchResultContainer');
          // Clear the existing movie cards in the searchResultContainer
          searchResultContainer.innerHTML = '';
  
          // Display the search results as different movie cards
          data.results.forEach(movie => {
            const movieCard = createDifferentMovieCard(movie);
            searchResultContainer.appendChild(movieCard);
          });
        })
        .catch(err => console.error(err));
    }
  });
  
  
  // Function to create different movie card design for the search result page
  function createDifferentMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card" );
  
    const image = document.createElement("img");
    image.classList.add("movie-image");
    image.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    image.alt = movie.title;
    movieCard.appendChild(image);
  
    const rating = document.createElement("p");
    rating.classList.add("movie-rating");
    rating.textContent = `Rating: ${movie.vote_average}/10`;
    movieCard.appendChild(rating);
  
    const releaseDate = document.createElement("p");
    releaseDate.classList.add("movie-release-date");
    releaseDate.textContent = `Release Date: ${movie.release_date}`;
    movieCard.appendChild(releaseDate);
  
    return movieCard;
  }
  