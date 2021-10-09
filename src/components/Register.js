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
        .then(response => response.json())
        .then (result => {
            console.log(result)
            if(result.message==="you're signed up!"){
                console.log("234")
                alert("You are registered! We will re-direct you, please log in!");
                setUserRegistered(true)
                setToken(result.token)
                setUsername(result.user.username)
                localStorage.setItem('token', result.token)
                localStorage.setItem('username', result.user.username)
            } else {
                console.log(result)
                alert('A user by that username already exists. Please login or re-register with different credentials.')
                window.location.reload(true)
                setLoginSuccess(false)
            } 
            return result
            
        }).catch(console.error)
}

    
    const confirmPassword = () => {
        if (password === ConfirmPassword && password.length >= 8) {
            Register()
        } else {
            alert ("Password must be 8 characters or longer. Please try again.")
        }
    }

    // if (UserRegistered){
    //     return (
    //         alert ("You are registered! We will re-direct you, please log in!"),
    //         <Redirect to ="/login"/>
    //     )
    // }

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

                    {/* { UserRegistered ?
                    alert ("You are registered! We will re-direct you, please log in!") : null } */}

                    {UserRegistered ? <Redirect to ="/login"/> : null}
                )       
                    
                </fieldset>
            </form>

        </div>
    )
}
export default Register;