class Book {
  constructor(title, author, ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.isIssued = false;
  }

  issueBook() {
    if (this.isIssued) {
      console.log(`"${this.title}" is already issued.`);
    } else {
      this.isIssued = true;
      console.log(`✅ "${this.title}" issued successfully.`);
    }
  }

  returnBook() {
    if (!this.isIssued) {
      console.log(`"${this.title}" was not issued.`);
    } else {
      this.isIssued = false;
      console.log(`✅ "${this.title}" returned successfully.`);
    }
  }

  displayInfo() {
    return `"${this.title}" by ${this.author} | ISBN: ${this.ISBN} | ${this.isIssued ? "❌ Issued" : "✅ Available"}`;
  }
}

const library = [
  new Book("The Alchemist",               "Paulo Coelho",         "ISBN001"),
  new Book("Clean Code",                  "Robert C. Martin",     "ISBN002"),
  new Book("JavaScript: The Good Parts",  "Douglas Crockford",    "ISBN003"),
  new Book("You Don't Know JS",           "Kyle Simpson",         "ISBN004"),
  new Book("Atomic Habits",               "James Clear",          "ISBN005"),
];

function getAvailableBooks() {
  return library.filter(b => !b.isIssued);
}

function issueByISBN(isbn) {
  const book = library.find(b => b.ISBN === isbn);
  if (book) {
    book.issueBook();
  } else {
    console.log(`No book found with ISBN: ${isbn}`);
  }
}

function returnByISBN(isbn) {
  const book = library.find(b => b.ISBN === isbn);
  if (book) {
    book.returnBook();
  } else {
    console.log(`No book found with ISBN: ${isbn}`);
  }
}

console.log("=== All Books ===");
library.forEach(b => console.log(b.displayInfo()));

console.log("\n=== Issuing ISBN002 and ISBN004 ===");
issueByISBN("ISBN002");
issueByISBN("ISBN004");
issueByISBN("ISBN002");

console.log("\n=== Available Books ===");
getAvailableBooks().forEach(b => console.log(b.displayInfo()));

console.log("\n=== Returning ISBN004 ===");
returnByISBN("ISBN004");

console.log("\n=== Available Books After Return ===");
getAvailableBooks().forEach(b => console.log(b.displayInfo()));
