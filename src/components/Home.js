import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';



const Home = (props) => {
  const { BASE_URL, token, username } = props;
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/Home`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => res.json())
    .then((result) => {
      const reponse =result.data;
      setRoutines(reponse.posts)
    })
    .catch(err => console.error(err))
  }, []);

  return (<div className= "home">
    <h1>Hello {username}</h1>
  </div>)

export default Home;