let myLibrary = [];

const cards = document.querySelector(".cards");
const newBookBtn = document.querySelector(".new-book-btn");
const submitBtn = document.querySelector(".submit-btn");
const info = document.querySelector(".info");
const infoForm = document.querySelector(".info-form");
const overlay = document.querySelector("#overlay");



newBookBtn.addEventListener('click', showForm);
submitBtn.addEventListener('click', submitForm);

overlay.addEventListener('click', function(e) {
        infoForm.reset()
        hideForm()
});

function Book(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read==="true"?'read already':'not read yet'}`;
    }
}


function addBookToLibrary(name, author, pages, read){
    const book = new Book(name, author, pages, read)
    myLibrary.unshift(book);
    displayBooks(book);
}



function displayBooks(book){
        const bookCard = createBookCard(book);
        cards.prepend(bookCard);
};

function createBookCard(book){
    const card = document.createElement('div');
    card.classList.add('card');
    const name = document.createElement('p');
    name.textContent = book.name;
    const author = document.createElement('p');
    author.textContent = book.author;
    const pages = document.createElement('p');
    pages.textContent = book.pages;
    const read = document.createElement('p');
    read.textContent= book.read;
    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    return card;
};

function showForm(){
    info.classList.remove('hidden');
    overlay.classList.add("active");
}
function hideForm(){
    info.classList.add('hidden');
    overlay.classList.remove("active");
}

function submitForm(event){
    const name = document.querySelector("#name").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    addBookToLibrary(name, author, pages, read);

    infoForm.reset();
    hideForm();
    event.preventDefault();
}



