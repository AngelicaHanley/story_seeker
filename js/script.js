//Book Constructor Function - defines book object
function Book(title, genres, rating, imagePath, goodreadsURL) {
    this.title = title;
    this.genres = genres;
    this.rating = rating;
    this.imagePath = imagePath;
    this.goodreadsURL = goodreadsURL;
    this.bookClicked = false;
    this.frameVisible = false;
}

class bookManagerClass {
    constructor() {
        this._selectedGenreBooks = [];
        this._mainGenre = '';
    }

get selectedGenreBooks() {
    return this._selectedGenreBooks;
}

set selectedGenreBooks(value) {
    if (Array.isArray(value)) {
        this._selectedGenreBooks = value;
    }
}


//Setter
set mainGenre(genre) {
    this._mainGenre = genre;
}

//Getter
get mainGenre() {
    return this._mainGenre;
}
}

const bookManager = new bookManagerClass();

//global vars
let selectedBooks = [];
let count = 0;
let books = []; //MAIN ARRAY INITALIZED
let myGlobalVariable = '';

let endGame = false;

async function loadBooksFromCSV(file) {

    const response = await fetch(file);

    if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);
    }

    const csvData = await response.text();

    //Getting data from the rows
    const rows = csvData.split('\n');

    //Skip the header row!
    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); //Handles commas within quotes

        if (columns.length < 5) continue; //Skips rows with missing columns (in case)

        const title = columns[0].trim().replace(/^"|"$/g, ''); //Remove extra quotes
        let genres = columns[1].trim().replace(/^"|"$/g, ''); //Remove extra quotes
        const rating = columns[2].trim().replace(/^"|"$/g, '');
        const imagePath = columns[3].trim().replace(/^"|"$/g, '');
        const bookLink = columns[4].trim().replace(/^"|"$/g, '');

        //Manually parse the genres to get the array
        genres = genres
            .replace(/^\['/, '') // Removes leading [' from genres
            .replace(/'\]$/, '') // Removes the trailing '] from genres
            .split(/',\s*'/); // Splits it by ', ' or ', '

        //Creates the book object!
        const book = new Book(title, genres, parseFloat(rating), imagePath, bookLink);
        books.push(book);
    }
    console.log('Displaying Books!');
    return books;
}

function handleBookClick(book, img, books) {
    //Checks if the clicked book is already in the selectedBooks array
    const index = selectedBooks.indexOf(book); //if book is not found, it returns -1

    //Gets the current book title element from the html file then we update it
    const bookTitleElement = document.getElementById("selectedBookTitle");

    //Removes the current displayed book title from selectedBookTitle span element in html
    if (bookTitleElement) {
        bookTitleElement.textContent = "";
    }

    //Creates a new book title element, updates it based on if the book is being added/removed
    const bookTitle = document.createElement("p");
    bookTitle.id = "selectedBookTitle";

    if (index === -1) {
        
        //Checks if the bookshelf is full
        if (count < 10) {
            //If book is not in the array, add it
            selectedBooks.push(book);
            img.style.boxShadow = "0 0 15px 12px lightskyblue";
            bookTitle.textContent = book.title + " was added!";
            console.log("Count tracker!: ", count);   
            count += 1;
        } 
        if (count == 10){ //add end-game logic here
            endGame = true;
            //new try ! ! !
            localStorage.setItem("endGame", JSON.stringify(endGame)); //Convert to a string to store
            console.log("LOCAL: ",endGame);

            bookTitle.textContent = "Bookshelf is full!";
            console.log("END GAME Count: ",count);
            totalPoints(); //add up genre points
            genreBookRecs(books); //get the 5 genre bookRecs !
            allBookRecs(books);
        
            //Add other genres IMP ! ! !
            let i; //declare i so it is accessible outside of if statements
            if(bookManager.mainGenre == "Romance"){
                i = 0;
            }
            else if(bookManager.mainGenre == "Fantasy"){
                i = 5;
            }
            //check these
            else if(bookManager.mainGenre == "Mystery"){
                i = 10;
            }
            else if(bookManager.mainGenre == "Science Fiction"){
                i = 15;
            }
            else if(bookManager.mainGenre == "Classics"){
                i = 20;
            }
            else if(bookManager.mainGenre == "Fiction"){
                i = 25;
            }
        //setting spotify index here so it is sent to endScreen and not changed each time that page is refreshed
        let randomIndex = Math.floor(Math.random() * ((i+5) - i) + i);
        localStorage.setItem("spotifyRandomIndex", JSON.stringify(randomIndex)); // Store playlist index
        }
    } else {
        //Book is already in the array (clicked again) so, remove it
        selectedBooks.splice(index, 1);
        img.style.boxShadow = 'none';
        count -= 1;
        bookTitle.textContent = book.title + " was removed.";
    }

    //Updating the book title on screen
    if (bookTitleElement) {
        bookTitleElement.textContent = bookTitle.textContent;
    } else {
        const titleWrapper = document.querySelector(".title-wrapper");
        titleWrapper.appendChild(bookTitle);
    }

    //Updating the count display on our screen
    const bookCountElement = document.getElementById("bookCount");
    if (bookCountElement) {
        bookCountElement.textContent = "Count: " + count + "/10";
    }
    //Debugging
    let selectedTitles = selectedBooks.map(selectedBook => selectedBook.title);
    console.log('Selected Books:', selectedTitles);

    displayButton(); //update display button after every click
}

//Function to display the books and makes them interactive by attaching click event listeners
function displayBooks() {

    let bookGrid = document.getElementById("bookGrid");
    console.log('bookGrid:', bookGrid);

    if (!bookGrid) {
        console.error('Element with ID "bookGrid" not found');
        return;
    }

    bookGrid.innerHTML = ''; // Clear existing books

    //Gets the first specific amount of books
    const specificAmtBooks = books.slice(0, 2000);
    //Set to track the unique random indices
    const selectedIndices = new Set();
    //Array to store the selected random books
    const gridBooks = [];

    while (gridBooks.length < 100 && selectedIndices.size < 1500) {
        const randomIndex = getRandomInt(0, 1500);
        if (!selectedIndices.has(randomIndex)) {
            const book = specificAmtBooks[randomIndex];
        
            //if function returns true, then continue (so skip the book)
            if (refiningBooks(book)) {
                continue; 
            } 

            //Adds the book if it doesn't get skipped b/c of above
            selectedIndices.add(randomIndex);
            gridBooks.push(book);
        }
    } 

//For each book in array, creates a div with an img element and p for the title
    gridBooks.forEach(book => {

        console.log(`Title: ${book.title}`);
        console.log(`Genres: ${book.genres}`);

        console.log(`Rating: ${book.rating}`);
        console.log(`Cover Img: ${book.imagePath}`);
        console.log(`Book Link: ${book.goodreadsURL}`);

        //Creating a div for each book
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        //NEEDED const to always refer to the same image element throughout its scope
        const img = document.createElement('img');
        img.src = book.imagePath;
        img.alt = book.title;

        //Then appending image and title to the book container
        bookDiv.appendChild(img);
        //bookDiv.appendChild(title);
        bookGrid.appendChild(bookDiv);

        //Adding the click event listener to the book div
        bookDiv.addEventListener('click', () => {
            handleBookClick(book, img, books);
         });
     });
    return gridBooks; //all books on the grid
}

//Function to display the button and makes it interactive by attaching click event listeners
//Need to call this function every time count changes
function displayButton() {
    const nextButton = document.getElementById("button");
    const buttonLink = document.querySelector(".div-3 a"); //Get the <a> element 

    if (count === 10) {
        nextButton.style.filter = 'grayscale(0%)'; // Button style for when the count is 10
        buttonLink.href = "endScreen.html"; //adds link
        buttonLink.style.pointerEvents = 'auto'; //makes sure the link is clickable
    } else if(count < 10){
        nextButton.style.filter = 'grayscale(100%)'; // Reset button style when count is not 10
        buttonLink.href = "#"; //removes link
        buttonLink.style.pointerEvents = 'none'; //disables clicking
    }
        }

function totalPoints() {
    //Creating main genres for user to be given their results as
    //Initializing genre array
    let points = {
        Romance: 0, //1. Romance/contemporary/historical (usually has romance tbh)
        Mystery: 0, //2. Mystery/thriller/crime
        Fantasy: 0, //3. Fantasy
        scienceFiction: 0, //4. Science fiction (dystopian)
        Classics: 0, //5. Educational ??? maybe change name
        Other: 0 //6. Other - reader of all traders (we'll give them this if no category has more than 5 or smtg)
    };

    //Creating arrays from the genres of books picked
    let selectedGenres = selectedBooks.map(selectedBook => selectedBook.genres);
    console.log('Selected Genres:', selectedGenres);

      //Iterating through all the arrays in selectedGenres
      selectedGenres.forEach(genresArray => {
        genresArray.forEach(genre => {
        //Iterating through each genre

        if (genre === "Romance" || genre === "Contemporary" || genre === "Contemporary Romance" || genre === "Historical Romance" || genre === "Paranormal Romance" || genre === "Fantasy Romance"|| genre === "Young Adult Romance" || genre === "Sports Romance") {
            points.Romance++;
        } else if (genre === "Mystery" || genre === "Thriller" || genre === "Crime") {
            points.Mystery++;
        } else if (genre === "Fantasy" || genre === "Vampires" || genre === "Paranormal") {
            points.Fantasy++;
        } else if (genre === "Science Fiction" || genre === "Dystopia") {
            points.scienceFiction++;
        } else if (genre === "Classics" || genre === "Historical Fiction" || genre === "Biography" || genre === "Memoir" || genre === "Philosophy") {
            points.Classics++;
        } else if (genre !== "Fiction" && genre !== "Young Adult" && genre!= "New Adult" && 
            genre!= "Adult" && genre!= "Non Fiction" && genre!= "Childrens" && genre!="Picture Books" && genre!="Graphic Novels") { //since these are too broad, they will not add points
            points.Other++;
        }
        });
    });
    console.log('Points:', points); 
    //Seeing which genre has the most points!
    let tiedGenres = [];
    let maxPoints = 0;
    for (let genre in points) { //iterating through each index of genre in points
        if (points[genre] > maxPoints) {
            maxPoints = points[genre];
            tiedGenres = [genre]; //we do this in case of a tie
        } else if (points[genre] === maxPoints) {
            tiedGenres.push(genre);
        }
    }
    //In case of a tie, we randomly choose one of the users top genres
    //IMP!!! : could add later what their secondary top genre was
bookManager.mainGenre = tiedGenres[Math.floor(Math.random() * tiedGenres.length)];
console.log('Updated Main Genre:', bookManager.mainGenre);
}

function genreBookRecs(books){
    console.log("Main Genre in FUNCTION: ", bookManager.mainGenre);
    //Gets the first specific amount of books
    let listCapacity = 500; //only gives you 5 random book recs from the top 500 books (since they are the best rated ones!)
    const specificAmtBooks = books.slice(0, listCapacity);
    //Set to track the unique random indices
    const mySelectedIndices = new Set();

    if(bookManager.mainGenre == "scienceFiction"){
        bookManager.mainGenre = "Science Fiction";
    }
    else if (bookManager.mainGenre == "Other"){
        bookManager.mainGenre = "Fiction"; //IMP!!!: i am ignoring non-fiction for now, maybe change
    } //ACTUALLY I AM THINKING, if "other" then your top genres will just be 5 random books from the top books?
    //OR maybe just do it so you can 1 random book that has each of these genres + non-ficiton
    console.log("Main Genre in FUNCTION again: ", bookManager.mainGenre);

    // Function to check if a book's title exists in selectedBooks array
    function isBookTitleSelected(title) {
        return selectedBooks.some(book => book.title === title);
    } //returns true if a book's title matches any title in our selectedBooks array

    while (bookManager.selectedGenreBooks.length < 5 && mySelectedIndices.size < listCapacity ) {
     
        const myRandomIndex = getRandomInt(0, listCapacity-1);
        if (!mySelectedIndices.has(myRandomIndex)){
            const book = specificAmtBooks[myRandomIndex];

            if(book.genres.includes(bookManager.mainGenre)) {

                //Checks if the book's title is already in selectedBooks
                if (isBookTitleSelected(book.title)) {
                    continue; //Skip the book if the function returns true (i.e. book is in array)
                }

                            //if function returns true, then continue (so skip the book)
                if (refiningBooks(book)) {
                    continue; 
                } 

            mySelectedIndices.add(myRandomIndex);
            bookManager.selectedGenreBooks.push(book);
            }
        }
    } 
    console.log("Selected Genre Books in script: ",bookManager.selectedGenreBooks);
    //setting items to use in other JS files!
    localStorage.setItem("mainGenre", JSON.stringify(bookManager.mainGenre)); //Convert to a string to store
    console.log("LOCAL: ",bookManager.mainGenre);

    localStorage.setItem("selectedGenreBooks", JSON.stringify(bookManager.selectedGenreBooks));
    console.log("LOCAL: ",bookManager.selectedGenreBooks);
}


function allBookRecs(books){

    const allBookRecs = [];

    if(bookManager.mainGenre == "scienceFiction"){
        bookManager.mainGenre = "Science Fiction";
    }
    else if (bookManager.mainGenre == "Other"){
        bookManager.mainGenre = "Fiction"; //IMP!!!: i am ignoring non-fiction for now, maybe change
    } //ACTUALLY I AM THINKING, if "other" then your top genres will just be 5 random books from the top books?
    //OR maybe just do it so you can 1 random book that has each of these genres + non-ficiton

    // Function to check if a book's title exists in selectedBooks array
    function isBookTitleSelected(title) {
        return selectedBooks.some(book => book.title === title); 
    } //returns true if a book's title matches any title in our selectedBooks array

    for(let i = 0; i<books.length; i++){

        if(books[i].genres.includes(bookManager.mainGenre)) {

            //Checks if the book's title is already in selectedBooks
            if (isBookTitleSelected(books[i].title)) {
                console.log("Skipping book for now since was in 5 recs: ", books[i].title)
                continue; //Skip the book if the function returns true (i.e. book is in array)
                //potentially instead have it where if the book is in the array then it is like in a different font color
            }

            //if function returns true, then continue (so skip the book)
            if (refiningBooks(books[i])) {
                continue; 
            } 
           // console.log(books[i].title,", genres: ", books[i].genres);
        allBookRecs.push(books[i]);
        }
    }
    localStorage.setItem("allBookRecs", JSON.stringify(allBookRecs));
    console.log("LOCAL: ",allBookRecs);
    return allBookRecs;
}


function refiningBooks(book){

 //Checks if the book should be skipped depending on the title
 if (book.title.includes("Complete") || book.title.includes("Series") || 
 book.title.includes("Collection") || book.title.includes("Draft") || book.title.includes("Box Set") ||
 book.title.includes("Trilogy") || book.title.includes("Boxed") || book.title === "Title not found") {
     console.log("SKIPPING this book: ", book.title);
     return true; //Skips this book!
 }

 if (book.genres.includes("Nonfiction") || book.genres.includes("Picture Books") || 
 book.genres.includes("Religious") || 
 book.genres.includes("Short Stories")|| 
 book.genres.includes("Childrens") || book.genres.includes("[]")) {
     console.log("SKIPPING this book: ", book.title, " with genres: ", book.genres);
     return true;
}    
return false;

}

//Function to get a random int between min and max 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}




document.addEventListener('DOMContentLoaded', async function () {
    try {
        console.log('Current pathname:', window.location.pathname);
//Coded it so it only works on the first screen

//IMP! ! !: use this for website testing
//if (window.location.pathname === '/index.html') { 
//IMP! ! !: use this for github website
if (window.location.pathname === '/story_seeker/') {
  //  if (window.location.pathname === '/story_seeker/index.html') {

        // Clear the Spotify playlist index when starting a new game
    localStorage.removeItem("spotifyRandomIndex");
        
        console.log("Trying code!");
        displayButton();
        books = await loadBooksFromCSV('bookData.csv');
        const gridBooks = displayBooks();
        console.log(gridBooks);
    }
    
} catch (error) {
    console.error('Error loading books:', error);
}
});
//}
