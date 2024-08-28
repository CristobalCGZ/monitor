// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../server'); // Importa la conexión a la base de datos
const { forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

// Ruta de registro
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send('Error in registration');
    }
    res.status(201).send('User registered');
  });
});

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 horas
    });

    res.status(200).send({ auth: true, token });
  });
});

// Ruta de forgot-password
router.post('/forgot-password', forgotPassword);

// Ruta de reset-password
router.post('/reset-password/:token', resetPassword);

module.exports = router;
