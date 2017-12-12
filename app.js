const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');

require("dotenv").config();

require("./config/mongoose-setup");
require("./config/passport-setup");

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
app.use(passport.initialize());
app.use(passport.session());


// ROUTERS

const docApi = require('./routes/doc-api-router');
app.use('/api', docApi);
const userApi = require('./routes/user-api-router');
app.use('/api', userApi);


module.exports = app;
