import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'


const Header = ({lastName, onAddToggled, showAddForm}) => {

    const location = useLocation()

    return(
        <>
        <header className='header'>

            {/* If last name was passed in, then show the associated h1 tag, if not show the other h1 tag. */}
            {/* location.pathname check the path name and if it matches the value that it is looking for than it will render */}
            {location.pathname === '/' && (lastName ? <h1>Welcome to the {lastName} family!</h1> : <h1>They gone :O</h1>)}
            

            {/* showAddForm is true, show "Close" as test for button, if false show "Add User" as button test instead */}
            {/* showAddFrom is true, change color to "red", if false change button color to "blue" */}
            {/* onClick contains the passed in prop (async fetch function (put)) from App.js */}
            {/* location.pathname check the path name and if it matches the value that it is looking for than it will render */}
            {location.pathname === '/' && (<Button text={showAddForm ? "Close" : "Add User"} color={showAddForm ? "Red" : "Blue"} onClick={onAddToggled}/>)}
            
        </header>
        </>  
    )
}
/* Default Props are the props that are passed through/defined if no values is given in it's place */
Header.defaultProps = {
    title: 'Herroo World',
    name: 'No Name Larry',
    age: 'my age is 69'
}

/* Proptypes specify what type of props that a component should be expecting, helps save resources (I'm assuming) */
Header.propTypes = {
        greeting: PropTypes.string,
        name: PropTypes.string,
        age: PropTypes.string,     
}




export default Header