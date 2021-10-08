import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';
import EditRoutines from "./EditRoutine";
import DeleteRoutines from "./DeleteRoutines";

const MyRoutines = ({token, loginSuccess}) => {

    const [myroutines, setMyRoutines] = useState([])
    const [username, setUsername] = useState('')
    
    useEffect(() => {
        const fetchRoutines = async () => {
            const resp = await fetch(`${BASE_URL}/routines`)
            const data = await resp.json()
            setMyRoutines(data)
            console.log(data)
            setUsername(localStorage.getItem("username"))
            
        }
        fetchRoutines()
        
    }, [username])

        
        

    return (
        <>
        {myroutines.map(routine =>  {
            <div className="myroutines" key={routine.id}>
                
                <section> 
                {loginSuccess && routine.creatorName === username ?
                    <ul> 
                        {routine.id}
                        {routine.creatorName}
                        {routine.name}
                        {routine.isPublic ? "True" : "False"}
                        {routine.goal}
                        {routine.activities.map(activity => {
                            return (<div key={activity.routineActivityId}>{activity.name}</div>)                                  
                        })}
                        { <DeleteRoutines routineId={routine.id} token={token}/>}
                    { <EditRoutines/>}

                    </ul>
                
                    : null}
            
                </section>           
            </div>
            
        })}
        </>
    )

}

export default MyRoutines;