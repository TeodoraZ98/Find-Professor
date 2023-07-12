import React from "react";
import NavBarProfesor from "../headerProfesor";
import classStyles from './styles';

const ProfesorTermini = props => {

    const classes = classStyles();

    return (<>
    <div className={classes.container}>
            <NavBarProfesor></NavBarProfesor>
    
    <div>RADI!!!</div>
    </div>
    
    
    
    </>);
}

export default ProfesorTermini