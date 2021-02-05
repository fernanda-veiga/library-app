const container = document.querySelector(".main-container");
let myLibrary = [];

//Form variables
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const formImg = document.querySelector("#cover-img")

//Open and close the form
const newBookBtn = document.querySelector(".new-book-btn");
const popupForm = document.querySelector(".popup-form");
const formBackground = document.querySelector(".transparent");
const closeFormBtn = document.querySelector(".close-btn");

newBookBtn.addEventListener("click", openForm);
closeFormBtn.addEventListener("click", closeForm);

function openForm() {
    popupForm.style.display = "block";
    formBackground.style.display = "block";
}

function closeForm() {
    popupForm.style.display = "none";
    formBackground.style.display = "none";
}

//Add a book
const formBtn = document.querySelector(".form-btn");

formBtn.addEventListener("click", function() {
    addBookToLibrary();
    initializeForm();
    displayBook();
    closeForm();
});

function initializeForm() {
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    formRead.value = "yes";
}

//Book object constructor
function Book(img, title, author, pages, read) {
    this.img = img;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read == "yes") {
            return `${this.img}
            <p><b>Title:</b> ${this.title}</p>
            <p><b>Author:</b> ${this.author}</p>
            <p><b>No of Pages:</b> ${this.pages} page(s)</p>
            <p>The book is completed</p>`;
        }
        else {
            return `${this.img}
            <p><b>Title:</b> ${this.title}</p>
            <p><b>Author:</b> ${this.author}</p>
            <p><b>No of Pages:</b> ${this.pages} page(s)</p>
            <p>The book is not completed</p>`;
        } 
    }
}

myLibrary.push(new Book(`<img src="https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg">`,"Harry Potter and the Philosopher's Stone", "J. K. Rowling", "309", "yes"));
displayBook();

function addBookToLibrary() {
    if(formImg.value == "") {
        img = '<i id="no-img" class="fas fa-book"></i>'
    }
    else {
        img = `<img src="${formImg.value}">`;
    }
    
    title = formTitle.value;
    author = formAuthor.value;
    pages = formPages.value;
    read = formRead.value;
    myLibrary.push(new Book(img, title, author, pages, read));
}

function displayBook() {
    item = myLibrary[myLibrary.length - 1];
    item.node = document.createElement("div");
    item.node.classList.add("book-container");
    item.infoNode = document.createElement("div");
    item.infoNode.classList.add("info-container");
    item.infoNode.innerHTML = item.info();
    item.node.appendChild(item.infoNode);
    container.appendChild(item.node);
    addDeleteBtn(item);
    addCompleteBtn(item);
    logLibraryInfo();
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
            item.read = "yes";
            completed(item);
        }
        else {
            item.read = "no";
            incomplete(item);
        }
        item.infoNode.innerHTML = item.info();
        logLibraryInfo();
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

//Library Log
function logLibraryInfo() {
    const libraryLog = document.querySelector(".library-log");

    totalBooks = myLibrary.length;
    booksRead = myLibrary.reduce((total, item) => {
        if (item.read == "yes") {
            return total + 1;
        }
        else {
            return total;
        }
    }, 0)

    libraryLog.innerHTML = `<p><b>Total Books:</b> ${totalBooks}</p>
    <p><b>Books Read:</b> ${booksRead}</p>`;
}