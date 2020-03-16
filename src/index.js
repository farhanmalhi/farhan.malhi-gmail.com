require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');
const app = express();

app.use(bodyParser.json());
app.use(authRoute);
app.use(trackRoutes);

const mongoUri =
  'mongodb+srv://admin:q2w3e4@cluster0-sx2us.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {useNewUrlParser: true, useCreateIndex: true});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', err => {
  console.log('Error connecting mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});
app.listen(3000, () => {
  console.log('Listening from 3000');
});
