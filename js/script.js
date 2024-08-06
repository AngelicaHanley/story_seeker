//Book Constructor Function - defines book object
function Book(title, imagePath, genres) {
    this.title = title;
    this.imagePath = imagePath;
    this.bookClicked = false;
    this.frameVisible = false;
    this.genres = genres;
}

//Array of book objects, intializes each book
let books = [
    new Book("Book Lovers", "css/images/BookLoversCover.jpeg", ["Romance", "Fiction"]),
    new Book("We Were Liars", "css/images/WeWereLiarsCover.jpeg", ["Mystery", "Young Adult"]),
    new Book("The Great Gatsby", "css/images/TheGreatGatsbyCover.jpeg", ["Classic", "Fiction"]),
    new Book("The Summer I Turned Pretty", "css/images/TheSummerITurnedPrettyCover.jpg", ["Romance", "Young Adult"]),
    new Book("Fourth Wing", "css/images/FourthWingCover.jpeg", ["Fantasy", "Romance"]),
    new Book("Harry Potter", "css/images/HarryPotterCover.jpeg", ["Fantasy", "Fiction"]),
    new Book("All The Bright Places", "css/images/AllTheBrightPlacesCover.jpeg", ["Romance", "Young Adult"]),
    new Book("The Selection", "css/images/TheSelectionCover.jpg", ["Romance", "Young Adult"]),
    new Book("Heartstopper", "css/images/HeartstopperCover.jpeg", ["Romance", "Graphic Novel"]),

    new Book("Pride and Prejudice", "css/images/PrideandPrejudice.jpg", ["Historical", "Classic"]),

    new Book("Today Tonight Tomorrow", "css/images/TodayTonightTomorrowCover.jpeg", ["Romance", "Young Adult"]),
    new Book("The Cruel Prince", "css/images/TheCruelPrinceCover.jpeg", ["Fantasy", "Young Adult"]),

    new Book("The Hunger Games", "css/images/TheHungerGames.jpg", ["Fantasy", "Science Fiction"]),

    new Book("Better Than The Movies", "css/images/BetterThanTheMoviesCover.jpeg", ["Romance", "Young Adult"]),
    new Book("Shatter Me", "css/images/ShatterMeCover.jpeg", ["Dystopia", "Young Adult"]),
    new Book("The Naturals", "css/images/TheNaturalsCover.jpg", ["Mystery", "Thriller"]),
    new Book("Happy Place", "css/images/HappyPlaceCover.jpg", ["Romance", "Contemporary"]),
    new Book("The Lightning Thief", "css/images/TheLightningThiefCover.jpg", ["Fantasy", "Young Adult"]),
    new Book("A Court of Thorns and Roses", "css/images/ACourtOfThornsAndRosesCover.jpg", ["Fantasy", "New Adult"]),
    new Book("The Outsiders", "css/images/TheOutsidersCover.jpg", ["Classic", "Fiction"])
];
//Initializing empty array and count
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
            img.style.boxShadow = '0 0 15px 12px lightskyblue';
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
    const bookGrid = document.getElementById("bookGrid");
//For each book in array, creates a div with an img element and p for the title
     books.forEach(book => {
         //Creating a div for each book
         const bookDiv = document.createElement("div");
         bookDiv.classList.add("book");

          //Making image element
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
    //4. Science fiction (dystopian)
    //Initializing genre array
    let points = {
        romance: 0, //1. Romance/contemporary/historical (usually has romance tbh)
        mystery: 0, //2. Mystery/thriller/crime
        fantasy: 0, //3. Fantasy
        scifi: 0, //4. Science fiction (dystopian)
        other: 0 //5. Other - reader of all traders (we'll give them this if no category has more than 5 or smtg)
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
        } else if (genre === "Fantasy") {
            points.fantasy++;
        } else if (genre === "Science Fiction" || genre === "Dystopia") {
            points.scifi++;
        } else if (genre !== "Fiction" && genre !== "Young Adult" && genre!= "New Adult" && 
            genre!= "Adult" && genre!= "Non Fiction") { //since these are too broad, they will not add points
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

// Call the function to display books when the page loads!!
displayBooks();
displayButton();
