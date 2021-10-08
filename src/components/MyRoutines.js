import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import EditRoutines from "./EditRoutine";
import DeleteRoutines from "./DeleteRoutines";

const MyRoutines = ({token, loginSuccess, username}) => {

    const [myroutines, setMyRoutines] = useState([])
    
    
            fetch(`${BASE_URL}/users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  }
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setMyRoutines(result)
            })
            .catch(console.error);
                

        

    return (
        <> 
            <h1 className="YourRoutines"> Your Routines</h1> 
            <h2 className="ToView"> {loginSuccess ?  <Link to="/addroutines"> Add Routines </Link> : "Please Log In to Edit Your Routines"} </h2>
            
            
           {myroutines && myroutines.map(routine => {
                return (
                    <div> 
                    Routine Id: {routine.id}
                    <br></br>
                    Creator Name: {routine.creatorName}
                    <br></br>
                    Creator Id: {routine.creatorId}
                    <br></br>
                    Routine Name: {routine.name}
                    <br></br>
                    Is this Public?: {routine.isPublic ? "True" : "False"}
                    <br></br>
                    Goal: {routine.goal}
                    <br></br>
                    Activities: {routine.activities.map(activity => {
                        return (<div key={activity.routineActivityId}>{activity.name}</div>)                                  
                    })}
                    { <DeleteRoutines routineId={routine.id} token={token}/>}
                    { <EditRoutines/>}
                </div>
                )
            })} 
        </>   
    )
}

export default MyRoutines;