import { BASE_URL } from "../api";

const Home = ({token, loginSuccess}) => {

    return (
        <div>
            <h1> Homepage </h1>
            <h2 className="homepage"> {loginSuccess ?  "Welcome!" : "Please Log In to View"} </h2>
            
        </div>
    )
}
export default Home;