import React from 'react';
import { useState } from 'react'

const AddUser = ( { addUser } ) => {


    const [username, setUsername] = useState('')
    const [age, setAge] = useState('')
    const [godmode, setGodmode] = useState(false)
    const [lastName, setLastName] = useState('Mosser')

    const onSubmit = (e) => {
        e.preventDefault()
        //setAge(parseInt(age))
        if(!username) {
            alert('Please add a username!')
        } else if (!age) {
            alert('You must add a valid age!')
            return
        }


        if ( username && age) {
            addUser({ username, lastName, age, godmode})
        }

        

        setUsername('')
        setAge('')
        setGodmode(false)
    }

    return (
        <form className = 'add-form' onSubmit={onSubmit}>
            <div className = 'form-control'>
                <label>Username</label>
                <input type = 'text' placeholder = 'Add Username'
                value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Age</label>
                <input type = 'number' placeholder = 'Age' 
                value={age}  onChange={(e) => setAge(e.target.value)} onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 ) && e.preventDefault()}/>
            </div>
            <div className = 'form-control form-control-check'>
                <label>God Mode</label>
                <input type = 'checkbox'
                checked={godmode}//Tell the checkbox what state it needs to be, in this case we're basing it off the state of godmode. "true" or "false"
                value={godmode} onChange={(e) => setGodmode(e.currentTarget.checked)}/>
            </div>

                <input type = 'submit' value = 'Save User' className = 'btn btn-block form-btn'/>

        </form>
    )
}

export default AddUser