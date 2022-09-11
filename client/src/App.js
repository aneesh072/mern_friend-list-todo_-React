import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios.post('http://localhost:3005/addfriend', { name: name, age: age })
      .then((response) => {
        setListOfFriends([
          ...listOfFriends,
          { _id:response.data._id, name: name, age: age },
        ]);
      });
  };

  const updateFriend = (id) => {
    const newAge = prompt('Enter new age:');
    Axios.put('http://localhost:3005/update', { newAge: newAge, id: id }).then(
      () => {
        setListOfFriends(
          listOfFriends.map((val) => {
            return val._id == id
              ? { _id: id, name: val.name, age: newAge }
              : val;
          })
        );
      }
    );
  };

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3005/delete/${id}`).then(() => {
      setListOfFriends(
        listOfFriends.filter((val) => {
          return val._id != id;
        })
      );
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
      <div className="listOfFriends">
        {listOfFriends.map((val, index) => {
          return (
            <div className="friendContainer" key={index}>
              <div className="friend">
                <h3> Name: {val.name}</h3>
                <h3> Age: {val.age}</h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                Update
              </button>
              <button
                id="remove"
                onClick={() => {
                  deleteFriend(val._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
