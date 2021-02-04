const container = document.querySelector(".main-container");
let myLibrary = [];

//Form variables
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");

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

myLibrary.push(new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", "309", "no"));
displayBooks();

function addBookToLibrary() {
    title = formTitle.value;
    author = formAuthor.value;
    pages = formPages.value;
    read = formRead.value;
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    myLibrary.forEach(item => {
        item.node = document.createElement("div");
        item.node.classList.add("book-container");
        item.text = document.createElement("p");
        item.text.textContent = item.info();
        item.node.appendChild(item.text);
        container.appendChild(item.node);
        addDeleteBtn(item);
        addCompleteBtn(item);
    })
}

//New Book button
const newBookBtn = document.querySelector(".new-book-btn");
const popupForm = document.querySelector(".popup-form")

newBookBtn.addEventListener("click", function() {
    if (popupForm.style.display == "none") {
        openForm();
    }
    else {
        closeForm();
    }
})

function openForm() {
    popupForm.style.display = "block";
    newBookBtn.classList.add("close-btn");
    newBookBtn.textContent = "Close";
}

function closeForm() {
    popupForm.style.display = "none";
    newBookBtn.classList.remove("close-btn");
    newBookBtn.textContent = "Add a New Book";
}

//Form button
const formBtn = document.querySelector(".form-btn");

formBtn.addEventListener("click", function() {
    addBookToLibrary();
    initializeForm();
    displayBooks();
});

function initializeForm() {
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    formRead.value = "yes";
}

//Delete button
function addDeleteBtn(item) {
    item.deleteBtn = document.createElement("button");
    item.deleteBtn.classList.add("delete-btn");
    item.deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    item.node.appendChild(item.deleteBtn);

    //Add event listener
    addDeleteEvent(item);
}

function addDeleteEvent(item) {
    item.deleteBtn.addEventListener("click", function() {
        index = myLibrary.indexOf(item);
        container.removeChild(item.node);
        myLibrary.splice(index, 1);
    })
}

//Completed button
function addCompleteBtn(item) {
    item.completeBtn = document.createElement("button");
    item.completeBtn.classList.add("delete-btn");
    item.completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    item.node.appendChild(item.completeBtn);

    //Add event listener
    addCompleteEvent(item);
}

function addCompleteEvent(item) {
    item.completeBtn.addEventListener("click", function() {
        if (item.read == "no") {
            item.read = "yes";
            console.log(item.read);
        }
        else {
            item.read = "no";
            console.log(item.read);
        }
        item.text.textContent = item.info();
    })
}