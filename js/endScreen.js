
function displayResults() {
    const endGameResult = localStorage.getItem('endGameResult');
    const resultElement = document.getElementById('end-game-result');
    if (endGameResult && resultElement) {
        resultElement.textContent = "Your Result: " + endGameResult + "!";
    }
}

function genres() {
    const selectedGenreBookTitles = localStorage.getItem('selectedGenreBookTitles');
    const bookRecsElement = document.getElementById('bookRecsElement');

    //Build a single string and combine it at once!
    console.log(selectedGenreBookTitles);
    let printTitles = selectedGenreBookTitles.replace(/,/g, ', ');
 //   if (selectedGenreBookTitles && bookRecsElement) {
        bookRecsElement.textContent = "Your Book Recs: " + printTitles;
   // }
}

displayResults();
genres()
