const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Authorization başlığından token'ı al
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, "fingerprint_customer");
    req.user = decoded;  // Kullanıcıyı request'e ekle
    next();  // İsteği bir sonraki middleware'e yönlendir
  } catch (err) {
    return res.status(400).send("Invalid token.");
  }
}

module.exports = authenticateToken;
