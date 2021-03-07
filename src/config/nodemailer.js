const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'polly.reilly@ethereal.email',
    pass: 'cDcYbBjFzhE7NHbyfx'
  }
});

module.exports = async () => {
  await transporter.sendMail({
    to: "<jairo@developer.com>",
    from: "teste@teste.com",
    subject: "Teste",
    html: "<b>Ola bem-vindo</b>"
  })
}