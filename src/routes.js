const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const result = [];

const upload = require('./config/multer');
const sendEmail = require('./config/nodemailer');

const router = Router();

router.get('/upload', (req, res) => {
  res.send('Hello Word');
});

router.post('/upload', multer(upload).single('file'), async (req, res) => {
  try {
    const { originalname, filename } = req.file;


    const csvEmails = fs.readFileSync(path.resolve(__dirname, '..', 'upload', `${filename}`), 'utf-8');

    const formatEmails = csvEmails.split(/\r?\n/)
    
    for (const value of formatEmails) {
      if (/\S+@\S+\.\w+$/g.test(value)) {
        result.push(value)
      } 
    }

    await sendEmail(result).then(() => console.log('Done...'));

    return res.status(200).json({ originalname });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;