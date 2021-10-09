import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import EditRoutines from "./EditRoutine";
import DeleteRoutines from "./DeleteRoutines";

const MyRoutines = ({token, loginSuccess, username}) => {

    const [myroutines, setMyRoutines] = useState([])
    
    useEffect(() => {
        const fetchMyRoutines = async () => {
            const resp = await fetch(`${BASE_URL}/users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                    }
            }) 
            const data = await resp.json()
            setMyRoutines(data)
            console.log(data)
        }
        fetchMyRoutines()
    },[])
    
        
    return (
        <> 
            <h1 className="YourRoutines"> Your Routines</h1> 
            <h2 className="toViewMyRoutines"> {loginSuccess ?  <Link to="/addroutines"> Add Routines </Link> : "Please Login to create and edit your routines"} </h2>
            
            <h3>
           {loginSuccess ? myroutines.map(routine => {
                return (
                    <div className="myroutines"> 
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
                    {<DeleteRoutines routineId={routine.id} token={token}/>}
                    { <EditRoutines routineId={routine.id} token={token}/> }
                </div>
                )
            }): null} </h3>
        </>   
    )
}

export default MyRoutines;