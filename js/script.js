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
    new Book("From Lukov With Love", "css/images/FromLukovWithLoveCover.jpeg", ["Romance", "Fiction"]),
    new Book("Heartstopper", "css/images/HeartstopperCover.jpeg", ["Romance", "Graphic Novel"]),
    new Book("The Seven Husbands of Evelyn Hugo", "css/images/TheSevenHusbandsOfEvelynHugoCover.jpeg", ["Historical", "Romance"]),
    new Book("Today Tonight Tomorrow", "css/images/TodayTonightTomorrowCover.jpeg", ["Romance", "Young Adult"]),
    new Book("The Cruel Prince", "css/images/TheCruelPrinceCover.jpeg", ["Fantasy", "Adventure"]),

    new Book("Book Lovers13", "css/images/BookLoversCover.jpeg", ["Romance", "Fiction"]),
    new Book("We Were Liars14", "css/images/WeWereLiarsCover.jpeg", ["Mystery", "Young Adult"]),
    new Book("The Great Gatsby15", "css/images/TheGreatGatsbyCover.jpeg", ["Classic", "Fiction"]),
    new Book("The Summer I Turned Pretty16", "css/images/TheSummerITurnedPrettyCover.jpg", ["Romance", "Young Adult"]),
    new Book("Fourth Wing17", "css/images/FourthWingCover.jpeg", ["Fantasy", "Adventure"]),
    new Book("Harry Potter18", "css/images/HarryPotterCover.jpeg", ["Fantasy", "Adventure"]),
    new Book("All The Bright Places19", "css/images/AllTheBrightPlacesCover.jpeg", ["Romance", "Young Adult"]),
    new Book("From Lukov With Love20", "css/images/FromLukovWithLoveCover.jpeg", ["Romance", "Fiction"])
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
         bookDiv.appendChild(title);
 
         // Append the book container to the grid
         bookGrid.appendChild(bookDiv);
    });
}

// Call the function to display books when the page loads
//window.onload = displayBooks;
displayBooks();
