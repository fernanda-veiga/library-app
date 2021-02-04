const container = document.querySelector(".main-container");
let myLibrary = [];

//Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read == "yes") {
            return `${this.title} by ${this.author}, ${this.pages} pages, completed`;
        }
        else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not completed`;
        } 
    }
}

function addBookToLibrary() {
    title = prompt("What is the book title?");
    author = prompt("Who is the book author?");
    pages = prompt("How many pages are there in the book?");
    read = prompt("Have you read the book?");
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    myLibrary.forEach(item => {
        item.node = document.createElement("div");
        item.node.classList.add("book-container");
        item.node.textContent = item.info();
        container.appendChild(item.node);
    })
}