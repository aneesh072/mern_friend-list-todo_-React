const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');

app.use(express.json());
app.use(cors());
//database connection
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.rafogxh.mongodb.net/merntutorial?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

app.post('/addfriend', async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const friend = new FriendModel({ name: name, age: age });
  await friend.save();
  res.send('Success');
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

app.listen(3005, () => {
  console.log('You are connected');
});
