const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');

//database connection
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.rafogxh.mongodb.net/merntutorial?retryWrites=true&w=majority'
);

app.get('/insert', async (req, res) => {
  const friend = new FriendModel({ name: 'wqerfwer', age: 24 });
  await friend.save();
  res.send('Inserted data');
});

app.get('/read', async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3002, () => {
  console.log('You are connected');
});
