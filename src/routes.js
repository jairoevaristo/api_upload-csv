const { Router } = require('express');
const multer = require('multer');

const configUpload = require('./config/multer');
const uploadController = require('./controllers/uploadController');

const router = Router();

router.get('/upload', (req, res) => {
  return res.status(200).json({ message: 'Hello Word' });
});

router.post('/upload', multer(configUpload).single('file'), uploadController.execute);

module.exports = router;