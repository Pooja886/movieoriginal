document.addEventListener('DOMContentLoaded', () => {
    const api_url = base_url + "/trending/all/day?" + access_key;
   const popularMovieUrl = base_url + "/movie/popular?" + access_key;


// Fetch popular movie data from the API
   fetch(popularMovieUrl)
  .then(response => response.json())
  .then(data => {
    const top3PopularMovies = data.results.slice(0, 3);
    displayTop3PopularMovies(top3PopularMovies);

  })
  .catch(err => console.error(err));
// Fetch and display trending movies on page load
    fetch(api_url, options)
      .then(response => response.json())
      .then(data => {
      displayMovies(data.results  , 'sliderMovieCards');
      })
      .catch(err => console.error(err));

// Fetch popular movie data from the API
    fetch(popularMovieUrl ,options)
   .then(response => response.json())
   .then(data => {
  displayMovies(data.results  , 'popularMovieCards');
 
   })
   .catch(err => console.error(err));
  

    // Select the search input and search button elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
  
    // Add event listener for the search button click
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim(); // Get the search term entered by the user
  
      if (searchTerm !== '') {
        // If the search term is not empty, redirect the user to the search results page
        window.location.href = `searchresult.html?query=${encodeURIComponent(searchTerm)}`;
      }
    });
  });
  
  

function displayMovies(movies ,containerId ){


    // // const initialMovieCardContainer = document.getElementById('initialMovieCards');
    const movieCardContainer = document.getElementById(containerId);

 
    for(let i = 0 ; i<movies.length ;i++){
        const movieCard = createMovieCard(movies[i]);
        movieCardContainer.appendChild(movieCard);
// Add event listener for the click on movie card images
        movieCard.addEventListener('click', () => {
    // Get the movie ID from the data-movie-id attribute on the movie card
        const movieId = movieCard.dataset.movieId;
    // Redirect to the details page with the movie ID as a query parameter
    window.location.href = `details.html?movie_id=${movieId}`;
  });
       
    }
      
    

    $(`#${containerId}.slider`).slick({
        slidesToShow: 4,
        slidesToScroll:1,
        infinite: true ,
        arrows: true,
        responsive: [
            {
                breakpoint:768,
                settings:{
                    slidesToShow:4
                }
            },
            {  breakpoint:576,
                settings:{
                    slidesToShow:2
                } 
            }
        ]
    });
   
}
// function to create movie cards
function createMovieCard(movie) 
{ const movieCard = document.createElement("div");
   movieCard.classList.add("card", "col-sm-6", "col-md-4", "col-lg-3"); 
   movieCard.dataset.movieId = movie.id;
   

   const image = document.createElement("img");
   image.classList.add("card-img-top");
   image.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path; 
   image.alt = movie.title; 
   movieCard.appendChild(image); 


   const cardBody = document.createElement("div"); 
   cardBody.classList.add("card-body"); 
   
   const title = document.createElement("h5"); 
   title.style.color = "white"
   title.classList.add("card-title"); 
   title.textContent = movie.title; 
   cardBody.appendChild(title); 

   const rating = document.createElement("p")
   rating.classList.add("card-rate");
   
   rating.textContent = "Rating:"+ " " + movie.vote_average;
   cardBody.appendChild(rating);

   const releaseDate = document.createElement("p");
   releaseDate.style.color = "white"
   releaseDate.classList.add("card-text");
   releaseDate.textContent = movie.release_date;
   cardBody.appendChild(releaseDate);


   movieCard.appendChild(cardBody);

   return movieCard;
}
function displayTop3PopularMovies(movies) {
  const topPopularMovieCarousel = document.getElementById('topPopularMovieCarousel');
  const carouselInner = topPopularMovieCarousel.querySelector('.carousel-inner');


  for (let i = 0; i < movies.length; i++) {
    const moviePosterPath = movies[i].poster_path;
 

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    const img = document.createElement('img');
    img.classList.add('d-block', 'w-100');
    img.src = `https://image.tmdb.org/t/p/w500${moviePosterPath}`;
    img.alt = `Popular Movie ${i + 1}`;

    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);
  }

  // Initialize the carousel with automatic sliding
  $('#topPopularMovieCarousel').carousel({
    interval: 1000 // 3 seconds interval for automatic sliding
  });
}

