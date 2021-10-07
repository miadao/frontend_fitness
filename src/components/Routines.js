import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Routines = ({ token, loginSuccess}) => {
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
            <h1>Routines</h1>
            {routines.map(routine => {
                return (
                    <div className="routine" key={routine.id}>
                        <div>Creator: {routine.creatorName}</div>
                        <div>Name: {routine.name}</div>
                            <div>Activities:
                                {routine.activities.map(activity => {
                                    return (<div key={activity.routineActivityId}>{activity.name}</div>)                                  
                                })}
                            </div>
                        <div className="routinegoal">Goal: {routine.goal}</div>

                    </div>
                )
            })}
        </>
    )

}


export default Routines;