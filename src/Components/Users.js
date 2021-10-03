import SingleUser from "./SingleUser"

const Users = ({users, onDelete, onToggle}) => {
    return(
        <>
            {users.map((user) => (
                <SingleUser key={user.id} user={user} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Users