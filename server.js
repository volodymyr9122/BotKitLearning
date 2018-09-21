// modules
const express     = require('express')
const app         = express()
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const winston     = require('./config/winston');
const dotenv      = require('dotenv')

//load environment variables,
//either from .env files (development),
//heroku environment in production, etc
dotenv.load();

// public folder
app.use(express.static(__dirname + '/public'))

//parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded

// view engine ejs
app.set('view engine', 'ejs');

//handling particular set of related "route" (URL path)
const route = require('./app/routes/routes');


//debugging
app.use(morgan('combined', { stream: winston.stream }));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//listen to port
app.listen(process.env.PORT || 8000);
console.log(`Magic happens on port  ${8000}`);

module.exports = app;
