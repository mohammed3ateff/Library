const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add toggleReadStatus method to Book prototype
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();  // Update display after adding a new book
}

// Function to remove a book from the library array
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();  // Update display after removing a book
}

// Function to display all books in the library
function displayBooks() {
    const libraryContainer = document.getElementById('libraryContainer');
    libraryContainer.innerHTML = '';  // Clear previous content

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;

        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;

        const bookRead = document.createElement('p');
        bookRead.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Read Status';
        toggleReadButton.classList.add("toggle-read-button");
        toggleReadButton.addEventListener('click', () => {
            const index = bookCard.getAttribute('data-index');
            myLibrary[index].toggleReadStatus();
            displayBooks();  // Update display after toggling read status
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add("remove-button");

        removeButton.addEventListener('click', () => {
            const index = bookCard.getAttribute('data-index');
            removeBookFromLibrary(index);
        });

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(removeButton);

        libraryContainer.appendChild(bookCard);
    });
}

// Event listener for form submission
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    addBookToLibrary(title, author, pages, read);

    // Clear form after submission
    document.getElementById('bookForm').reset();

    // Close the modal
    document.getElementById('modal').style.display = 'none';
});

// Event listener for opening the modal
document.getElementById('newBookButton').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
});

// Event listener for closing the modal
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Close the modal if the user clicks outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Manually add a few books to the library for testing
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
