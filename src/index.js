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
EditRoutines, 
DeleteRoutines, 
AddRoutines
} from './components';

import { BASE_URL } from './api';

const App =()=> {
    
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState(false);
    const [token, setToken] = useState('');
    const [routines, setRoutines] = useState([])

    useEffect (() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            setLoginSuccess(true)
        }
    }, [loginSuccess])


    return <div className="app">
        
        <Router>
            <div>
<<<<<<< HEAD
                { <Switch>
=======
                <Switch>
>>>>>>> e889917439418cd23f9947e2a62c5ed1d59afe08
                    <Route exact path= "/home">
                        <Home
                        
                        />
<<<<<<< HEAD
                    </Route> 
=======
                    </Route>
>>>>>>> e889917439418cd23f9947e2a62c5ed1d59afe08

                    <Route exact path= "/activities">
                        <Activities
                        
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
                            routines={routines}
                            setRoutines={setRoutines}
                            token={token}
                            loginSuccess={loginSuccess}
                        />
                    </Route>
    

                    <Route exact path= "/addroutines">
                        <AddRoutines
                            
                        />
                    </Route>
    


                    <Route exact path= "/deleteroutines">
                        <DeleteRoutines
                            
                        />
                    </Route>
    
    
                    <Route exact path= "/editroutines">
                        <EditRoutines
                            
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
                    
<<<<<<< HEAD
                 </Switch> }
=======
                </Switch>
>>>>>>> e889917439418cd23f9947e2a62c5ed1d59afe08
            </div>
        </Router>
    </div>

}

ReactDOM.render(<App />, document.getElementById('app'));
