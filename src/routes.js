const { Router } = require('express');
const multer = require('multer');

const upload = require('./config/multer');

const router = Router();

router.get('/upload', (req, res) => {
  res.send('Hello Word');
});

router.post('/upload', multer(upload).single('file'), (req, res) => {
  try {
    const { originalname } = req.file;
    

    return res.status(200).json({ originalname });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;