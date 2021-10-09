import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';



const Home = ({token, username}) => {
 
 

  useEffect(() => {
    fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(console.error);
  })
  

  return (<div className= "home">
    <h1>Hello {username}</h1>
  </div>)
}
export default Home;