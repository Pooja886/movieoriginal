document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  let searchTerm = urlParams.get('query');
// Select the search input and search button elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
let currentPage = 1;
let isLoading = false;


  
    searchInput.value = searchTerm;

    function fetchSearchResults(page) {
      console.log(searchTerm)
      document.getElementById('searchheader').innerHTML = "Search Result For " + " " + searchTerm;
      if (isLoading) return;
      isLoading = true;
      const searchApiUrl = `${base_url}/search/movie?${access_key}&query=${encodeURIComponent(searchTerm)}&page=${page}`;
      
      fetch(searchApiUrl)
        .then(response => response.json())
        .then(data => {
          isLoading = false;
          if (data.results.length > 0) {
            data.results.forEach(movie => {
              const movieCard = createDifferentMovieCard(movie);
              searchResultContainer.appendChild(movieCard);
              movieCard.addEventListener('click', () => {
                const movieId = movieCard.dataset.movieId;
                window.location.href = `details.html?movie_id=${movieId}`;
              });
            });
            currentPage++;
          }else{
            if(page===1){
              searchResultContainer.innerHTML=`<p>NO movies found.</p>`
            }
          }
          
        })
        .catch(err => {
          isLoading = false;
          console.error(err);
        });

    }
    searchButton.addEventListener('click', () => {
      searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        searchResultContainer.innerHTML = '';
        currentPage = 1;
        window.location.href = `searchresult.html?query=${encodeURIComponent(searchTerm)}`;
        fetchSearchResults(currentPage);
      }
    });
  
    window.addEventListener('scroll', () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const bottomReached = scrollTop + clientHeight >= scrollHeight - 200;
      if (bottomReached) {
        fetchSearchResults(currentPage);
      }
    });

    fetchSearchResults(currentPage);
    
  });

  
  



  
  // Function to create different movie card design for the search result page
  function createDifferentMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card" );
    movieCard.dataset.movieId = movie.id;
  
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