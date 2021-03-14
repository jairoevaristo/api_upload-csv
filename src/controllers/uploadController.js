const fs = require('fs');
const path = require('path');
const result = [];

const sendEmail = require('../config/nodemailer');

class UploadController {
 async execute(req, res) {
    try {
      const { filename } = req.file;
  
      const csvEmails = fs.readFileSync(
        path.resolve(__dirname, '..', '..', 'upload', `${filename}`), 'utf-8'
      );
  
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
      return res.status(400).json({ message: "Error >> " + err.message });
    }
  }
}

module.exports = new UploadController();