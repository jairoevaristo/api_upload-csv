const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'polly.reilly@ethereal.email',
    pass: 'cDcYbBjFzhE7NHbyfx'
  }
});

module.exports = async ({ email, file }) => {
  await transporter.sendMail({
    from: "<jairo@dev.com>",
    to: [email],
    subject: "Teste",
    html: "<b>Ola bem-vindo</b>"
  })

  fs.unlinkSync(path.resolve(__dirname, '..', '..', 'upload', `${file}`));
}