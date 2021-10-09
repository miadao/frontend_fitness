import { BASE_URL } from '../api';
import { Link} from 'react-router-dom';
import { useState } from 'react';
import { Redirect } from 'react-router';

const AddRoutines = ({token}) => {
    const [nameString, setName] = useState('')
    const [goalString, setGoal] = useState('')
    const [isPublicBoolean, setIsPublic] = useState(true)
    const [isAdded, setIsAdded] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

    try {
        fetch (`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: nameString,
                goal: goalString,
                isPublic: isPublicBoolean
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setIsAdded(true)
            })
        .catch(console.error);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div classname="AddRoutines"> 
            <h1> Add New Routine </h1>
            <form onSubmit={handleSubmit}> 
                <input type="text" name="name" value={nameString} placeholder="Name of Routine" onChange={(event) => setName(event.target.value)}/>
                <br></br>
                <input type="text" name="goal" value={goalString} placeholder="Goal" onChange={(event) => setGoal(event.target.value)}/>
                <br></br>
                <label>
                    <input type="checkbox" name="isPublic" value={isPublicBoolean} onChange={(event)=> setIsPublic(event.target.value)}/> 
                    Would you like to make this Public?   
                 </label>
                <br></br>
                <button type="submit"> Create Routine </button>

            </form>
            <h2> <Link to="/routines"> View Routines </Link>  </h2>
            {isAdded ? <Redirect to="/routines"> </Redirect> : null}
            {isAdded ? alert("Routine created successfully, we will re-direct you") : null}

        </div>)
    
}

export default AddRoutines;
