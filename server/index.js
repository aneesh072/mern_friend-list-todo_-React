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

app.put('/update', async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;

  try {
    await FriendModel.findById(id, (err, friendToUpdate) => {
      friendToUpdate.age = Number(newAge);
      friendToUpdate.save();
    });
  } catch (error) {
    console.log(error);
  }
  res.send('Updated');
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await FriendModel.findByIdAndRemove(id).exec();
  res.send('Item deleted');
});

app.listen(3005, () => {
  console.log('You are connected');
});
