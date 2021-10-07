import React, {useEffect, useState} from 'react'
import { BASE_URL } from "../api";

const Activities = () => {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        const fetchActivities = async () => {
            const resp = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities')
            const data = await resp.json()
            setActivities(data)
            console.log(data)
        }
        fetchActivities()  
    }, [])

    return (
        <> 
            <h1>Activities</h1>
            {activities.map(activity => {
                return (
                <div className="activity" key={activity.id}>
                    <div>Name: {activity.name}</div>
                    <div className="activityDescription">Description: {activity.description}</div>
                </div>)
            })}
        </>

    )}
export default Activities;