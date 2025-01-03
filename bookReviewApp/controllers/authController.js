const jwt = require('jsonwebtoken');
const users = require('../data/usersdb');  // Kullanıcıları tutan dosya
const books = require('../data/booksdb');  // Kitapları tutan dosya

// Kullanıcı Kaydı
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Kullanıcı adı ve şifre kontrolü
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  // Kullanıcı zaten var mı?
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }

  // Yeni kullanıcıyı ekleyelim
  users.push({ username, password });
  res.status(201).send("User registered successfully");
};

// Kullanıcı Girişi (Login)
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Kullanıcıyı bul ve şifreyi kontrol et
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // JWT token oluştur
  const token = jwt.sign({ username: user.username }, "fingerprint_customer", { expiresIn: "1h" });

  // Token'ı yanıt olarak gönder
  res.status(200).json({
    message: "Logged in successfully",
    token: token
  });
};

// İnceleme Ekle/Düzenle
exports.addReview = (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;

  // Kitap var mı?
  const book = books[isbn];
  if (!book) {
    return res.status(404).send("Book not found");
  }

  // Yorum ekle
  book.reviews.push({ user: req.user.username, review });
  res.status(200).send("Review added successfully");
};

// İnceleme Sil
exports.deleteReview = (req, res) => {
  const isbn = req.params.isbn;

  // Kitap var mı?
  const book = books[isbn];
  if (!book) {
    return res.status(404).send("Book not found");
  }

  // Yorumları filtrele ve sil
  book.reviews = book.reviews.filter(r => r.user !== req.user.username);
  res.status(200).send("Review deleted successfully");
};
