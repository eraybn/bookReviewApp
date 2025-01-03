const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customerRoutes = require('./routes/auth_users');
const generalRoutes = require('./routes/general');

const app = express();

app.use(express.json());
app.use(
  "/customer",
  session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true })
);

// JWT Kimlik Doğrulama Middleware
app.use("/customer/auth/*", require('./middlewares/authMiddleware'));

const PORT = 5000;

// Routes
app.use("/customer", customerRoutes);
app.use("/", generalRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
