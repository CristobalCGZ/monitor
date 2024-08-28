// backend/controllers/authController.js
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('../server'); // Importa la conexión a la base de datos
const sendEmail = require('../utils/emailService');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('No user found with this email');
    }

    const user = results[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    const expireTime = Date.now() + 3600000; // 1 hour
    const updateSql = 'UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE id = ?';
    db.query(updateSql, [hashedToken, expireTime, user.id], (err) => {
      if (err) return res.status(500).send('Error in setting reset token');

      const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
      const message = `You requested a password reset. Please use the following link to reset your password: ${resetUrl}`;

      try {
        sendEmail({
          email: user.email,
          subject: 'Password Reset Request',
          message,
        });
        res.status(200).send('Email sent for password reset');
      } catch (error) {
        res.status(500).send('Error in sending email');
      }
    });
  });
};

exports.resetPassword = async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const sql = 'SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > ?';
  db.query(sql, [hashedToken, Date.now()], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send('Token is invalid or has expired');
    }

    const user = results[0];
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const updateSql = 'UPDATE users SET password = ?, resetPasswordToken = ?, resetPasswordExpires = ? WHERE id = ?';
    db.query(updateSql, [hashedPassword, null, null, user.id], (err) => {
      if (err) return res.status(500).send('Error in resetting password');

      res.status(200).send('Password has been reset');
    });
  });
};
