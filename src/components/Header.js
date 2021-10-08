import { Link } from "react-router-dom"

const Header = ({loginSuccess, setLoginSuccess}) => {
    function logoutUser(){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setLoginSuccess(false)
    }

    return (
        <div className="header">
            <section className="title">
                <h1> Fitness Tracker - Exercise More Please! </h1>
            </section>

            <section className="links"> 
                <nav>
                    <ul>    
                        <li> <Link to="/routines"> All Routines </Link></li>
                        <li> <Link to="/myroutines"> My Routines </Link></li>
                        <li> <Link to="/home"> Home </Link></li>
                        <li> <Link to="/activities"> Activities </Link></li>
                        <li> 
                            {loginSuccess ? <Link to="/login" onClick={(event) => logoutUser(event.target)} > Log Out </Link> 
                            :  <Link to="/login"> Log In </Link>} 
                        </li>
                    </ul>
                </nav>
            </section>

        </div>
    )

}
export default Header;