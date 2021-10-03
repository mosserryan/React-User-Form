/* You can also specify what props to take in, instead of just saying "props" as a parameter.*/
const Header = ({title, name, age}) => {
    return(
        <header>
            <h1>{title} {name} {age}</h1>
        </header>
    )
}
/* Default Props are the props that are passed through/defined if no values is given in it's place */
Header.defaultProps = {
    title: 'Hello World',
    name: 'No Name Larry',
    age: '34'
}