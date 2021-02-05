//VARIABLES
const container = document.querySelector(".main-container");
const newBookBtn = document.querySelector(".new-book-btn");
const formCloseBtn = document.querySelector(".close-btn");
const formPopup = document.querySelector(".popup-form");
const formBackground = document.querySelector(".transparent");
const formAddBtn = document.querySelector(".form-btn");
const formEditBtn = document.querySelector(".form-edit-btn");
const libraryLog = document.querySelector(".library-log");

//Form variables
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const formImg = document.querySelector("#cover-img")

//Initialize the library array
let index = undefined;
let myLibrary = [];

//Add a book example to the library
/*myLibrary.push(new Book("https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg", "Harry Potter and the Philosopher's Stone", "J. K. Rowling", "309", "no"));
myLibrary.push(new Book("https://upload.wikimedia.org/wikipedia/en/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg", "A Song of Ice and Fire", "George R. R. Martin", "694", "yes"));*/

/*showAllCards();*/

//Initialize library log
libraryLog.innerHTML = `<p><b>Total Books:</b> 0</p>
<p><b>Books Read:</b> 0</p>`;

//===================================================

//Local Storage
if(!localStorage.getItem('library')) {
    localStorage.setItem('library', myLibrary);
} 
else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
    showAllCards();
}

function updateLocalStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

//===================================================




//===================================================

//Set a button to open the add book form
newBookBtn.addEventListener("click", function() {
    initializeForm();
    openForm();
    //On the form, hides the edit button and shows the add button
    formAddBtn.style.display = "block";
    formEditBtn.style.display = "none";
});

formCloseBtn.addEventListener("click", closeForm);

//Makes the form appear
function openForm() {
    formPopup.style.display = "block";
    formBackground.style.display = "block";
}

//Hides the form
function closeForm() {
    formPopup.style.display = "none";
    formBackground.style.display = "none";
}

//===================================================

//Book object constructor
function Book(img, title, author, pages, read) {
    this.img = img;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function bookInfo(item) {
    //Check if an image link was provided
    if(item.img == "") {
        auxImg = '<i id="no-img" class="fas fa-book"></i>'
    }
    else {
        auxImg = `<img src="${img}">`;
    }

    if (item.read == "yes") {
        return `${auxImg}
        <p><b>Title:</b> ${item.title}</p>
        <p><b>Author:</b> ${item.author}</p>
        <p><b>No of Pages:</b> ${item.pages} page(s)</p>
        <p>The book is completed</p>`;
    }
    else {
        return `${auxImg}
        <p><b>Title:</b> ${item.title}</p>
        <p><b>Author:</b> ${item.author}</p>
        <p><b>No of Pages:</b> ${item.pages} page(s)</p>
        <p>The book is not completed</p>`;
    }
}

//===================================================

//Adding a new book to the library
formAddBtn.addEventListener("click", function() {
    addBookToLibrary();
    initializeForm();
    closeForm();

    let allCards = document.querySelectorAll(".book-container");
    if (allCards.length !== 0) {
        deleteAllBooks();
    }

    displayAllBooks();
    addAllBtn();

    //Add buttons event listeners
    addDeleteEvent();
    addCompletedEvent();
    addEditEvent();

    logLibraryInfo()
    updateLocalStorage()
});

//Adds a new book object to the library array
function addBookToLibrary() {    
    myLibrary.push(new Book(formImg.value, formTitle.value, formAuthor.value, formPages.value, formRead.value));
}

//Resets the form to its initial values
function initializeForm() {
    formImg.value = "";
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    formRead.value = "yes";
}

//===================================================
//Display all cards on the screen
function displayAllBooks() {
    myLibrary.forEach(item => {
        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        let infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");
        //Adding the info text
        infoContainer.innerHTML = bookInfo(item);
        //Appending the elements to their parents
        bookContainer.appendChild(infoContainer);
        container.appendChild(bookContainer);
    })
}

//Delete all cards from the screen
function deleteAllBooks() {
    let allCards = document.querySelectorAll(".book-container");

    allCards.forEach(card => {
        container.removeChild(card);
    })
}

//===================================================

//Add all buttons to all cards
function addAllBtn() {
    let allCards = document.querySelectorAll(".book-container");
    
    allCards.forEach(card => {
        addDeleteBtn(card);
        addEditBtn(card);
        addCompleteBtn(card);
    })
}

//Add a delete button to all cards
function addDeleteBtn(card) {
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    card.appendChild(deleteBtn);
}

//Add an edit button to all cards
function addEditBtn(card) {
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    card.appendChild(editBtn);
}

//Add a completed button to all cards
function addCompleteBtn(card) {
    let completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");

    let allText = card.querySelectorAll("p");
    let lastText = allText[allText.length - 1];

    //Changes the button style depending if the book was read or not
    if (lastText.innerText == "The book is completed") {
        completeBtn.style.backgroundColor = "lightgray";
        completeBtn.innerHTML = '<i class="fas fa-times"></i>'
    }
    else {
        completeBtn.style.backgroundColor = "#5CA4A9";
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    }
    //Appendindg the element
    card.appendChild(completeBtn);
}

//===================================================
//Add event listeners to all card buttons
//Add delete event listener
function addDeleteEvent() {
    let allDeleteBtn = Array.from(document.querySelectorAll(".delete-btn"));

    allDeleteBtn.forEach(button => {
        button.addEventListener("click", function() {
            let allCards = document.querySelectorAll(".book-container");
            let index = allDeleteBtn.indexOf(button);
            container.removeChild(allCards[index]);
            myLibrary.splice(index, 1);
            showAllCards();
        })
    })
}

//Add edit event listener
function addEditEvent() {
    let allEditBtn = Array.from(document.querySelectorAll(".edit-btn"));
    
    allEditBtn.forEach(button => {
        button.addEventListener("click", function() {
            openForm();
            //On the form, shows the edit button and hides the add button
            formAddBtn.style.display = "none";
            formEditBtn.style.display = "block";

            index = allEditBtn.indexOf(button)
            console.log(index);
            showValues(index);
        })
    })
}

function showValues(index) {
    formImg.value = myLibrary[index].img;
    formTitle.value = myLibrary[index].title;
    formAuthor.value = myLibrary[index].author;
    formPages.value = myLibrary[index].pages;
    formRead.value = myLibrary[index].read;
}

//Add event listener to the form edit button
formEditBtn.addEventListener("click", function() {
    myLibrary[index].img = formImg.value;
    myLibrary[index].title = formTitle.value;
    myLibrary[index].author = formAuthor.value;
    myLibrary[index].pages = formPages.value;
    myLibrary[index].read = formRead.value;

    closeForm();
    initializeForm();

    showAllCards();
})

//Add completed event listener
function addCompletedEvent() {
    let allCompleteBtn = Array.from(document.querySelectorAll(".complete-btn"));

    allCompleteBtn.forEach(button => {
        button.addEventListener("click", function() {
            let index = allCompleteBtn.indexOf(button);

            if (myLibrary[index].read == "no") {
                myLibrary[index].read = "yes";
                button.style.backgroundColor = "lightgray";
                button.innerHTML = '<i class="fas fa-times"></i>'
            }
            else {
                myLibrary[index].read = "no";
                button.style.backgroundColor = "#5CA4A9";
                button.innerHTML = '<i class="fas fa-check"></i>';
            }

            showAllCards();
        })
    })
}

//===================================================

//Show all cards with buttons
function showAllCards() {
    deleteAllBooks();
    displayAllBooks();
    addAllBtn();
    
    addDeleteEvent();
    addCompletedEvent();
    addEditEvent();

    logLibraryInfo();
    updateLocalStorage();
}

//===================================================

//Show library log info
function logLibraryInfo() {
    
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

//===================================================