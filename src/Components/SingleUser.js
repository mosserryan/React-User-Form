import React from 'react';
import { FaTimes } from 'react-icons/fa'

const SingleUser = ({ user, onDelete, onToggle }) => {
    return (

        // Based on the godmode boolean value it will add a class of reminder to the div.
        // When double clicking this div, you toggle the async fetch function (put) of onToggle passed from App.js/User, which takes in the selected user id belonging to that div.
        <div className={`task ${user.godmode ? 'reminder' : ''}`} onDoubleClick={() => onToggle(user.id)}>

        {/* FaTimes icon within the H3 tag, contains onClick function that calls the async fetch function (delete) of onDelete passed from App.js/User, and takes in the selected
        user id and users username as arguements */}
        <h3>User: {user.username} <FaTimes style={{ color: 'red', backgroundColor:'#ececec', cursor: 'pointer'}} onClick={() => onDelete(user.id, user.username)}/></h3>


        <h3>Age: {user.age}</h3>

        </div>
    )
}

export default SingleUser