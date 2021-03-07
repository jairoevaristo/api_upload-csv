const { Router } = require('express');
const multer = require('multer');

const upload = require('./config/multer');

const router = Router();

router.get('/upload', (req, res) => {
  res.send('Hello Word');
});

router.post('/upload', multer(upload).single('file'), (req, res) => {
  try {
    console.log(req.file);
  
    return res.status(200);
    
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;