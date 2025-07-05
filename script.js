
const userInput = document.getElementById("userinput");
const apikey = "dd8bf98c";
const searchButton = document.getElementById("search-button");
const list = document.getElementById("list");
let favArray = JSON.parse(localStorage.getItem("myMovies")) || [];
const fav = document.getElementById("favotites");
let selectedValue = "all" ;
const typeSelect = document.getElementById("option");

typeSelect.addEventListener("change", () => {
  selectedValue = typeSelect.value;
});

// setTimeout(() => {
//     typeSelect.style.display = "block";
// },1000);

searchButton.addEventListener("click", () => {
    displayMovies();
});

async function getMovieinfo() {
    
    const input = userInput.value;

    if( !input.trim() ) {
        console.log("you did not enter anything");
        return;
    }

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${input.trim()}`);
        const data = await response.json();

        console.log(data.Search);
        return data.Search;
    }
    catch(error) {
        console.log(error);
    }

};

async function displayMovies() {

    const movieList = await getMovieinfo();

    if ( !movieList ) {
        window.alert("we found nothing");
        userInput.value = "";
        return;
    };

    list.innerHTML = "";

    list.style.display = "none";

    movieList.forEach((movie, index) => {
        
        if ( selectedValue != "all" ) {
            if ( movie.Type != selectedValue) return;
        }

        const card = document.createElement("div");
        const movieInfo = document.createElement("div");
        const movieImage = document.createElement("img");
        const movieTitle = document.createElement("h1");
        movieType = document.createElement("p");

        movieImage.src = movieList[index].Poster;
        movieTitle.textContent = movieList[index].Title;
        movieType.textContent = movieList[index].Type;

        card.classList.add("movie-card");
        movieImage.classList.add("movie-image");
        movieInfo.classList.add("movie-info");
        movieTitle.classList.add("movie-title");

        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieType);

        card.appendChild(movieImage);
        card.appendChild(movieInfo);

        list.appendChild(card);

        const favoriteButton = document.createElement("button");
        const icon = document.createElement("i");
        
        icon.className = "fa fa-heart"; // Font Awesome outlined heart
        icon.setAttribute("aria-hidden", "true");
        favoriteButton.appendChild(icon);
        card.appendChild(favoriteButton);
        favoriteButton.style.display = "none";
        
        card.addEventListener("mouseenter", () => {
            favoriteButton.classList.add("add-to-favorites");
            favoriteButton.style.display = "block";
        });

        card.addEventListener("mouseleave", () => {
            favoriteButton.style.display = "none";
            favoriteButton.classList.remove("add-to-favorites");
        });

        favoriteButton.addEventListener("click", () => {
            const obj = {
                Poster: movie.Poster,
                Title: movie.Title
            };

            const alreadyExists = favArray.some(elem => elem.Poster === movie.Poster);

            if (!alreadyExists) {
                favArray.push(obj);
                localStorage.setItem("myMovies", JSON.stringify(favArray));
                document.getElementById("addePopup").style.display = "block";
                setTimeout(() => {
                    document.getElementById("addePopup").style.display = "none";
                },1000);
                
            } else {
                window.alert("Already in favorites.");
            }
        });
    });

    setTimeout(() => {
        list.style.display = "flex";
    },200);
    userInput.value = "";
};

fav.addEventListener("click", () => {
    const savedMovies = JSON.parse(localStorage.getItem("myMovies"));
    console.log(savedMovies);

    if (!savedMovies || savedMovies.length === 0) {
        window.alert("No favorites yet");
        return;
    }

    list.innerHTML = "";
    list.style.display = "none";

    savedMovies.forEach((elem) => { 
        
        const card = document.createElement("div");
        const movieInfo = document.createElement("div");
        const movieImage = document.createElement("img");
        const movieTitle = document.createElement("h1");

        movieImage.src = elem.Poster;
        movieTitle.textContent = elem.Title;

        card.classList.add("movie-card");
        movieImage.classList.add("movie-image");
        movieInfo.classList.add("movie-info");
        movieTitle.classList.add("movie-title");

        movieInfo.appendChild(movieTitle);

        card.appendChild(movieImage);
        card.appendChild(movieInfo);

        list.appendChild(card);

        const favoriteButton = document.createElement("button");
        const icon = document.createElement("i");
        
        icon.className = "fa fa-heart"; // Font Awesome outlined heart
        icon.setAttribute("aria-hidden", "true");
        favoriteButton.classList.add("add-to-favorites");
        favoriteButton.appendChild(icon);
        card.appendChild(favoriteButton);

        favoriteButton.style.display = "none";
        
        card.addEventListener("mouseenter", () => {
            favoriteButton.classList.add("add-to-favorites");
            favoriteButton.style.display = "block";
        });

        card.addEventListener("mouseleave", () => {
            favoriteButton.style.display = "none";
            favoriteButton.classList.remove("add-to-favorites");
        });


        list.appendChild(card);

        favoriteButton.addEventListener("click", () => {
            favArray = favArray.filter(el => el.Title !== elem.Title);
            localStorage.setItem("myMovies", JSON.stringify(favArray));
            document.getElementById("removedePopup").style.display = "block";
            setTimeout(() => {
                    document.getElementById("removedePopup").style.display = "none";
            },1000);

            // Remove the card visually
            card.remove();
        });
        setTimeout(() => {
        list.style.display = "flex";
        }, 200);
    })
});


async function displayTopMovies() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime");
        let data = await response.json();

        data = data.data;
        console.log(data);

        list.innerHTML = "";

        list.style.display = "none";

    data.forEach((movie, index) => {
        
        const card = document.createElement("div");
        const movieInfo = document.createElement("div");
        const movieImage = document.createElement("img");
        const movieTitle = document.createElement("h1");

        movieImage.src = movie.images.jpg.image_url;
        movieTitle.textContent = movie.title;

        card.classList.add("movie-card");
        movieImage.classList.add("movie-image");
        movieInfo.classList.add("movie-info");
        movieTitle.classList.add("movie-title");

        movieInfo.appendChild(movieTitle);

        card.appendChild(movieImage);
        card.appendChild(movieInfo);

        const favoriteButton = document.createElement("button");
        const icon = document.createElement("i");
        
        icon.className = "fa fa-heart"; // Font Awesome outlined heart
        icon.setAttribute("aria-hidden", "true");
        favoriteButton.classList.add("add-to-favorites");
        favoriteButton.appendChild(icon);
        card.appendChild(favoriteButton);

        favoriteButton.style.display = "none";
        
        card.addEventListener("mouseenter", () => {
            favoriteButton.classList.add("add-to-favorites");
            favoriteButton.style.display = "block";
        });

        card.addEventListener("mouseleave", () => {
            favoriteButton.style.display = "none";
            favoriteButton.classList.remove("add-to-favorites");
        });



        list.appendChild(card);
        
        favoriteButton.addEventListener("click", () => {
            const obj = {
                Poster: movie.images.jpg.image_url,
                Title: movie.title
            };

            const alreadyExists = favArray.some(elem => elem.Poster === movie.images.jpg.image_url);

            if (!alreadyExists) {
                favArray.push(obj);
                localStorage.setItem("myMovies", JSON.stringify(favArray));
                document.getElementById("addePopup").style.display = "block";
                setTimeout(() => {
                    document.getElementById("addePopup").style.display = "none";
                },1000);
            } else {
                window.alert("Already in favorites.");
            }
        });
    });

    list.style.display = "flex";
    }
    catch(err) {
        console.error("Failed to fetch anime:", err);
    }
}

displayTopMovies();

