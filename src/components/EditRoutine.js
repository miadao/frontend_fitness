import { BASE_URL } from "../api";
import { useState } from 'react';

const EditRoutines = ({routineId, token}) => {
    const [routineName, setRoutineName] = useState('')
    const [routineGoal, setRoutineGoal] = useState('')
    const [isPublicBoolean, setIsPublicBoolean] = useState(true)
    const [isEditted, setIsEditted] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            fetch(`${BASE_URL}/routines/${routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: routineName,
                goal: routineGoal,
                isPublic: isPublicBoolean
            })
            }).then(response => response.json())
            .then(result => {
                console.log(result)
                setIsEditted(true)
                window.location.reload(true) 
            })
            .catch(console.error);
        
        }  catch (err) {
            console.error(err)
        } 
    }


    return(
        <div className="EditRoutine"> 
                  <h1>Edit Routine</h1>
                  <form onSubmit={handleSubmit}>
                    <label> Name: </label>
                    <input type="text" name="name" value={routineName} laceholder="Name of Routine" onChange={(event)=>setRoutineName(event.target.value)}/>

                    <label> Goal: </label>
                    <input type="text" name="goal" value={routineGoal} placeholder="Routine Goal" onChange={(event)=>setRoutineGoal(event.target.value)}/>

                    <label> Make this Public?</label>
                    <input type="checkbox" name="isPublic" value={isPublicBoolean} onChange={(event)=> setIsPublicBoolean(event.target.value)}/>  

                    <button type="submit"> Finish Edit Routine </button>
                </form>
                {isEditted ? alert ("You've successfully edit a routine!") : null}
                {/* {isEditted ?  window.location.reload(true) : null} */}
        </div>
    )
}

export default EditRoutines;
