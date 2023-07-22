const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64bc4c5ed383186ee75606a7',
  };

  next();
});

app.use('/users', routerUser);
app.use('/cards', routerCard);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такого пути нет' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
