

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

function displaySpotifyRec(retrievedMainGenre){
    //I am also going to want to add links to them so tbh will probably need to
    //change this to make a playLists object to combine image and link ahhhh

    let spotifyPlaylists = [];
    for(let i = 1; i <=5 ; i++){
        spotifyPlaylists.push(retrievedMainGenre + i + ".png"); //appending to array
    } //got array full of Spotify image links (their string name)
    //use random to get a random index value to pick a spotify playlist (from 0 to 4)
    let randomIndex = Math.floor(Math.random() * (4 - 0) + 0); //is this how to get a random number from 0 to 4
    let chosenPlaylistImage = spotifyPlaylists[randomIndex];

    const spotifyDiv = document.getElementById("smallEndGameDiv");
    const spotifyImgElement = document.getElementById("spotify");

    spotifyImgElement.src = "css/images/spotify_images/" + chosenPlaylistImage;
    spotifyImgElement.alt = retrievedMainGenre + " Playlist Image";

   // spotifyDiv.appendChild(spotifyImgElement);
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
    
       /* console.log(`Title: ${book.title}`);
        console.log(`Genres: ${book.genres}`);
        console.log(`Rating: ${book.rating}`);
        console.log(`Cover Img: ${book.imagePath}`);
        console.log(`Book Link: ${book.goodreadsURL}`);*/

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
/*
function displayAllBookRecs(){
    const retrievedAllBookRecs = JSON.parse(localStorage.getItem("allBookRecs")); // Convert back to array
    console.log(retrievedAllBookRecs);

    let allBookRecsDiv = document.getElementById("allBookRecsDiv");
    for(let i = 0; i <retrievedAllBookRecs.length ; i++){
    const bookRec = document.createElement("p");
    let bookNumber = i + 1;
    bookRec.textContent = bookNumber + ". " + retrievedAllBookRecs[i].title;
    allBookRecsDiv.appendChild(bookRec);
    }
}
    */

if (window.location.pathname === '/allBookRecs.html') {

document.addEventListener('DOMContentLoaded', function () {

    displayAllBookRecs();
});

}