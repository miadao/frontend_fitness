import { BASE_URL  } from "../api";

const DeleteRoutines = ({token, routineId}) => {

        const handleDelete = (event) => {
            event.preventDefault()
            fetch (`${BASE_URL}/routines/${routineId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
            }).then(response => response.json())
                .then(result => {
                console.log(result)
                alert("Routine Deleted!")
                })
                .catch(console.error);
        }
        return (
            <form onSubmit={handleDelete}>
                <div ClassName="Delete">
                    <button type="submit"> Delete</button>
                </div>
            </form>
        )
}
export default DeleteRoutines;
