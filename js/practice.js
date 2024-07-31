//practice javascript date and time !
/* longer comments
*/
let d = new Date();
document.body.innerHTML = "<h0>Today's date is " + d + "</h0>"
//alert("Hi, welcome to Story Seeker!"); //sends an alert message on the screen right when opened
//potentially could do like if count == 12 then put alert saying bookshelf full!
let name = prompt("Welcome to Story Seeker! What is your name?"); //sends message on screen when opened, asking for user's name
//later prob see if after home page, if when user presses "start" button, we could have that pop up
//alert("Hello, " + name + "!");
console.log("Hello, World!");
console.log("NEWWW");

let book = {
    title: "",
    imagePath: "", //maybe don't need
    bookClicked: false,
    frameVisible: false,
    genres: []
}; //}; is used to terminate the statement, which is optional but recc

