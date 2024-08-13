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

//Array to store book objects, that are loaded dynamically from the CSV file
let books = [];

let selectedBooks = [];
let count = 0;

//Function for book click, parameters are the book clicked and img
function handleBookClick(book, img) {
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
        if (count === 10) {
            bookTitle.textContent = "Bookshelf is full!";
        } else {
            //If book is not in the array, add it
            count += 1;
            selectedBooks.push(book);
            img.style.boxShadow = "0 0 15px 12px lightskyblue";
            bookTitle.textContent = book.title + " was added!";
        }
    } else {
        //Book is in the array so, remove it
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
    displayButton();

    //Writing debugging logs
    let selectedTitles = selectedBooks.map(selectedBook => selectedBook.title);
    console.log('Selected Books:', selectedTitles);
}

//Function to display the books and makes them interactive by attaching click event listeners
function displayBooks() {
    console.log('Books array in displayBooks:', books);
    bookGrid = document.getElementById("bookGrid");
    bookGrid.innerHTML = ''; // Clear existing books

    //Gets the first specific amount of books
    const firstSpecificAmtBooks = books.slice(0, 2000);
    //Set to track the unique random indices
    const selectedIndices = new Set();
    // Array to store the selected random books
    const selectedBooks = [];

    console.log("About to get books!");
    while (selectedBooks.length < 100 && selectedIndices.size < 1500) {
        console.log("GETTING BOOKS!");
        const randomIndex = getRandomInt(0, 1500);
        if (!selectedIndices.has(randomIndex)) {
            const book = firstSpecificAmtBooks[randomIndex];
          //  console.log("!Genres:! ", book.genres);
    
            //Checks if the book should be skipped depending on the title
            if (book.title.includes("Complete") || book.title.includes("Series") || 
            book.title.includes("Collection") || book.title.includes("Draft") || book.title.includes("Box Set") ||
            book.title === "Title not found") {
                continue; //Skips this book!
            }
     
            if (book.genres.includes("Nonfiction") || book.genres.includes("Picture Books") || 
            book.genres.includes("Religious") || 
            book.genres.includes("Short Stories")|| 
            book.genres.includes("Childrens") || book.genres.length === 0) {
            //book.generes.includes("[]")
                continue;
            }
            //Adds the book if it doesn't get skipped b/c of above
            selectedIndices.add(randomIndex);
            selectedBooks.push(book);
        }
    }


    ///Gets 100 random books from the first 2000 books, UPDATE IF I WANT MORE/LESS BOOKS ON SCREEN
   /* while (selectedIndices.size < 100) {
        const randomIndex = getRandomInt(0, 2000); //picks random indexes
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex);
            selectedBooks.push(firstSpecificAmtBooks[randomIndex]);
        }
    } */

//For each book in array, creates a div with an img element and p for the title
    selectedBooks.forEach(book => {

        console.log(`Title: ${book.title}`);
        console.log(`Genres: ${book.genres}`);

        console.log(`Rating: ${book.rating}`);
        console.log(`Cover Img: ${book.imagePath}`);
        console.log(`Book Link: ${book.bookLink}`);

        //Creating a div for each book
        bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        //NEEDED to always refer to the same image element throughout its scope
        const img = document.createElement('img');
        img.src = book.imagePath;
        img.alt = book.title;

        //Then title element
        const title = document.createElement('p');
        title.textContent = book.title;

        //Then appending image and title to the book container
        bookDiv.appendChild(img);
        bookDiv.appendChild(title);
        bookGrid.appendChild(bookDiv);

        //Adding the click event listener to the book div
        bookDiv.addEventListener('click', () => {
            handleBookClick(book, img);
         });
     });
 }

 //Function to display the button and makes it interactive by attaching click event listeners
 //Need to call this function every time count changes
function displayButton() {
    const nextButton = document.getElementById("next-button");
    const buttonLink = document.querySelector(".div-3 a"); //Get the <a> element 

    if (count === 10) {
        nextButton.style.filter = 'grayscale(0%)'; // Button style for when the count is 10
        buttonLink.href = "endScreen.html"; //adds link
        buttonLink.style.pointerEvents = 'auto'; //makes sure the link is clickable
        //CALL END GAME POINT FUNCTION HERE ! (I think)
        totalPoints();
    } else {
        nextButton.style.filter = 'grayscale(100%)'; // Reset button style when count is not 10
        buttonLink.href = "#"; //removes link
        buttonLink.style.pointerEvents = 'none'; //disables clicking
    }

        }

function totalPoints() {
    //Creating main genres for user to be given their results as
    //Initializing genre array
    let points = {
        romance: 0, //1. Romance/contemporary/historical (usually has romance tbh)
        mystery: 0, //2. Mystery/thriller/crime
        fantasy: 0, //3. Fantasy
        scifi: 0, //4. Science fiction (dystopian)
        educational: 0, //5. Educational ??? maybe change name
        other: 0 //6. Other - reader of all traders (we'll give them this if no category has more than 5 or smtg)
    };

    //Creating arrays from the genres of books picked
    let selectedGenres = selectedBooks.map(selectedBook => selectedBook.genres);
    console.log('Selected Genres:', selectedGenres);

      //Iterating through all the arrays in selectedGenres
      selectedGenres.forEach(genresArray => {
        genresArray.forEach(genre => {
        //Iterating through each genre

        if (genre === "Romance" || genre === "Contemporary") {
            points.romance++;
        } else if (genre === "Mystery" || genre === "Thriller" || genre === "Crime") {
            points.mystery++;
        } else if (genre === "Fantasy" || genre === "Vampires" || genre === "Paranormal") {
            points.fantasy++;
        } else if (genre === "Science Fiction" || genre === "Dystopia") {
            points.scifi++;
        } else if (genre === "Classics" || genre === "Historical Fiction" || genre === "Biography" || genre === "Memoir" || genre === "Philosophy") {
            points.educational++;
        } else if (genre !== "Fiction" && genre !== "Young Adult" && genre!= "New Adult" && 
            genre!= "Adult" && genre!= "Non Fiction" && genre!= "Childrens" && genre!="Picture Books" && genre!="Graphic Novels") { //since these are too broad, they will not add points
            points.other++;
        }
        });
    });
    console.log('Points:', points); 
    //Seeing which genre has the most points!
    //let mainGenre = "";
    let tiedGenres = [];
    let maxPoints = 0;
    for (let genre in points) { //iterating through each index of genre in points
        if (points[genre] > maxPoints) {
            maxPoints = points[genre];
         //   mainGenre = genre;
            tiedGenres = [genre]; //we do this in case of a tie
        } else if (points[genre] === maxPoints) {
            tiedGenres.push(genre);
        }
    }
    //In case of a tie, we randomly choose one of the users top genres
    //IMP: could add later what their secondary genre was
let mainGenre = tiedGenres[Math.floor(Math.random() * tiedGenres.length)];
    console.log('Main Genre:', mainGenre);
// Calculate and store the result so we can use in other js file
localStorage.setItem('endGameResult', mainGenre);
}

async function loadBooksFromCSV(file) {
    console.log("Loading CSV data from file:", file);

    const response = await fetch(file);
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
            .replace(/^\['/, '') // Remove leading [' from genres
            .replace(/'\]$/, '') // Remove trailing '] from genres
            .split(/',\s*'/); // Split by ', ' or ', '

        //Creates the book object!
        const book = new Book(title, genres, parseFloat(rating), imagePath, bookLink);
        books.push(book);
    }
    displayBooks();
    console.log('Displaying Books!');
    return books;
}

//Function to get a random int b/w min and max 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Example usage
window.onload = async () => {

    loadBooksFromCSV('bookData.csv');
    displayButton();
};
