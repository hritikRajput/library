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
cards.addEventListener('click', (event)=>{
    if(event.target.classList.contains("remove-book-btn")){
        const targetIndex = parseInt(event.target.parentNode.getAttribute('data-index'));
        const targetNode = event.target.parentNode;
        removeBook(targetIndex, targetNode);
    }
    if(event.target.classList.contains("read-status-btn")){
        toggleReadStatus(event.target);
    }
})


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
    const currIndex = myLibrary.length;
    myLibrary.push(book);
    displayBooks(book, currIndex);
}



function displayBooks(book, currIndex){
        const bookCard = createBookCard(book);
        bookCard.setAttribute("data-index", `${currIndex}`);
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

    const read = document.createElement('button');
    read.type="button";
    read.classList.add("read-status-btn");
    if(!(book.read==="true")){
        read.classList.add('read');
    }
   

    const remove = document.createElement('button');
    remove.type="button";
    remove.classList.add("remove-book-btn");
    remove.innerHTML="Remove"

    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(remove);

    toggleReadStatus(read);
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

function removeBook(targetIndex, targetNode){
    cards.removeChild(targetNode);
    myLibrary.splice(targetIndex, 1);

    if(myLibrary.length>-1){
    const books = cards.children;
    Array.from(books).forEach((card, index)=>{
        card.setAttribute('data-index', `${myLibrary.length-index-1}`);
    });
}
}

function toggleReadStatus(target){
    const readText = "Already Read";
    const notReadText = "Not Read Yet";
    target.classList.toggle('read');
    if(target.classList.contains('read')){
        target.innerHTML=readText;
        target.parentNode.read="true";
    }
    else{
        target.innerHTML=notReadText;
        target.parentNode.read="false";
    }
}



