

if (window.location.pathname === '/endScreen.html') {

   document.addEventListener('DOMContentLoaded', function () {

        //Displaying genre result
        const resultElement = document.getElementById('end-game-result');
        const retrievedMainGenre = JSON.parse(localStorage.getItem("mainGenre")); // Convert back to array
        console.log("LOCAL: ", retrievedMainGenre);
        resultElement.textContent = "Top Genre: " + retrievedMainGenre + "!";

        const retrievedSelectedGenreBooks = displayBookResults();

        displayEndGameBooks(retrievedSelectedGenreBooks);
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
