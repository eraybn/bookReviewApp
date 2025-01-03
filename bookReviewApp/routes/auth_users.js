const express = require('express');
const authController = require('../controllers/authController');

const regd_users = express.Router();

// Kullanıcı Kaydı
regd_users.post('/register', authController.register);

// Kullanıcı Girişi (Login)
regd_users.post('/login', authController.login);

// İnceleme Ekle/Düzenle
regd_users.post('/auth/review/:isbn', authController.addReview);

// İnceleme Sil
regd_users.delete('/auth/review/:isbn', authController.deleteReview);

module.exports = regd_users;
