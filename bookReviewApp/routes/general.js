const express = require('express');
const publicUsersController = require('../controllers/booksController');

const public_users = express.Router();

// Tüm kitapları al
public_users.get('/', publicUsersController.getAllBooks);

// ISBN'ye göre kitap al
public_users.get('/isbn/:isbn', publicUsersController.getBookByISBN);

// Yazara göre kitap al
public_users.get('/author/:author', publicUsersController.getBooksByAuthor);

// Başlığa göre kitap al
public_users.get('/title/:title', publicUsersController.getBooksByTitle);

// İncelemeleri al
public_users.get('/review/:isbn', publicUsersController.getBookReviews);

module.exports = public_users;
