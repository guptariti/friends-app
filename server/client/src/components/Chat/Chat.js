import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ready, setReadyStatus] = useState(false);
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });


}, []);

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].host) {
        counter++;
      }
    }

    console.log(questions.length);
    if (counter === users.length && questions.length === counter) {

      setReadyStatus(true);
    } else {
      setReadyStatus(false);
    }

  }, [questions.length, users])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }

    console.log(users);
  }

  const filterUsers = () => {
    console.log(socket.id);
    socket.emit('submitted', socket.id);

    socket.on('roomData', ({users}) => {
      setUsers(users);
      console.log(users);
    });

    socket.emit('questions', {question, room});

    socket.on('getQuestions', (quests) => {
      let arr = quests.map(({question}) => question);
      setQuestions(arr);
    });
  }

  return (
    ready? (
      <div className="qstOuter">
        <div className="qstnBox">
          <h1>Answer Wisely, {name.toUpperCase()}</h1>
          {questions.map((question, i) => <div><p className="qstn" key={i}>{question}</p><input type="text" placeholder="Your response..."></input></div>)}
          <button className="sbmtAns">Submit</button>
        </div>
      </div>

    )
    :
    (
    <div className="outerContainer">
      <div>
        <button onClick={filterUsers}>Click Me!</button>
        <input type="text" onChange={(event) => setQuestion(event.target.value)}></input>
      </div>
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
    )
  );
}

export default Chat;
