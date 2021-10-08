import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Routines = ({ token, loginSuccess, logoutUser, setLogoutUser}) => {

    
    // const [filter, setFilter] = useState('')
    const [routines, setRoutines] = useState([])
    // fetch (`${BASE_URL}/routines`, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response=> response.json())
    // .then(routines => {
    //     console.log(routines)
    // setRoutines([routines])})
    // .catch(console.error)

    useEffect(() => {
        const fetchRoutines = async () => {
            const resp = await fetch(`${BASE_URL}/routines`)
            const data = await resp.json()
            setRoutines(data)
            console.log(data)
        }
        fetchRoutines()
    }, [])

    // const filterRoutines = (routine, text) => {
    //     if (routine.title.toLowerCase().includes(text.toLowerCase())){
    //       return true
    //     }
    //   }

    // const filteredRoutines = routines.filter (routine => filterRoutines(routine, filter))
    // const routineToDisplay = filter.length > 0 ? filteredRoutines : routines; 

    

    return (
        <>
            {loginSuccess ? <h1> <Link to="/addroutines" logoutUser={logoutUser} > <button> Add Routines </button> </Link></h1> : null}

            <h2>Routines</h2>
            {routines.map(routine => {

                

                return (
                    <div className="routine" key={routine.id}>
                        <div> ID: {routine.id}</div>
                        <div>Creator: {routine.creatorName}</div>
                        <div>Name: {routine.name}</div>
                        <div>isPublic: {routine.isPublic ? "True" : "False"}</div>
                            <div>Activities:
                                {routine.activities.map(activity => {
                                    return (<div key={activity.routineActivityId}>{activity.name}</div>)                                  
                                })}
                            </div>
                        <div className="routinegoal">Goal: {routine.goal}</div>

                       

                        {loginSuccess && routine.isPublic === false ? <EditRoutines routineId={routine.id} token={token}/> : null}
                        {loginSuccess && routine.isPublic === false ? <DeleteRoutines routineId={routine.id} token={token}/> : null}
                        {loginSuccess && routine.isPublic === false ? <AddRoutines routineId={routine.id} token={token}/> : null}
                        
                    </div>
                )
            })}
        </>
    )

}


export default Routines;
