import { BASE_URL } from "../api";
import React, { useEffect } from 'react';



const Home = ({token, username, loginSuccess}) => {
 
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
    <h1> {loginSuccess ? `Hello ${username}, welcome back!`: "Please Login to see your Homepage"} </h1>
    
  </div>)
}
export default Home;