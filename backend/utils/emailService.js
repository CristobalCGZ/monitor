// utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.tucorreo.com', // Reemplaza con el servidor SMTP de tu empresa
  port: 587, // Puede ser 465 para SSL o 587 para TLS
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USERNAME, // Tu correo corporativo
    pass: process.env.EMAIL_PASSWORD,  // La contraseña de tu correo
  },
  tls: {
    rejectUnauthorized: false // Configura esto si tu servidor SMTP tiene un certificado autofirmado
  }
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: 'no-reply@leasyta.cl', // Reemplaza con un correo que quieras usar como remitente
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
