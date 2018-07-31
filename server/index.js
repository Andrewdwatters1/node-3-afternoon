const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const sessionCheck = require('./middlewares/checkForSession')
const swagController = require('./controllers/swag_controller');

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(sessionCheck);

app.get('/api/swag', swagController.read);



const sPort = process.env.SERVER_PORT;
app.listen(sPort, () => {
  console.log("Listening: ", sPort);
})