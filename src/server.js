const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use('/api/v1', router);

app.listen(3001, () => console.log('Server is running'));

