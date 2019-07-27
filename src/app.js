const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const session = require('express-session');
const handlebars = require('express-handlebars');
const handlebarshelpers = require('handlebars-helpers')();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const auth = require('./middleware/auth');
require('dotenv').config();

// Enable CORS, security, compression and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));
app.use(cookieParser());

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  layoutsDir: `${__dirname}/views/layouts/`,
  helpers: handlebarshelpers
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use('/static', express.static(`${__dirname}/public`));

// import routes
app.use(require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

auth(passport);
app.use(passport.initialize());

app.use(cookieSession({
  name: 'session',
  keys: ['SECRECT KEY'],
  maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());

// Set up default mongoose connection
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(80, (err) => {
  if (err) return console.error(err);
  console.log(chalk.green('Website running on localhost'));
});
