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
    const [idToEdit, setIdToEdit] = useState('')
    const [nameToEdit, setNameToEdit] = useState('')
    

    useEffect(() => {
        const fetchActivities = async () => {
            const resp = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities')
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

    return ( <>
     { isEditing ? 
        <><div className="editactivityform">
                        <h1>Edit Activity Form</h1>
                        <h2>Editing Activity: {nameToEdit}</h2>
                        <label>Activity Name</label>
                        <input className="editactivityname" type="text" value={editedname} onChange={event => { setEditedName(event.target.value)}}></input>
                        <label>Activity Description</label>
                        <input className="editactivitydescription" type="text" value={editeddescription} onChange={event => { setEditedDescription(event.target.value)}}></input>
                        <button className="editactivitybutton" onClick={function(){editActivity(editedname, editeddescription), setIsEditing(false)}}>Edit Activity!</button>
                        <button className="cancelbutton" onClick={function (){setIsEditing(false)}}>Cancel</button>
                    </div> </>
        :  
        <> 
            <h1>Activities</h1>
            {activities.map(activity => {
                return (
                <div className="activity" key={activity.id}>
                    <div>Name: {activity.name}</div>
                    <div className="activityDescription">Description: {activity.description}</div>
                    <button className="editButton" onClick={function(){
                        setIsEditing(true)
                        setIdToEdit(activity.id)
                        setNameToEdit(activity.name)
                        console.log(idToEdit)
                        }}>Edit</button>
                </div> 
                )
                
                
            })}
            <div className="newactivityform">
                    <h1>New Activity Form</h1>
                    <label>Activity Name</label>
                    <input className="newactivityname" type="text" value={name} onChange={event => { setName(event.target.value)}}></input>
                    <label>Activity Description</label>
                    <input className="newactivitydescription" type="text" value={description} onChange={event => { setDescription(event.target.value)}}></input>
                    <button className="newactivitybutton" onClick={function(){newActivity(name, description)}}>Add Activity!</button>
            </div>
        </>
          }</>)
        

    }
export default Activities;