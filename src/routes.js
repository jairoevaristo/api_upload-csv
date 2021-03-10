const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const result = [];

const configUpload = require('./config/multer');
const sendEmail = require('./config/nodemailer');

const router = Router();

router.get('/upload', (req, res) => {
  return res.status(200).json({ message: 'Hello Word' });
});

router.post('/upload', multer(configUpload).single('file'), async (req, res) => {
  try {
    const { filename } = req.file;

    const csvEmails = fs.readFileSync(path.resolve(__dirname, '..', 'upload', `${filename}`), 'utf-8');

    const formatEmails = csvEmails.split(/\r?\n/)
    
    for (const value of formatEmails) {
      if (/\S+@\S+\.\w+$/g.test(value)) {
        result.push(value)
      } 
    }

    await sendEmail({ email: result, file: filename })
    .then(() => console.log('Done...'));

    return res.status(200).json({ file: req.file });

  } catch (err) {
    return res.status(400).json({ message: "Error >> " + err });
  }
});

module.exports = router;