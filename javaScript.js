const searchForm = document.querySelector("form")
const movieContainer = document.querySelector(".movie-container")
const inputBox = document.querySelector(".inputBox")
const movieDetails = document.querySelector(".movie-details")

// function to handle form submission
const handleFormsubmission = (e) => {
        e.preventDefault();
        const movieName = inputBox.value.trim();
    
        if (movieName !== '') {
            showErrormessage("Fetching Movie Information...")
            getMovieInfo(movieName);
        } else {
            showErrormessage("Enter a Movie Name To Get Movie Info")
    
        }
}

// this function only fetches the movie from API
const getMovieInfo = async (movie) => {

    try {
        const apikey = "ca5f5849"
        const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${movie}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Unable To Fetch Movie Data")
        }

        const data = await response.json()
        showMoviedata(data);
    } catch (error) {
        showErrormessage("No Movie Found")
    }


}

// function to display error to the user
const showErrormessage = (message) => {
    movieContainer.innerHTML = `<h2> ${message}</h2>`;
    movieContainer.classList.add("noBackground")
}

// This function will show the movie details inside our webpage
const showMoviedata = (data) => {

    // first we have to clear previous text of the element
    // this is called aray destructring to get only parameters which is most needed
    movieContainer.innerText = "";
    movieContainer.classList.remove('noBackground')

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data


    // here we create a movie element to display the details of the movie in
    // which we first add Title and Rating of the movie
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                                <p> <strong> Rating: &#11088; </strong>${imdbRating}</p>`;

    // After rating we have to add Genre of the movie for which we will use forEach loop 
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p> <strong> Released Date: </strong>${Released}</p>
    <p> <strong> Duration: </strong>${Runtime}</p>
    <p> <strong> Cast: </strong>${Actors}</p>
    <p> <strong> Plot: </strong>${Plot}</p>`;

    // creating a div for movie poster
    const moviePoster = document.createElement('div');
    moviePoster.classList.add('movie-poster');
    moviePoster.innerHTML = `<img src="${Poster}"/>`;


    movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieElement);
}

searchForm.addEventListener('submit', handleFormsubmission)