import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios.post('http://localhost:3005/addfriend', { name: name, age: age })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Axios.get('http://localhost:3005/read')
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend Name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) => {
            setAge(e.target.value);
          }}
        ></input>
        <button onClick={addFriend}>Add Friend</button>
      </div>
      {listOfFriends.map((listOfFriend, index) => {
        return (
          <div key={index}>
            {listOfFriend.name} {listOfFriend.age}{' '}
          </div>
        );
      })}
    </div>
  );
};

export default App;
