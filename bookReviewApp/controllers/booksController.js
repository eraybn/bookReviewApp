const books = require('../data/booksdb');

// Tüm kitapları al
exports.getAllBooks = (req, res) => {
  res.status(200).json(books);
};

// ISBN'ye göre kitap al
exports.getBookByISBN = (req, res) => {
  const book = books[req.params.isbn];
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("Book not found");
  }
};

// Yazara göre kitap al
exports.getBooksByAuthor = (req, res) => {
  const authorBooks = Object.values(books).filter(book => book.author === req.params.author);
  if (authorBooks.length > 0) {
    res.status(200).json(authorBooks);
  } else {
    res.status(404).send("Books not found for this author");
  }
};

// Başlığa göre kitap al
exports.getBooksByTitle = (req, res) => {
  const titleBooks = Object.values(books).filter(book => book.title === req.params.title);
  if (titleBooks.length > 0) {
    res.status(200).json(titleBooks);
  } else {
    res.status(404).send("Books not found with this title");
  }
};

// İncelemeleri al
exports.getBookReviews = (req, res) => {
  const book = books[req.params.isbn];
  if (book && book.reviews) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).send("Reviews not found for this book");
  }
};
