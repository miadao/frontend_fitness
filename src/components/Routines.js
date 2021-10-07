import { BASE_URL } from "../api";
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Routines = ({routines, setRoutines, token, loginSuccess}) => {
    // const [filter, setFilter] = useState('')

    fetch (`${BASE_URL}/routines`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response=> response.json())
    .then(routines => {
        console.log(routines)
    setRoutines([routines])})
    .catch(console.error)

    // const filterRoutines = (routine, text) => {
    //     if (routine.title.toLowerCase().includes(text.toLowerCase())){
    //       return true
    //     }
    //   }

    // const filteredRoutines = routines.filter (routine => filterRoutines(routine, filter))
    // const routineToDisplay = filter.length > 0 ? filteredRoutines : routines; 

    return  ( <div className="Routines">

        <h1> Routines</h1>

        {/* <h2> 
        <input 
            id="filter"
            type="text"
            placeholder="search by routines..."
            value= {filter}
            onChange={(event) => setFilter(event.target.value)}
            > 
        </input> 

        <button type="click" onClick={filterRoutines}>Filter Routines</button>
        </h2> */}

        
        {
            
            routines.map((routine) => <div>
            <section className="AllRoutines">
                <body> 
                ID: {routine.id} 
                <br></br>
                CreatorID: {routine.creatorId}
                <br></br>
                isPublic: {routine.isPublic}
                <br></br>
                Goal: {routine.goal}
                <br></br>
                Creator Name: {routine.creatorName}
                <br></br>
                Activities: {routine.activities}
                </body>
                

            
                {/* {loginSuccess && routine.creatorName === user.username ? <DeleteRoutine token={token}/> : null}  
                {loginSuccess && routine.creatorName === user.username ? <EditRoutine/> : null}   */}
                        
            </section>
            </div>)
        }

        </div>
    )
}


export default Routines;