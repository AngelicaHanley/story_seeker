// Book constructor function
function Book(title, imagePath, genres) {
    this.title = title;
    this.imagePath = imagePath; // Path to the book cover image
    this.bookClicked = false;
    this.frameVisible = false;
    this.genres = genres;
}

// Create an array of book objects
let books = [
        new Book("Book Lovers", "css/images/BookLoversCover.jpeg", ["Romance", "Fiction"]),
        new Book("We Were Liars", "css/images/WeWereLiarsCover.jpeg", ["Mystery", "Young Adult"]),
        new Book("The Great Gatsby", "css/images/TheGreatGatsbyCover.jpeg", ["Classic", "Fiction"]),
        new Book("The Summer I Turned Pretty", "css/images/TheSummerITurnedPrettyCover.jpg", ["Romance", "Young Adult"]),
        new Book("Fourth Wing", "css/images/FourthWingCover.jpeg", ["Fantasy", "Adventure"]),
        new Book("Harry Potter", "css/images/HarryPotterCover.jpeg", ["Fantasy", "Adventure"]),
        new Book("All The Bright Places", "css/images/AllTheBrightPlacesCover.jpeg", ["Romance", "Young Adult"]),
    new Book("The Selection", "css/images/TheSelectionCover.jpg", ["Romance", "Fiction"]),
        new Book("Heartstopper", "css/images/HeartstopperCover.jpeg", ["Romance", "Graphic Novel"]),
        new Book("The Seven Husbands of Evelyn Hugo", "css/images/TheSevenHusbandsOfEvelynHugoCover.jpeg", ["Historical", "Romance"]),
        new Book("Today Tonight Tomorrow", "css/images/TodayTonightTomorrowCover.jpeg", ["Romance", "Young Adult"]),
        new Book("The Cruel Prince", "css/images/TheCruelPrinceCover.jpeg", ["Fantasy", "Adventure"]),

        new Book("Before We Were Strangers", "css/images/BeforeWeWereStrangersCover.jpeg", ["Romance", "Fiction"]),
        new Book("Better Than The Movies", "css/images/BetterThanTheMoviesCover.jpeg", ["Mystery", "Young Adult"]),
        new Book("Shatter Me", "css/images/ShatterMeCover.jpeg", ["Classic", "Fiction"]),
    new Book("The Naturals", "css/images/TheNaturalsCover.jpg", ["Romance", "Young Adult"]),
    new Book("Happy Place", "css/images/HappyPlaceCover.jpg", ["Fantasy", "Adventure"]),
    new Book("The Lightning Thief", "css/images/TheLightningThiefCover.jpg", ["Fantasy", "Adventure"]),
    new Book("A Court of Thorns and Roses", "css/images/ACourtOfThornsAndRosesCover.jpg", ["Romance", "Young Adult"]),
    new Book("The Outsiders", "css/images/TheOutsidersCover.jpg", ["Romance", "Fiction"])
];

// Function to display books
function displayBooks() {
   // const bookContainer = document.getElementById("book-container");
   const bookGrid = document.getElementById("bookGrid");

    books.forEach(book => {
        // Create a div for each book
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
/*
        // Create an image element for the book cover
        const bookImg = document.createElement("img");
        bookImg.src = book.imagePath;
        bookImg.alt = book.title;
        bookImg.classList.add("book-cover");

        // Create a paragraph element for the book title
        const bookTitle = document.createElement("p");
        bookTitle.textContent = book.title;

        // Append image and title to the book div
        bookDiv.appendChild(bookImg);
        bookDiv.appendChild(bookTitle);

        // Append the book div to the book container
        bookContainer.appendChild(bookDiv); */
         // Create image element
         const img = document.createElement('img');
         img.src = book.imagePath;
         img.alt = book.title;
 
         // Create title element
         const title = document.createElement('p');
         title.textContent = book.title;
 
         // Append image and title to the book container
         bookDiv.appendChild(img);
        // bookDiv.appendChild(title);
 
         // Append the book container to the grid
         bookGrid.appendChild(bookDiv);
    });
}

// Call the function to display books when the page loads
//window.onload = displayBooks;
displayBooks();
