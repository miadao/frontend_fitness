import React, {useEffect, useState} from 'react'
import { BASE_URL } from "../api";

const Activities = () => {
    const token = localStorage.getItem("token")

    const [activities, setActivities] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [editedname, setEditedName] = useState('')
    const [editeddescription, setEditedDescription] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [requestedRoutines, setRequestedRoutines] = useState(false)
    const [routinesToDisplay, setRoutinesToDisplay] = useState([])
    const [idToEdit, setIdToEdit] = useState('')
    const [nameToEdit, setNameToEdit] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
  
    

    useEffect(() => {
        const fetchActivities = async () => {
            const resp = await fetch(`${BASE_URL}/activities`)
            const data = await resp.json()
            setActivities(data)
            console.log(data)
        }
        fetchActivities()  
    }, [])


    function newActivity(name, description){
        fetch(`${BASE_URL}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result)
            })
    }

    function editActivity(editedname, editeddescription){
        fetch(`${BASE_URL}/activities/${idToEdit}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: editedname,
                description: editeddescription
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result)
            })
    }

    function getRoutinesByActivity(activityId){
        
        fetch(`${BASE_URL}/activities/${activityId}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(result => { 
                if(result.length){
                    setRequestedRoutines(true)
                    console.log('success!', result)
                    setRoutinesToDisplay(result)
                } else {
                    console.log('sorry, no activities', result)
                    setRequestedRoutines(false)
                    alert('Sorry, no routines for that activity!')
                    
                }
                
            }).
            catch(console.error)
    }

    function activityMatches(activity, text) {
        if (activity.name.toLowerCase().includes(text.toLowerCase())) {
            return true
        }
    }

    const filteredActivities = activities.filter(activity => activityMatches(activity, searchTerm));
    const activitiesToDisplay = searchTerm.length > 0 ? filteredActivities : activities;


    return ( <>
     { isEditing ? 
            <>
                <div className="editactivityform">
                            <h1>Edit Activity Form</h1>
                            <h2>Editing Activity: {nameToEdit}</h2>
                            <label>Activity Name</label>
                            <input className="editactivityname" type="text" value={editedname} onChange={event => { setEditedName(event.target.value)}}></input>
                            <label>Activity Description</label>
                            <input className="editactivitydescription" type="text" value={editeddescription} onChange={event => { setEditedDescription(event.target.value)}}></input>
                            <button className="editactivitybutton" onClick={function(){editActivity(editedname, editeddescription), setIsEditing(false)}}>Edit Activity!</button>
                            <button className="cancelbutton" onClick={function (){setIsEditing(false)}}>Cancel</button>
                            </div> 
            </>
        :
       
            <>
                
                <h1>Activities</h1>
                <div className="activitycontainer">
                    <div className="mapcontainer">
                    <div className="SearchEverything">
                        <label className="SearchText">Search Posts</label>
                        <input className="SearchInput" onChange={event => setSearchTerm(event.target.value)}></input>
                    </div>
                        {activitiesToDisplay.map(activity => {
                            return (
                                <div className="activity" key={activity.id}>
                                    <div>Name: {activity.name}</div>
                                    <div className="activityDescription">Description: {activity.description}</div>
                                    <button className="editButton"  disabled={requestedRoutines || !token} onClick={function(){
                                        setIsEditing(true)
                                        setIdToEdit(activity.id)
                                        setNameToEdit(activity.name)
                                        console.log(activity.id)
                                        }}>Edit</button>
                                        
                                    <button className="seeroutines" disabled={requestedRoutines} onClick={(event) => { 
                                        event.preventDefault();
                                        getRoutinesByActivity(activity.id) 
                                        console.log(activity.id)
                                        }}>See Routines!</button>
                                </div> 
                            
                            )  
                        })}
                    </div>
                    <div className="newactivityform">
                        <h1>New Activity Form</h1>
                        <label>Activity Name</label>
                        <input className="newactivityname" type="text" value={name} onChange={event => { setName(event.target.value)}}></input>
                        <label>Activity Description</label>
                        <input className="newactivitydescription" type="text" value={description} onChange={event => { setDescription(event.target.value)}}></input>
                        <button className="newactivitybutton" disabled={!token} onClick={function(){newActivity(name, description)}}>Add Activity!</button>
                    </div>
                    
                    { requestedRoutines ?
                        <> 
                            <div className="routinemapcontainer">         
                                <h1>Routines</h1>    
                                <button className="closebutton" onClick={(event) => {
                                    event.preventDefault()
                                    setRequestedRoutines(false)
                                    }}>Close</button>
                            
                                {routinesToDisplay.map(routine => {
                                    return (
                                        <div className="routine" key={routine.id}>
                                            <div>Created By: {routine.creatorName}</div>
                                            <div>Routine Name: {routine.name} </div>
                                            <div>Activities: 
                                                {routine.activities.map(activity => {
                                                    return (<div key={activity.id}>
                                                                <div>{activity.name}</div>
                                                                <div>{activity.description}</div>
                                                            </div>) 
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    : null      
                    }
                </div>
            </>          
    }
          </> )        
}

export default Activities;