console.log('Current pathname:', window.location.pathname);

if (window.location.pathname === '/endScreen.html') {
   document.addEventListener('DOMContentLoaded', function () {
        //Displaying genre result
        const resultElement = document.getElementById('end-game-result');
        //mainGenre variable retrieved
        const retrievedMainGenre = JSON.parse(localStorage.getItem("mainGenre")); // Convert back to array
        console.log("LOCAL: ", retrievedMainGenre);
        resultElement.textContent = "Top Genre: " + retrievedMainGenre + "!";

        const retrievedSelectedGenreBooks = displayBookResults();

        displayEndGameBooks(retrievedSelectedGenreBooks);

        displaySpotifyRec(retrievedMainGenre);
        //making button work

        const buttonLink = document.querySelector(".div-3 a"); //Get the <a> element 
        buttonLink.href = "allBookRecs.html"; //adds link
    });
}

function displayBookResults(){

//Displaying 5 book recs result
const bookRecsElement = document.getElementById('bookRecsElement');
const retrievedSelectedGenreBooks = JSON.parse(localStorage.getItem("selectedGenreBooks")); // Convert back to array
console.log("LOCAL: ", retrievedSelectedGenreBooks);

bookRecsElement.textContent = "Book Suggestions: ";

const genreBookTitles = retrievedSelectedGenreBooks.map(book => book.title);
for (let i = 0; i < retrievedSelectedGenreBooks.length; i++) {
    if(i<=3){
    console.log(retrievedSelectedGenreBooks[i].title);
    bookRecsElement.textContent += retrievedSelectedGenreBooks[i].title + ", ";
} else{
    bookRecsElement.textContent += retrievedSelectedGenreBooks[i].title;
}
}

return retrievedSelectedGenreBooks;
}

//Function to display the books and makes them interactive by attaching click event listeners
function displayEndGameBooks(retrievedSelectedGenreBooks) {

    let endGameGrid = document.getElementById("endGameGrid");

    if (!endGameGrid) {
        console.error('Element with ID "endGameGrid" not found');
        return;
    }

    endGameGrid.innerHTML = ''; // Clear existing books

//For each book in array, creates a div with an img element and p for the title
    retrievedSelectedGenreBooks.forEach(book => {

        console.log(`Title: ${book.title}`);
        console.log(`Genres: ${book.genres}`);

        console.log(`Rating: ${book.rating}`);
        console.log(`Cover Img: ${book.imagePath}`);
        console.log(`Book Link: ${book.goodreadsURL}`);

        //Creating a div for each book
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("bookContainer");

        //Creating an <a> element that links to the book's Goodreads!!!
        const link = document.createElement('a');
        link.href = book.goodreadsURL; 
        link.classList.add('bookLink'); //I ADDED !!!
        link.target = "_blank"; //Opens the link in a new window 

        //NEEDED const to always refer to the same image element throughout its scope
        const img = document.createElement('img');
        img.classList.add('bookContainer'); //I ADDED !!!
        img.src = book.imagePath;
        img.alt = book.title;

        //Then title element
        const title = document.createElement('p');
        title.classList.add('bookText');
        title.textContent = book.title;
        
        link.appendChild(img);
        bookDiv.appendChild(link);
        bookDiv.appendChild(title);
        endGameGrid.appendChild(bookDiv);

     });
    return retrievedSelectedGenreBooks; //all books on the grid
}


function spotifyPlaylist(imagePath, spotifyLink) {
    this.imagePath = imagePath;
    this.spotifyLink = spotifyLink;
}

//Array of objects of playlists
const spotifyPlaylists = [
    //index: 0-4 are Romance genre
    {
        imagePath: "css/images/spotify_images/Romance1.png",
        link: "https://open.spotify.com/playlist/4PLSf6EiOsoWL385abgoeX"
    },
    {
        imagePath: "css/images/spotify_images/Romance2.png",
        link: "https://open.spotify.com/playlist/4c8MUTW1ipZsO7lM9t8BIa"
    },
    {
        imagePath: "css/images/spotify_images/Romance3.png",
        link: "https://open.spotify.com/playlist/3qdvG9DQsVeq8EVSPK9GGD"
    },
    {
        imagePath: "css/images/spotify_images/Romance4.png",
        link: "https://open.spotify.com/playlist/1DZWtTI5DzupSSp8jvVIOE"
    },
    {
        imagePath: "css/images/spotify_images/Romance5.png",
        link: "https://open.spotify.com/playlist/5Jh2P13Nkn3yFaeWlhwErM"
    },

    //index: 5-10 are Fantasy genre
    {
        imagePath: "css/images/spotify_images/Fantasy1.png",
        link: "https://open.spotify.com/playlist/5HteG3iHuZRz8l5zo48cJD"
    },
    {
        imagePath: "css/images/spotify_images/Fantasy2.png",
        link: "https://open.spotify.com/playlist/6yIfxGFCjeoQ73u7Y4xAYX"
    },
    {
        imagePath: "css/images/spotify_images/Fantasy3.png",
        link: "https://open.spotify.com/playlist/0Aafs9d3simn5z9CVMktPE"
    },
    {
        imagePath: "css/images/spotify_images/Fantasy4.png",
        link: "https://open.spotify.com/playlist/5gmcpMlhNfoQOynwH5Wx3L"
    },
    {
        imagePath: "css/images/spotify_images/Fantasy5.png",
        link: "https://open.spotify.com/playlist/4RN5X0XaS9VSRgCdJsr5Gz"
    }
];

//ADD CLICKING PHOTO TO SEND TO GOODREADS ! ! !
function displaySpotifyRec(retrievedMainGenre){
    //gets randomIndex from script.js so it is saved
    let randomIndex = JSON.parse(localStorage.getItem("spotifyRandomIndex"));
    
    let chosenPlaylistImage = spotifyPlaylists[randomIndex].imagePath;
    let chosenPlaylistLink = spotifyPlaylists[randomIndex].link;

    const spotifyDiv = document.getElementById("smallEndGameDiv");
    const spotifyImgElement = document.getElementById("spotify");

    console.log(chosenPlaylistLink);

    const spotifyLink = document.getElementById('smallEndGameDiv').querySelector('a');

    if (spotifyLink) {
       spotifyLink.classList.add("spotifyLinkClass");
       spotifyLink.href = chosenPlaylistLink;
       spotifyLink.target = "_blank"; //opens link in a new tab
    } else {
        console.error("Spotify link not found!");
    }
    spotifyImgElement.src = chosenPlaylistImage;
    spotifyImgElement.alt = retrievedMainGenre + " Playlist Image";
}

function displayAllBookRecs() {
    let retrievedAllBookRecs = JSON.parse(localStorage.getItem("allBookRecs")); // Convert back to array
    console.log(retrievedAllBookRecs);
    let allBookRecsDiv = document.getElementById("allBookRecsDiv");

    //IMP ! ! ! temp. just to test

    retrievedAllBookRecs = retrievedAllBookRecs.slice(0, 50);

    //above

    allBookRecsDiv.innerHTML = ''; // Clear existing books
    let i = 1;
//For each book in array, creates a div with an img element and p for the title
retrievedAllBookRecs.forEach(book => {

        //Creating a div for each book
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("bookContainer");
        let allBookRecsDiv = document.getElementById("allBookRecsDiv");

        //Creating an <a> element that links to the book's Goodreads!!!
        const link = document.createElement('a');
        link.href = book.goodreadsURL; 
        link.classList.add('bookLink'); //I ADDED !!!
        link.target = "_blank"; //Opens the link in a new window 

        //NEEDED const to always refer to the same image element throughout its scope
        const img = document.createElement('img');
        img.classList.add('bookContainer'); 
        img.src = book.imagePath;
        img.alt = book.title;

        //Then title element
        const title = document.createElement('p');
        title.classList.add('allBookRecsTitles');
        title.textContent = i + ". " + book.title;

        //Then title element
        const rating = document.createElement('p');
        rating.classList.add('allBookRecsRatings');
        rating.textContent = "Rating: " + book.rating + "/5 Stars";
        
        link.appendChild(img);
        bookDiv.appendChild(link);
        bookDiv.appendChild(title);
        bookDiv.appendChild(rating);
        allBookRecsDiv.appendChild(bookDiv);
        i = i + 1;
     });
    return retrievedAllBookRecs; //all books on the grid
}

if (window.location.pathname === '/allBookRecs.html') {

document.addEventListener('DOMContentLoaded', function () {

    displayAllBookRecs();
});

}