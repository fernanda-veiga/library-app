const container = document.querySelector(".main-container");
let myLibrary = [];

//Form variables
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");

//Book object constructor
function Book(title, author, pages, read) {
    this.img = '<i class="fas fa-book"></i>'
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read == "yes") {
            return `<b>Title:</b> ${this.title}<br><br>
            <b>Author:</b> ${this.author}<br><br>
            <b>No of Pages:</b> ${this.pages} page(s)<br><br>
            The book is completed`;
        }
        else {
            return `<b>Title:</b> ${this.title}<br><br>
            <b>Author:</b> ${this.author}<br><br>
            <b>No of Pages:</b> ${this.pages} page(s)<br><br>
            The book is not completed`;
        } 
    }
}

myLibrary.push(new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", "309", "yes"));
displayBook();

function addBookToLibrary() {
    title = formTitle.value;
    author = formAuthor.value;
    pages = formPages.value;
    read = formRead.value;
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBook() {
    item = myLibrary[myLibrary.length - 1];

    item.node = document.createElement("div");
    item.node.classList.add("book-container");
    item.text = document.createElement("p");
    item.text.classList.add("book-text");
    item.text.innerHTML = item.info();
    item.node.appendChild(item.text);
    container.appendChild(item.node);
    addDeleteBtn(item);
    addCompleteBtn(item);
    /*myLibrary.forEach(item => {
        
    })*/
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
    displayBook();
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
    item.deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> &nbsp; Delete';
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
    item.completeBtn.classList.add("complete-btn");

    if (item.read == "no") {
        incomplete(item);
    }
    else {
        completed(item);
    }

    item.node.appendChild(item.completeBtn);

    //Add event listener
    addCompleteEvent(item);
}

function addCompleteEvent(item) {
    item.completeBtn.addEventListener("click", function() {
        if (item.read == "no") {
            console.log("yes")
            item.read = "yes";
            completed(item);
        }
        else {
            console.log("no")
            item.read = "no";
            incomplete(item);
        }
        item.text.innerHTML = item.info();
    })
}

function completed(item) {
    item.completeBtn.style.backgroundColor = "lightgray";
    item.completeBtn.innerHTML = '<i class="fas fa-check"></i> &nbsp; Completed!'
}

function incomplete(item) {
    item.completeBtn.style.backgroundColor = "#5CA4A9";
    item.completeBtn.innerHTML = '<i class="fas fa-check"></i> &nbsp; Complete';
}