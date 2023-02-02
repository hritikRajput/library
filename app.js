let myLibrary = [];

function Book(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read==="true"?'read already':'not read yet'}`;
    }
}

function addBookToLibrary(){
    const name = prompt("Enter the book title: ");
    const author = prompt("Enter the author name: ");
    const pages = parseInt(prompt("Enter the total pages of book: "));
    const read = prompt("What is read status of book true/false: ");

    const book = new Book(name, author, pages, read)
    myLibrary.unshift(book);
}

addBookToLibrary()

