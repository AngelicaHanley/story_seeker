
// Book constructor function
function Book(title, imagePath, genres) {
    this.title = title;
    this.imagePath = imagePath;
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
        new Book("Fourth Wing", "css/images/FourthWingCover.jpeg", ["Fantasy", "Romance"]),
        new Book("Harry Potter", "css/images/HarryPotterCover.jpeg", ["Fantasy", "Fiction"]),
        new Book("All The Bright Places", "css/images/AllTheBrightPlacesCover.jpeg", ["Romance", "Young Adult"]),
        new Book("The Selection", "css/images/TheSelectionCover.jpg", ["Romance", "Young Adult"]),
        new Book("Heartstopper", "css/images/HeartstopperCover.jpeg", ["Romance", "Graphic Novel"]),
        new Book("The Seven Husbands of Evelyn Hugo", "css/images/TheSevenHusbandsOfEvelynHugoCover.jpeg", ["Historical", "Contemporary"]),
        new Book("Today Tonight Tomorrow", "css/images/TodayTonightTomorrowCover.jpeg", ["Romance", "Young Adult"]),
        new Book("The Cruel Prince", "css/images/TheCruelPrinceCover.jpeg", ["Fantasy", "Young Adult"]),

        new Book("Before We Were Strangers", "css/images/BeforeWeWereStrangersCover.jpeg", ["Romance", "Contemporary"]),
        new Book("Better Than The Movies", "css/images/BetterThanTheMoviesCover.jpeg", ["Romance", "Young Adult"]),
        new Book("Shatter Me", "css/images/ShatterMeCover.jpeg", ["Dystopia", "Young Adult"]),
        new Book("The Naturals", "css/images/TheNaturalsCover.jpg", ["Mystery", "Thriller"]),
        new Book("Happy Place", "css/images/HappyPlaceCover.jpg", ["Romance", "Contemporary"]),
        new Book("The Lightning Thief", "css/images/TheLightningThiefCover.jpg", ["Fantasy", "Young Adult"]),
        new Book("A Court of Thorns and Roses", "css/images/ACourtOfThornsAndRosesCover.jpg", ["Fantasy", "New Adult"]),
        new Book("The Outsiders", "css/images/TheOutsidersCover.jpg", ["Classic", "Fiction"])
];

let selectedBooks = [];

// Function to handle book click
function handleBookClick(book, img) {
    // Check if the book is already in the selectedBooks array
    const index = selectedBooks.indexOf(book);

    if (index === -1) {
        // Book is not in the array, add it
        selectedBooks.push(book);
        // Add box shadow to the book image when clicked
        img.style.boxShadow = '0 0 15px 12px lightskyblue';
    } else {
        // Book is in the array, remove it
        selectedBooks.splice(index, 1);
        // Remove box shadow from the book image when clicked again
        img.style.boxShadow = 'none';
    }

    // Optionally log the list of selected books to the console for debugging
   // console.log('Selected Books:', selectedBooks);
    // Log the titles of selected books to the console
    let selectedTitles = [];
    for (const selectedBook of selectedBooks) {
        selectedTitles.push(selectedBook.title);
    }
    console.log('Selected Books:', selectedTitles);
}

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


/*
        // Add click event listener to the book div
        bookDiv.addEventListener('click', () => {
            // Toggle bookClicked state
            book.bookClicked = !book.bookClicked;

            // Toggle frame visibility
            if (book.bookClicked) {
               // img.style.border = '10px solid lightskyblue'; // Example highlight
               img.style.boxShadow = '0 0 15px 12px lightskyblue';
            } else {
                img.style.boxShadow  = 'none';
            }
        }); */

        // Append image to the book container
        bookDiv.appendChild(img);

        // Append the book container to the grid
        bookGrid.appendChild(bookDiv);

        // Add click event listener to the book div
        bookDiv.addEventListener('click', () => {
            handleBookClick(book, img);
        });
    });
}

// Call the function to display books when the page loads
displayBooks();