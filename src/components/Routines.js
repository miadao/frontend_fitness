import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import EditRoutines from "./EditRoutine";
import DeleteRoutines from "./DeleteRoutines";

const Routines = ({ username, token, loginSuccess}) => {

    
    const [filter, setFilter] = useState('')
    const [routines, setRoutines] = useState([])
    
    useEffect(() => {
        const fetchRoutines = async () => {
            const resp = await fetch(`${BASE_URL}/routines`)
            const data = await resp.json()
            setRoutines(data)
            console.log(data)
        }
        fetchRoutines()
    }, [])

    const filterRoutines = (text) => {
          return true
      }

    const filteredRoutines = routines.filter (routine => filterRoutines(routine, filter))
    const routineToDisplay = filter.length > 0 ? filteredRoutines : routines; 

    

    return (
        <>
            {/* {loginSuccess ? 
            <h1> <Link to="/addroutines" > <button> Add Routines </button> </Link> 
            <br></br>
            <Link to="/myroutines"> <button> My Routines </button> </Link>
            <br></br>
            <Link to="/login"> <button> Log Out </button></Link>
            </h1>
            : null} */}

        

            <h2> 
                <input
                    id="filter"
                    type="text"
                    placeholder="just do ctrl + f"
                    value={filter}
                    onChange={(event)=> setFilter(event.target.value)}
                >
                </input>
                <button type="click" onclick={filterRoutines}> Filter Routines </button>
            </h2>

            <h3>Routines</h3>
            {routines.map(routine => {
                
                
                

                return (
                    
                    <div className="routines" key={routine.id}>
                        <h1> 
                        ID: {routine.id}
                        Creator: {routine.creatorName}
                        Name: {routine.name}
                        isPublic: {routine.isPublic ? "True" : "False"}
                        Goal: {routine.goal}
                            <ul> Activities:
                                    {routine.activities.map(activity => {
                                        return (<div key={activity.routineActivityId}>{activity.name}</div>)                                  
                                    })}
                            </ul>
                        </h1>
                        {loginSuccess && routine.creatorName === username ? <DeleteRoutines routineId={routine.id} token={token}/> : null}
                        {loginSuccess && routine.creatorName === username ? <EditRoutines/> : null}
                        
                        
                        
                    </div>
                )
            })}
        </>
    )

}


export default Routines;
