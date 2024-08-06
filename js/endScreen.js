
function displayResults() {
    const endGameResult = localStorage.getItem('endGameResult');
    const resultElement = document.getElementById('end-game-result');
    if (endGameResult && resultElement) {
        resultElement.textContent = "Your Result: " + endGameResult + "!";
    }
}

displayResults();
