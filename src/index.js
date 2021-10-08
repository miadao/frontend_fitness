import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, 
Route, 
Switch,
} from 'react-router-dom';

import {
Activities, 
Login,
Register,
Routines,
Home,
AddRoutines,
MyRoutines,
Header
} from './components';

import { BASE_URL } from './api';

const App =()=> {
    
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState(false);
    const [token, setToken] = useState('');
    
    
   

    useEffect (() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            setLoginSuccess(true)
        }
    }, [loginSuccess])

    // useEffect (() => {
    //     if (localStorage.clear("token")){
    //         setToken(localStorage.clear("token"))
    //         setLogoutUser(true)
    //     }
    // }, [logoutUser])

    return <div className="app">
        
        <Router>
            <div>
                <Header 
                    loginSuccess={loginSuccess}
                    setLoginSuccess={setLoginSuccess}
                />

                <Switch>
                    <Route exact path= "/home">
                        <Home
                        setRoutines={setRoutines}
                        token={token}
                        />
                    </Route>

                    <Route exact path= "/activities">
                        <Activities
                            token={token}
                        />
                    </Route>

                    <Route exact path= "/login">
                        <Login
                            loginSuccess={loginSuccess}
                            setLoginSuccess={setLoginSuccess}
                            username={username}
                            setUsername={setUsername}
                            setToken={setToken}
                            token={token}
                            
                        />
                    </Route>


                    <Route exact path= "/register">
                        <Register
                            username={username}
                            password={password}
                            ConfirmPassword={ConfirmPassword}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            setConfirmPassword={setConfirmPassword}
                        />
                    </Route>

                    <Route exact path= "/routines">
                        <Routines
                            token={token}
                            loginSuccess={loginSuccess}
                            username={username}
                            
                        />
                    </Route>
    

                    <Route exact path= "/addroutines">
                        <AddRoutines
                            token={token}  
                        />
                    </Route>
    

                    <Route exact path= "/myroutines">
                        <MyRoutines
                            token={token}
                        />
                    </Route>

                    <Route path= "/">
                        <Login
                        loginSuccess={loginSuccess}
                        setLoginSuccess={setLoginSuccess}
                        />
                    </Route>

                    <Route path="*">
                        <h1>404 Error - Page Not Found!</h1>
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    </div>

}

ReactDOM.render(<App />, document.getElementById('app'));
