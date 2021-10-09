import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import EditRoutines from "./EditRoutine";
import DeleteRoutines from "./DeleteRoutines";


const Routines = ({token, loginSuccess}) => {

    
    const [filter, setFilter] = useState('')
    const [routines, setRoutines] = useState([])
    const [username, setUsername] = useState('')
    
    useEffect(() => {
        const fetchRoutines = async () => {
            const resp = await fetch(`${BASE_URL}/routines`)
            const data = await resp.json()
            setRoutines(data)
            console.log(data)
            setUsername(localStorage.getItem("username"))
            
        }
        fetchRoutines()
        
    }, [username])

        console.log(username)
        

    const filterRoutines = (routine,text) => {
        if (routine.name.toLowerCase().includes(text.toLowerCase())) {
          return true
        }
      }

    const filteredRoutines = routines.filter (routine => filterRoutines(routine, filter))
    const routineToDisplay = filter.length > 0 ? filteredRoutines : routines; 

    

    return (
        <>
            <h1> 
                <input
                    id="filter"
                    type="text"
                    placeholder="search routine by name"
                    value={filter}
                    onChange={(event)=> setFilter(event.target.value)}
                >
                </input>
                <button type="click" onclick={filterRoutines}> Filter Routines </button>
            </h1>

            <h2 className="allRoutines"> View All Routines below...</h2>
            <br></br>
            <h3 className="toViewAllRoutines"> {loginSuccess ? null : "Please Log In to Edit Routines"} </h3>
            <h4 className="AddRoutines"> {loginSuccess ? <Link to="/addroutines"> Add Routines </Link> : null} </h4>

            

            {routines && routineToDisplay.map(routine => {
                return (
                    <div className="routines" key={routine.id}>
                        <section> 
                            <h1> 
                            ID: {routine.id}
                            <br></br>
                            Creator: {routine.creatorName}
                            <br></br>
                            Name: {routine.name}
                            <br></br>
                            isPublic: {routine.isPublic ? "True" : "False"}
                            <br></br>
                            Goal: {routine.goal}
                            <br></br>
                            Activities:
                                {routine.activities.map(activity => {
                                    return (<div key={activity.routineActivityId}>{activity.name}</div>)                                  
                                })}
                            {loginSuccess && routine.creatorName === username? <DeleteRoutines routineId={routine.id} token={token}/> : null}
                            {loginSuccess && routine.creatorName === username? <EditRoutines routineId={routine.id} token={token}/> : null}
                            </h1>
                        </section>
                                           
                    </div>
                )
            })}
        </>
    )

}


export default Routines;
