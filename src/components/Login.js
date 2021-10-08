import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BASE_URL } from "../api";

const Login = ({username, setUsername, password, loginSuccess, setLoginSuccess}) => {

    //STATE PAIRS GO HERE
    const [usernameString, setUsernameString] = useState('')
    const [passwordString, setPasswordString] = useState('')
    const [token, setToken] = useState('')
    function loginUser(username, password) {
        fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "username": username,
                    "password": password
                }
            )
        }).then(response => response.json())
            .then (result => {
                console.log(result)
                if(result.message==="you're logged in!"){
                    console.log(result)
                    setLoginSuccess(true)
                    setToken(result.token)
                    setUsername(result.user.username)
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('username', result.user.username)
                } else {
                    console.log(result)
                    alert('Incorrect Credentials, try again')
                    setLoginSuccess(false)
                }
                
                return result
            }).catch(console.error)
    }

    
    function logoutUser(){
        localStorage.removeItem("token")
        setLoginSuccess(false)
    }

    

    return (
        <div className='Login'>
            <h1>Login</h1>

            <input className="usernameInput"
                type="username"
                value={usernameString}
                onChange={ event => setUsernameString(event.target.value) }>
            </input>

            <input className="passwordInput"
                type="password"
                value={passwordString}
                onChange={ event => setPasswordString(event.target.value) }>
            </input>

            {loginSuccess ? <button className="logoutButton" onClick={() => logoutUser()}>
            Logout</button> :  <button className="loginButton" onClick={() => loginUser(usernameString, passwordString)} >
            Login </button> }
            
            {loginSuccess ? <Redirect to="/home"/> : null }
            {loginSuccess ? alert (`Welcome ${usernameString}!`) : null}
            

            <h2> <Link className="Register" to="/register">Don't have an account? Sign Up!</Link></h2>
            

        </div>

       
    )
}
export default Login;