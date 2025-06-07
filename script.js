class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
}

class Library {
    constructor() {
        this.books = [];
    }
    
    addBook(title, author, pages, read) {
        this.books.push(new Book(title, author, pages, read));
        this.displayBooks();
    }

    updateBook(id, props) {
        const book = this.books.find(book => book.id === id);
        if (book) Object.assign(book, props);
        this.displayBooks();
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.displayBooks();
    }

    displayBooks() {
        const library = document.getElementById("library");
        const container = document.getElementById("books");
        container.innerHTML = "";

        if (this.books.length === 0) {
            library.style.display = "none";
            return;
        }  

        library.style.display = "block";
        
        this.books.forEach(book => {
            const bookEl = document.createElement("div");
            bookEl.className = "book";
            bookEl.innerHTML = `
                <div>${book.title}</div>
                <div>${book.author}</div>
                <div>${book.pages}</div>
                <div class="read">
                    <div id="status ${book.id}" class="${book.read ? 'green' : 'red'}">
                        ${book.read ? 'read' : 'not read yet'}
                    </div>
                    ${book.read ? '' : `<button id="bttn ${book.id}" class="readBttn">I read it now!</button>`}
                </div>
                <button id="${book.id}" class="removeButton">remove</button>
            `;

            container.appendChild(bookEl);


            if (!book.read) {
                bookEl.querySelector(`#bttn\\ ${book.id}`).addEventListener("click", () => {
                    this.updateBook(book.id, { read: true });
                });
            }

            bookEl.querySelector(`#${book.id}`).addEventListener("click", () => {
                this.removeBook(book.id);
            });
        });
    }
}

const myLibrary = new Library();

function saveBookFromForm() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    if (title === "" || author === "" || isNaN(pages) || pages <= 0) {
        alert("please fill in all fields correctly");
        return;
    }
    myLibrary.addBook(title, author, pages, read);
    document.getElementById("newbook").reset();
}

const title = document.getElementById("title");

title.addEventListener("input", () => {
	// Wenn das Feld leer ist
	if (title.validity.valueMissing) {
		title.setCustomValidity("Please enter a title.");
	} 
	// Wenn es zu kurz ist
	else if (title.validity.tooShort) {
		title.setCustomValidity("The title must be at least 3 characters long.");
	} 
	// Wenn alles okay ist
	else {
		title.setCustomValidity("");
	}

	title.reportValidity(); // zeigt die custom message an
});

const pages = document.getElementById("pages");
pages.addEventListener("input", () => {
	if (isNaN(pages.value) || pages.validity.badInput || parseInt(pages.value) <= 0) {
		pages.setCustomValidity("Pages must be a positive number!");
	} else {
		pages.setCustomValidity("");
	}
});