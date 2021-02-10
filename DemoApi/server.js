const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const dotenv = require('dotenv');
dotenv.config('./env');
const app = express();

const PORT = process.env.PORT || 3030;

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));

app.use(bodyParser.json());

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'demo',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true ,
      expires: 600000
    }
}));

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials:true,
  methods:['GET','POST','PUT','OPTIONS'],
  allowedHeaders:'Content-Type,Accept,Authorization',
  optionsSuccessStatus: 200
}));

const routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route