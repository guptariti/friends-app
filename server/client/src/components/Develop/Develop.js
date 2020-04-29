import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';



let socket;

const Develop = () => {
    const ENDPOINT = 'http://localhost:5000';
    let alerts = [];

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', { name: "ritik", room: "testingroom" }, (error) => {
            if(error) {
              alert(error);
            }
          });
        

    });

    useEffect(() => {
        //socket = io(ENDPOINT);
        socket.on('alert', (response) => {
            console.log(response);
            alerts.push(response);
            console.log(alerts)
        });
    });
    return (
        <div>
            <p>Enter Your Question Below</p>
            <input type="text"></input>

        </div>
    )
}

export default Develop;