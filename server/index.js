const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const sessionCheck = require('./middlewares/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(sessionCheck);

app.get('/api/swag', swagController.read);

app.get('/api/user', authController.getUser);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);

app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.delete);




const sPort = process.env.SERVER_PORT;
app.listen(sPort, () => {
  console.log("Listening: ", sPort);
})