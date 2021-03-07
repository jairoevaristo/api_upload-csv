const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = require('./config/multer');
const sendEmail = require('./config/nodemailer');

const router = Router();

router.get('/upload', (req, res) => {
  res.send('Hello Word');
});

router.post('/upload', multer(upload).single('file'), async (req, res) => {
  try {
    const { originalname } = req.file;
    console.log(req.file)

    // const email = fs.readFileSync(path.resolve(__dirname, '..', '..', 'upload', ''))
    // await sendEmail().then(() => console.log('Done...'));

    return res.status(200).json({ originalname });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;