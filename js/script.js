function Book(title, imagePath, genres) {
    this.title = title;
    this.imagePath = imagePath;
    this.bookClicked = false;
    this.frameVisible = false;
    this.genres = genres;
}

//Array of book objects
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
let count = 0;

//Function for book click
function handleBookClick(book, img) {
    //Checks if the book is already in the selectedBooks array
    const index = selectedBooks.indexOf(book); //If the item is not found it returns -1

    //Gets the current book title element
    const bookTitleElement = document.getElementById("selectedBookTitle");

    //Clears the current displayed book title
    if (bookTitleElement) {
        bookTitleElement.textContent = "";
    }

    //Creates a new book title element
    const bookTitle = document.createElement("p");
    bookTitle.id = "selectedBookTitle";
 //bookTitle.classList.add("p-2");

    //if (index === -1 && count <= 10) {
    if (index === -1) {
        //If book is not in array, add it in
        count += 1;
        selectedBooks.push(book);
        img.style.boxShadow = '0 0 15px 12px lightskyblue';
        bookTitle.textContent = book.title + " was added!";
    } else {
        //Book is in the array so, we remove it
        selectedBooks.splice(index, 1);
        img.style.boxShadow = 'none';
        count -= 1;
       if(count === 0){
        bookTitle.textContent = "";
        }
        else{
        bookTitle.textContent = book.title + " was removed.";
        } 
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

    //Writing debugging logs
    let selectedTitles = selectedBooks.map(selectedBook => selectedBook.title);
    console.log('Selected Books:', selectedTitles);
    console.log('Count:', count);
}

//Function to display the books!
function displayBooks() {
    const bookGrid = document.getElementById("bookGrid");
 
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

// Call the function to display books when the page loads!!
displayBooks();