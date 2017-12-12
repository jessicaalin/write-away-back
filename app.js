const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');

require("dotenv").config();

require("./config/mongoose-setup");

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost/4200']
  })
);


// ROUTERS

const docApi = require('./routes/doc-api-router');
app.use('/api', docApi);
const userApi = require('./routes/user-api-router');
app.use('/api', userApi);


module.exports = app;
