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

function displayBooks() {
    if (myLibrary.length === 0) {
        document.getElementById("library").style.display = "none";
    } else {
        document.getElementById("library").style.display = "block";
    }
    
    const books = document.getElementById("books");
    books.innerHTML = "";

    myLibrary.forEach(book => {
        const newBook = document.createElement("div");
        newBook.className = "book";
        books.appendChild(newBook);

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
        read.className = "read";
        const readCheck = document.createElement("div");
        readCheck.id = 'status ' + book.id;
        if (book.read) {
            readCheck.textContent = 'read';
            readCheck.classList.remove("red");
            readCheck.classList.add("green");
            read.appendChild(readCheck);
        } else {
            readCheck.textContent = 'not read yet';
            readCheck.className = "red";
            const readBttn = document.createElement("button");
            readBttn.textContent = 'I read it now!';
            readBttn.className = "readBttn"
            readBttn.id = 'bttn ' + book.id;
            readBttn.addEventListener("click", readBook);
            read.appendChild(readCheck);
            read.appendChild(readBttn);
        }
        newBook.appendChild(read);

        const remove = document.createElement("button");
        remove.textContent = "remove";
        remove.id = book.id;
        remove.className = "removeButton";
        remove.addEventListener("click", removeFunc);
        newBook.appendChild(remove);
    }) 
    console.table(myLibrary)
}

function removeFunc(event) {
    const bookId = event.target.id;
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function saveBook() {

    const form = document.getElementById("newbook");
    
    const title = document.getElementById("title").value;
    if (title === "") {
        alert("please enter title");
        return;
    }
    const author = document.getElementById("author").value;
    if (author === "") {
        alert("please enter author");
        return;
    }
    const pages = parseInt(document.getElementById("pages").value);
    if (isNaN(pages) || pages <= 0) {
        alert("please enter pages");
        return;
    }
    const read = document.getElementById("read").checked;

    myLibrary.push(new Book(title, author, pages, read));

    displayBooks();
    form.reset();
}

function readBook(event) {
    const bttnId = event.target.id;
    const bttn = document.getElementById(bttnId);

    const statusId = bttnId.replace("bttn ", "status ");

    const bookId = bttnId.replace("bttn ", "");
    const index = myLibrary.findIndex(book => book.id === bookId);
    myLibrary[index].read = true;
    displayBooks();
}

displayBooks()
