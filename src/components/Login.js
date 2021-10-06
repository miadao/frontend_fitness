import React, {useState} from 'react'
import { BASE_URL } from "../api";

const Login = ({ setLoginSuccess, loginSuccess }) => {

    //STATE PAIRS GO HERE
    const [usernameString, setUsernameString] = useState('')
    const [passwordString, setPasswordString] = useState('')
    const [userToken, setToken] = useState('')
    function loginUser(username, password) {
        fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                }
            )
        }).then(response => response.json())
            .then (result => {
                console.log(result)
                setLoginSuccess(true)
                setToken(result.token)
                localStorage.setItem('token', result.token)
                return result
            }).catch(console.error)
    }

    function logoutUser(){
        setLoginSuccess(false)
        setToken('')
        localStorage.clear("token")
    }

    return (
        
    <>
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

        {  loginSuccess ?  <button className="loginButton" onClick={() => loginUser(usernameString, passwordString)}>
            Login</button> : <></>}

            <button className="logoutButton" onClick={() => logoutUser()}>
            Logout</button>
        </div>

        {loginSuccess ? <> Well Done! </> : <> Please Log In</>  }
    </> 
    )
}
export default Login;