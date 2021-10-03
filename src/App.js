import Header from './Components/Header'
import Footer from './Components/Footer'
import About from './Components/About'
import Users from './Components/Users';
import AddUser from './Components/AddUser';
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {

  const [showAddUser, setShowAddUser] = useState(false)

  const [users, setUser] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      setUser(usersFromServer)
    }

    getUsers()

    // empty array means this will only run on startup. "initail mounting"
  }, [])

  
  // async means this function will wait until it has finished grabbing the data from the JSON DB server.
  const fetchUsers = async () => {
    // Fetch user data from the db.json backend the has been created for testing purposes. Returns the data that is fetched.
    // await when used in conjunction with async, will tell it to wait until it has the data, before acting on it.
    const res = await fetch('http://localhost:5000/users')
    // Converts the response data into json.
    const data = await res.json()

    return data

  }
  
  // Similar to code above excepts the code accepts a parameter called id, to specify a single user instead of grabbing all users like the async fetch function above.
  const fetchUser = async (id) => {
    const res = await fetch(`http://localhost:5000/users/${id}`)
    const data = await res.json()

    return data

  }

  const addUser = async (user) => {

// fetch user DB and then insert a new user using the POST method. 
    const res = await fetch('http://localhost:5000/users', {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },

      // The body will contain the data which is the user object converted to a readable JSON object.
      body: JSON.stringify(user)
    })

    // In order for us to have readable JSON object we will also convert the response to JSON once it has completed using await.
    const data = await res.json()

    // Console logging the JSON data we get back.
    console.log(data)

    // Now we call the hook "setUser" to spread out the user object and then insert the new user we now call "data" on the the end of the array.
    setUser ([...users, data])
    
    /* const currtentId = users.map((user) => 
    user.id )

    const orderedUsers = currtentId.slice().sort((a,b) => a - b)

    function missing(orderedUsers) {
      var id = 0;
      for (var i = 0; i < orderedUsers.length + 1; i++) {
          id = id + 1;
          if (orderedUsers[i] != id) {
              return(id);
          }
      }
    }

    const id = missing(orderedUsers) 
    const newUser = { id, ...user}
    setUser([...users, newUser])   */ 
    
        
  }


  const deleteUser = async (id, user) => {
    //fetch single user from DB using id as the parameter.
    await fetch(`http://localhost:5000/users/${id}`, {
      // Use the delete method to delete the user from the DB.
      method: 'DELETE',
    })

    console.log("Deleted the following ID of:", id)
    console.log("The following ID belong to this user:", user)
    // Call the setUser hook and run a filter function on the selected user where if the user.id does not equal the target id we passed into the function, we will keep it.
    setUser(users.filter((user) => user.id !== id))

  }

// Takes in id of selected user
const toggleGodMode = async (id) => {
 
 // Using the previously created async fetchUser function we pass in an id as an arguement.   
const userToToggle = await fetchUser(id)

// We the recently fetched user, we spread out the object and pin point "godmode" property, we set the property to the opposite of what it currently is.
const updateUser = { ...userToToggle, godmode: !userToToggle.godmode}

// Now we select the user by fetching the data with the associated id we passed in.
const res = await fetch(`http://localhost:5000/users/${id}`, {

  // Specify the PUT method to update the selected user object.
  method: 'PUT',
  headers: {
    'Content-type': 'application/json'
  },

  // In the body we turn the user object into a readable JSON object.
  body: JSON.stringify(updateUser)
})

// Converting the response into JSON so we can work with it on the frontend.
const data = await res.json()

// Using the setUser hook we now map through the users array and find the id belonging to the user that matches the id we passed into the function as an arguement.
    setUser(
      users.map((user) => 
      // Once we have a matching id we spread out the user object, pin point the godmode property, access our data variable containing the JSON object of the updated user,
      // and update the godmode property to match the value of the data JSON object.
      // If the id doesn't match, the user just remains untouched (no changes).
        user.id === id ?  { ...user, godmode : data.godmode } : user
      )
    )
  }


  return (

  <Router>

    <div className="container">

      {/* if the users (current state) array is longer than 0 (or contains at least one oject) It will show the Header with lastName property passed in.
       - Either way onAddToggle containing the setShowAddUser hook will be passed in, with the arguement being passed in that is opposite of the current showAddUser value.
       - showAddForm containing the showAddUser value will be passed in with whatver boolean value it currently is.*/}
       {users.length > 0 ? (<Header lastName={users[0].lastName} onAddToggled={() => setShowAddUser(!showAddUser)} showAddForm={showAddUser} />) : (<Header onAddToggled={() => setShowAddUser(!showAddUser)} showAddForm={showAddUser}/>)}
       

        <Route path='/' exact render={(props) => (
          <>

       
       {/* If showAddUser is true, then AddUsers component will display and pass in addUser containing the current addUser (fetch/post) async function*/}
       {showAddUser && <AddUser addUser={addUser}/>}

       {/* If the users array length is greater than 0 show the Users component else do not show anything. */}
       {/* User component is taking in users which contains the users array */}
       {/* onDelete passes through the deleteUser async (fetch/delete) function */}
       {/* onToggle passes through the toggleGodMode async (fetch/put) function */}
       {users.length > 0 ? (<Users users={users} onDelete={deleteUser} onToggle={toggleGodMode}/>) 
       : (
        ''
       )}
          </>
        )}/>
        <Route path='/about' component={About}/>
        <Footer/>

    </div>

  </Router>

  );
}

export default App;
