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

            <h3 className="All Routines"> View All Routines below...</h3>
            <br></br>
            <h4 className="ToView"> {loginSuccess ? null : "Please Log In to Edit Routines"} </h4>
            <h5 className="Add Routines"> {loginSuccess ? <Link to="/addroutines"> Add Routines </Link> : null} </h5>

            

            {routines.map(routine => {
                
                
                

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
                            {loginSuccess && routine.creatorName === username? <EditRoutines/> : null}
                            </h1>
                        </section>
                                           
                    </div>
                )
            })}
        </>
    )

}


export default Routines;
