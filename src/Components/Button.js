import PropTypes from 'prop-types';
//import Algorithims from './Algorithims';

const Button = ({onClick, text, color}) => {
    return (
        <button style={{ backgroundColor: color }} onClick={onClick} className="btn">{text}</button>
    )
}


Button.defaultProps = {
    
    text: 'button',
    color: 'blue',
    onClick: () => {
        console.log("I've been clicked!")
    }
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button