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
        item.node.textContent = item.info();
        container.appendChild(item.node);
        addDeleteBtn(item);
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