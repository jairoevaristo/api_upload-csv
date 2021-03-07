const express = require('express');
const logger = require('morgan');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use('/api/v1', router);

app.listen(3000, () => console.log('Server is running'));

