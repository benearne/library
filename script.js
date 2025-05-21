const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("hobbit", "tolkien", 333, true)
addBookToLibrary("mr x", "ben", 322, false)
addBookToLibrary("hello world", "jss", 22, false)
addBookToLibrary("book number 5", "noone", 90, false)


function displayBooks() {
    const chart = document.getElementById("chart")
    chart.innerHTML = ""; // Vorher leeren, damit doppelte Einträge vermieden werden

    myLibrary.forEach(book => {
        const newBook = document.createElement("div");
        newBook.className = "book";
        chart.appendChild(newBook);

        const title = document.createElement("div");
        title.textContent = book.title;
        newBook.appendChild(title);

        const author = document.createElement("div");
        author.textContent = book.author;
        newBook.appendChild(author);

        const pages = document.createElement("div");
        pages.textContent = book.pages;
        newBook.appendChild(pages);

        const read = document.createElement("div");
        if (book.read) {
            read.textContent = 'read';
        } else {
            read.textContent = 'not read';
        }
        newBook.appendChild(read);

        const id = document.createElement("div");
        id.textContent = book.id;
        newBook.appendChild(id);

        const remove = document.createElement("button");
        remove.textContent = "remove";
        remove.className = "removeButton";
        remove.dataset.id = book.id;
        remove.addEventListener("click", removeFunc);
        newBook.appendChild(remove);
    }) 
}

function removeFunc(event) {
    const bookId = event.target.dataset.id;
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}


displayBooks()
