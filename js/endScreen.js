

if (window.location.pathname === '/endScreen.html') {

   document.addEventListener('DOMContentLoaded', function () {

        //Displaying genre result
        const resultElement = document.getElementById('end-game-result');
        const retrievedMainGenre = JSON.parse(localStorage.getItem("mainGenre")); // Convert back to array
        console.log("LOCAL: ", retrievedMainGenre);
        resultElement.textContent = "Your Result: " + retrievedMainGenre + "!";

        //Displaying 5 book recs result
        const bookRecsElement = document.getElementById('bookRecsElement');
        const retrievedSelectedGenreBooks = JSON.parse(localStorage.getItem("selectedGenreBooks")); // Convert back to array
        console.log("LOCAL: ", retrievedSelectedGenreBooks);

        bookRecsElement.textContent = "Your Book Recs: ";
        
        const genreBookTitles = retrievedSelectedGenreBooks.map(book => book.title);
        for (let i = 0; i < retrievedSelectedGenreBooks.length; i++) {
            if(i<=3){
            console.log(retrievedSelectedGenreBooks[i].title);
            bookRecsElement.textContent += retrievedSelectedGenreBooks[i].title + ", ";
        } else{
            bookRecsElement.textContent += retrievedSelectedGenreBooks[i].title;
        }
        }

    });
}

