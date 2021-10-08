import { BASE_URL } from '../api';
import { useHistory ,Link} from 'react-router-dom';
import { useState } from 'react';

const AddRoutines = ({token}) => {
    // const history = useHistory();
    const [nameString, setName] = useState('')
    const [goalString, setGoal] = useState('')
    const [isPublicBoolean, setIsPublic] = useState(true)

    const handleSubmit = async (event) => {
        console.log("Testing Add Routines")
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
            })
        .catch(console.error);
        // history.push("/routines")
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
            

        </div>)
    
}

export default AddRoutines;
