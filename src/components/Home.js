import { BASE_URL } from "../api";
import React from 'react';



const Home = ({}) => {
    return <div id="title">
    <h1>
       Fitness Tracker
     </h1>
   <ul className="header">
   <li><a href="/">Home</a></li>
   <NavLink to="/login">Login</NavLink>
   <NavLink to="/register">Register</NavLink>
   <NavLink to="/routines">Routines</NavLink>
 </ul>
 </div>
}

export default Home;