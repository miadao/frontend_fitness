import { BASE_URL } from "../api";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import EditRoutines from "./EditRoutine";
import DeleteRoutines from "./DeleteRoutines";

const MyRoutines = ({token, loginSuccess, username}) => {

    const [myroutines, setMyRoutines] = useState([])
    const [activities, setActivities] = useState([])
    const [activityId, setActivityId] = useState('')
    const [routineId, setRoutineId] = useState('')
    const [routineActivityId, setRoutineActivityId] = useState('')
    const [count, setCount] = useState('')
    const [duration, setDuration] = useState('')
    const [addActivities, setAddActivities] = useState(false)
    const [pickedActivities, setPickedActivities] = useState(false)
    const [pickedRActivity, setPickedRActivity] = useState(false)
    const [editRActivity, setEditRActivity] = useState(false)
    const [raName, setRAname] = useState('')
    
    useEffect(() => {
        const fetchMyRoutines = async () => {
            const resp = await fetch(`${BASE_URL}/users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                    }
            }) 
            const data = await resp.json()
            setMyRoutines(data)
            console.log(data)
        }
        fetchMyRoutines()
    },[])
    
    useEffect(() => {
        const fetchActivities = async () => {
            const resp = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities')
            const data = await resp.json()
            setActivities(data)
            console.log(data)
        }
        fetchActivities()  
    }, [])

    function addActivityToRoutine(activityId, count, duration){
        fetch(`${BASE_URL}/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                activityId: activityId,
                count: count,
                duration: duration
            })
        }).then(response => response.json())
        .then(result => {
            console.log(result);
        }).catch(console.error)
    }

    function editRoutineActivity(count, duration){
        fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                count: count,
                duration: duration
            })
        }).then(response => response.json())
        .then(result=> {
            console.log(result)
        }).catch(console.error)
    }

    function deleteRoutineActivity(){
        fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
        .then(result => {
            console.log(result);
        }).catch(console.error)
    }
        
    // console.log(routineId)
    if(loginSuccess){
    return (
            
            <> 
                <h1 className="YourRoutines"> Your Routines</h1> 
                <h2 className="toViewMyRoutines"> {loginSuccess ?  <Link to="/addroutines"> Add Routines </Link> : "Please Login to create and edit your routines"} </h2>
                
                <h3>
            {!pickedRActivity ? myroutines.map(routine => {
                
                    return (
                        <div className="myroutines" key={routine.id}> 
                        Routine Id: {routine.id}
                        <br></br>
                        Creator Name: {routine.creatorName}
                        <br></br>
                        Creator Id: {routine.creatorId}
                        <br></br>
                        Routine Name: {routine.name}
                        <br></br>
                        Is this Public?: {routine.isPublic ? "True" : "False"}
                        <br></br>
                        Goal: {routine.goal}
                        <br></br>
                        Activities: 
                        <br></br>
                        <br></br>
                        {routine.activities.map(activity => {
                            console.log(activity)
                            return (<div key={activity.routineActivityId}>
                                        Activity Name: {activity.name}
                                        <br></br>
                                        Count:{activity.count} 
                                        <br></br>
                                        Duration: {activity.duration} 
                                        <br />
                                        {editRActivity ? <><button
                                            onClick={event => {
                                                setRoutineActivityId(activity.routineActivityId)
                                                setPickedRActivity(true)
                                                setRAname(activity.name)
                                            }}>Edit or Delete this Activity!</button> </>: null}

                                        
                                        <br></br>
                                        <br></br>
                                    </div>)                                  
                        })}
                        <button disabled={editRActivity} onClick={event => {setEditRActivity(true)}}>Click Here to Edit Activities</button>
                        <button disabled={editRActivity}onClick={async function(){
                            setAddActivities(true)
                            setRoutineId(routine.id)
                            console.log(routine.id)
                            }}>Click Here to Add Activities</button>
                        {editRActivity ? <><button onClick={event => {setEditRActivity(false)}}>Cancel</button></> : null}
                        {addActivities ? <><button onClick={function(){setAddActivities(false)}}>Cancel</button></>: null}
                        
                        {<DeleteRoutines routineId={routine.id} token={token}/>}
                        {pickedActivities || addActivities ? null :  <EditRoutines routineId={routine.id} token={token}/> }
                        
                        
                        {addActivities ? 
                            <>
                                {activities.map(activity => {
                                    return (
                                        <div className="activity" key={activity.id}>
                                            <div>Name: {activity.name}</div>
                                            <div className="activityDescription">Description: {activity.description}</div>                                       
                                            <button onClick={event => {
                                                setPickedActivities(true), 
                                                setAddActivities(false),
                                                setActivityId(activity.id)
                                            }}>Add</button>      

                                        </div> 
                                    )  
                                })}
                            </>

                        : null}

                        {pickedActivities ?
                            <>
                                <div>
                                    <label>Count: </label>
                                    <input
                                        id="count"
                                        type="text"
                                        placeholder="just do ctrl + f"
                                        value={count}
                                        onChange={event => setCount(event.target.value)}
                                    />
                                        
                                    <label>Duration: </label>
                                    <input 
                                    id="duration"
                                    type="text"
                                    placeholder="just do ctrl + f"
                                    value={duration}
                                    onChange={event => setDuration(event.target.value)} 
                                    />
                                    <button onClick={
                                        event=>{
                                            console.log(activityId)
                                            console.log(routineId)
                                            console.log(count)
                                            console.log(duration)
                                            addActivityToRoutine(activityId, count, duration)
                                            setPickedActivities(false)
                                            // setAddActivities(false)
                                        }
                                    }>Send</button>
                                    <button onClick={event => {setPickedActivities(false), setAddActivities(true)}}>Cancel</button>
                                </div>
                            </>
                        : null }
                    </div>
                        
                    )
                }): 
                
                    <>
                        {<h1>Edit Activity: {raName} </h1>}
                        <label>Count: </label>
                                    <input
                                        id="count"
                                        type="text"
                                        placeholder="just do ctrl + f"
                                        value={count}
                                        onChange={event => {setCount(event.target.value)}}
                                    />
                                        
                        <label>Duration: </label>
                                    <input 
                                    id="duration"
                                    type="text"
                                    placeholder="just do ctrl + f"
                                    value={duration}
                                    onChange={event => {setDuration(event.target.value)}} 
                                    />
                        <button onClick={event => {editRoutineActivity(count, duration), setPickedRActivity(false)}}>Send</button>
                        <button onClick={event => {setPickedRActivity(false)}}>Cancel</button>

                        <br></br>
                        <br></br>
                        {editRActivity ? <><button
                                            onClick={event => {
                                                deleteRoutineActivity()
                                                setPickedRActivity(false)
                                            }}>Delete Activity</button></> : null}
                    </>
                } </h3>
            </>   
        
    )
            } else {
                return <>Please Login to View Your Routines</>
            }
}

export default MyRoutines;