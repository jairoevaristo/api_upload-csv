const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = {
  desc: path.resolve(__dirname, '..', '..', 'upload'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'upload'))
    },
    filename: (req, file, cb) => {
      let fileHash = crypto.randomBytes(8).toString('hex');
      cb(null, `${fileHash}-${file.originalname}`);
    }
  })
}