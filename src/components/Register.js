import { BASE_URL } from "../api";
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [UserRegistered, setUserRegistered] = useState(false)

    const Register = async () => {
        const response = await fetch (`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                // user:{
                    "username": username,
                    "password": password,
                // }
            })
        })
        console.log(`${BASE_URL}/users/register`)
        const data = await response.json();
        console.log(data)
        setUsername('')
        setPassword('')
        setUserRegistered(true)
    }

    const confirmPassword = () => {
        if (password === ConfirmPassword) {
            Register()
        } else {
            alert ("Password does not meet the requirement, please try again")
        }
    }

    if (UserRegistered){
        return (
            alert ("You are registered! We will re-direct you, please log in!"),
            <Redirect to ="/login"/>
        )
    }

    return (
        <div> 
            <form onSubmit={(event) => {
                event.preventDefault()
                confirmPassword()
            }}> 
                <fieldset>
                    <label htmlFor="Username"> Create Username</label>
                    <input
                        className="CreateUsername"
                        id="Username"
                        type="text"
                        value={username}
                        onChange={(event)=> setUsername(event.target.value)}
                    />
                    <label htmlFor="Password"> Create Password</label>
                    <input
                        className="CreatePassword"
                        id="Password"
                        type="text"
                        value={password}
                        onChange={(event)=> setPassword(event.target.value)}
                    />

                    <label htmlFor="Confirm Password">Confirm Password</label>
                        <input
                            className="CreatePassword"
                            id="confirmPassword"
                            type="text"
                            value={ConfirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />

                    {/* <br> </br> */}
                    <button
                        type="submit"
                        name="event"
                    >Register User</button>
                    
                </fieldset>
            </form>
        
            <h1> <Link className="Log In" to="/login">Log In!</Link> </h1>
        </div>
    )
}
export default Register;